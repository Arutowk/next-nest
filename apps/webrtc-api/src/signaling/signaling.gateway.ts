import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SignalingExceptonFilter } from './signaling.filter';

@WebSocketGateway({
  cors: {
    origin: ['https://localhost:3000', 'https://192.168.1.9:3000'],
    methods: ['GET', 'POST'],
  },
  secure: true,
  reconnect: true,
  rejectUnauthorized: false,
})
export class Signaling
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private connectedSockets: Array<{ socketId: string; userName: string }> = [];
  private offers: any[] = [];

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('websocket initialized');
    this.connectedSockets = [];
    this.offers = [];
  }

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);

    const userName = client.handshake.auth.userName;
    const password = client.handshake.auth.password;
    if (password !== 'x') {
      client.disconnect(true);
      return;
    }
    this.connectedSockets.push({
      socketId: client.id,
      userName,
    });

    if (this.offers.length) {
      client.emit('availableOffers', this.offers);
    }
    console.log(this.connectedSockets);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);

    this.connectedSockets.filter((item) => client.id === item.socketId);
    console.log(this.connectedSockets);
  }

  @SubscribeMessage('message')
  @UseFilters(new SignalingExceptonFilter())
  @UsePipes(new ValidationPipe())
  onMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }

  @SubscribeMessage('newOffer')
  onNewOffer(@MessageBody() newOffer: any, @ConnectedSocket() client: Socket) {
    console.log('onNewOffer...');
    this.offers.push({
      offererUserName: client.handshake.auth.userName,
      offer: newOffer,
      offerIceCandidates: [],
      answererUserName: null,
      answer: null,
      answererIceCandidates: [],
    });
    console.log(this.offers);
    // console.log(newOffer.sdp.slice(50))
    //send out to all connected sockets EXCEPT the caller
    client.broadcast.emit('newOfferAwaiting', this.offers.slice(-1));
  }

  @SubscribeMessage('newAnswer')
  async onNewAnswer(
    @MessageBody()
    offerObj: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    console.log('onNewAnswer...');
    console.log(offerObj);
    //emit this answer (offerObj) back to CLIENT1
    //in order to do that, we need CLIENT1's socketid
    const socketToAnswer = this.connectedSockets.find(
      (s) => s.userName === offerObj.offererUserName,
    );
    if (!socketToAnswer) {
      console.log('No matching socket');
      return;
    }
    //we found the matching socket, so we can emit to it!
    const socketIdToAnswer = socketToAnswer.socketId;
    //we find the offer to update so we can emit it
    const offerToUpdate = this.offers.find(
      (o) => o.offererUserName === offerObj.offererUserName,
    );
    if (!offerToUpdate) {
      console.log('No OfferToUpdate');
      return;
    }

    offerToUpdate.answer = offerObj.answer;
    offerToUpdate.answererUserName = client.handshake.auth.userName;
    //socket has a .to() which allows emiting to a "room"
    //every socket has it's own room
    client.to(socketIdToAnswer).emit('answerResponse', offerToUpdate);
    //send back to the answerer all the iceCandidates we have already collected
    return Promise.resolve(offerToUpdate.offerIceCandidates);
  }

  @SubscribeMessage('sendIceCandidateToSignalingServer')
  onSendIceCandidateToSignalingServer(
    @MessageBody() iceCandidateObj: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('onSendIceCandidateToSignalingServer...');
    const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;
    // console.log(iceCandidate);
    if (didIOffer) {
      //this ice is coming from the offerer. Send to the answerer
      const offerInOffers = this.offers.find(
        (o) => o.offererUserName === iceUserName,
      );
      if (offerInOffers) {
        offerInOffers.offerIceCandidates.push(iceCandidate);
        // 1. When the answerer answers, all existing ice candidates are sent
        // 2. Any candidates that come in after the offer has been answered, will be passed through
        if (offerInOffers.answererUserName) {
          //pass it through to the other socket
          const socketToSendTo = this.connectedSockets.find(
            (s) => s.userName === offerInOffers.answererUserName,
          );
          if (socketToSendTo) {
            client
              .to(socketToSendTo.socketId)
              .emit('receivedIceCandidateFromServer', iceCandidate);
          } else {
            console.log('Ice candidate recieved but could not find answere');
          }
        }
      }
    } else {
      //this ice is coming from the answerer. Send to the offerer
      //pass it through to the other socket
      const offerInOffers = this.offers.find(
        (o) => o.answererUserName === iceUserName,
      );
      const socketToSendTo = this.connectedSockets.find(
        (s) => s.userName === offerInOffers.offererUserName,
      );
      if (socketToSendTo) {
        client
          .to(socketToSendTo.socketId)
          .emit('receivedIceCandidateFromServer', iceCandidate);
      } else {
        console.log('Ice candidate recieved but could not find offerer');
      }
    }
    // console.log(offers)
  }
}
