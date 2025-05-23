'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Socket, io } from 'socket.io-client';

const userName = 'Rob-' + Math.floor(Math.random() * 100000);
const password = 'x';

let peerConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    },
  ],
};

export default function Home() {
  const localVideoEl = useRef<HTMLVideoElement>(null!);
  const remoteVideoEl = useRef<HTMLVideoElement>(null!);

  const socketRef = useRef<Socket>(null!);

  const peerConnection = useRef<RTCPeerConnection>(null!);
  const localStream = useRef<MediaStream>(null!);
  const remoteStream = useRef<MediaStream>(null!);
  const didIOffer = useRef(false);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  const createPeerConnection = useCallback((offerObj?: any) => {
    return new Promise(async (resolve, reject) => {
      //RTCPeerConnection is the thing that creates the connection
      //we can pass a config object, and that config object can contain stun servers
      //which will fetch us ICE candidates
      peerConnection.current = await new RTCPeerConnection(peerConfiguration);
      remoteStream.current = new MediaStream();
      remoteVideoEl.current.srcObject = remoteStream.current;

      localStream.current.getTracks().forEach((track) => {
        //add localtracks so that they can be sent once the connection is established
        peerConnection.current?.addTrack(track, localStream.current);
      });

      peerConnection.current.addEventListener(
        'signalingstatechange',
        (event) => {
          console.log(event);
          console.log(peerConnection.current.signalingState);
        },
      );

      peerConnection.current.addEventListener('icecandidate', (e) => {
        console.log('........Ice candidate found!......');
        console.log(e);
        if (e.candidate) {
          socketRef.current.emit('sendIceCandidateToSignalingServer', {
            iceCandidate: e.candidate,
            iceUserName: userName,
            didIOffer: didIOffer.current,
          });
        }
      });

      peerConnection.current.addEventListener('track', (e) => {
        console.log('Got a track from the other peer!! How excting');
        console.log(e);
        e.streams[0]?.getTracks().forEach((track) => {
          remoteStream.current.addTrack(track);
          console.log("Here's an exciting moment... fingers cross");
        });
      });

      if (offerObj) {
        //this won't be set when called from call();
        //will be set when we call from answerOffer()
        // console.log(peerConnection.signalingState) //should be stable because no setDesc has been run yet
        await peerConnection.current.setRemoteDescription(offerObj.offer);
        // console.log(peerConnection.signalingState) //should be have-remote-offer, because client2 has setRemoteDesc on the offer
      }
      resolve(1);
    });
  }, []);

  const answerOffer = useCallback(
    async (offerObj: any) => {
      await fetchUserMedia();
      await createPeerConnection(offerObj);
      const answer = await peerConnection.current.createAnswer({}); //just to make the docs happy
      await peerConnection.current.setLocalDescription(answer); //this is CLIENT2, and CLIENT2 uses the answer as the localDesc
      console.log(offerObj);
      console.log(answer);
      // console.log(peerConnection.signalingState) //should be have-local-pranswer because CLIENT2 has set its local desc to it's answer (but it won't be)
      //add the answer to the offerObj so the server knows which offer this is related to
      offerObj.answer = answer;
      //emit the answer to the signaling server, so it can emit to CLIENT1
      //expect a response from the server with the already existing ICE candidates
      const offerIceCandidates = await socketRef.current.emitWithAck(
        'newAnswer',
        offerObj,
      );
      offerIceCandidates.forEach((c: RTCIceCandidateInit) => {
        peerConnection.current.addIceCandidate(c);
        console.log('======Added Ice Candidate======');
      });
      console.log(offerIceCandidates);
    },
    [createPeerConnection],
  );

  useEffect(() => {
    const socket = io('https://localhost:3002', {
      auth: {
        userName,
        password,
      },
    });
    socketRef.current = socket;

    if (socketRef.current.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socketRef.current);
      setIsConnected(true);
      setTransport(socketRef.current.io.engine.transport.name);

      socketRef.current.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    function createOfferEls(offers: any[]) {
      //make green answer button for this new offer
      const answerEl = document.querySelector('#answer');
      console.log('offers', offers);
      offers.forEach((o) => {
        const newOfferEl = document.createElement('div');
        newOfferEl.innerHTML = `<button class="">Answer ${o.offererUserName}</button>`;
        newOfferEl.addEventListener('click', () => answerOffer(o));
        answerEl!.appendChild(newOfferEl);
      });
    }

    //on connection get all available offers and call createOfferEls
    function availableOffers(offers: any) {
      console.log(offers);
      createOfferEls(offers);
    }

    //someone just made a new offer and we're already here - call createOfferEls
    function newOfferAwaiting(offers: any) {
      console.log('newOfferAwaiting...');
      createOfferEls(offers);
    }

    function answerResponse(offerObj: any) {
      console.log('answerResponse...');
      console.log(offerObj);
      addAnswer(offerObj);
    }

    function receivedIceCandidateFromServer(iceCandidate: any) {
      console.log('receivedIceCandidateFromServer...');
      addNewIceCandidate(iceCandidate);
      console.log(iceCandidate);
    }

    socketRef.current.on('connect', onConnect);
    socketRef.current.on('disconnect', onDisconnect);
    socketRef.current.on('availableOffers', availableOffers);
    socketRef.current.on('newOfferAwaiting', newOfferAwaiting);
    socketRef.current.on('answerResponse', answerResponse);
    socketRef.current.on(
      'receivedIceCandidateFromServer',
      receivedIceCandidateFromServer,
    );

    return () => {
      socketRef.current.off('connect', onConnect);
      socketRef.current.off('disconnect', onDisconnect);
      socketRef.current.off('availableOffers', availableOffers);
      socketRef.current.off('newOfferAwaiting', newOfferAwaiting);
      socketRef.current.off('answerResponse', answerResponse);
      socketRef.current.off(
        'receivedIceCandidateFromServer',
        receivedIceCandidateFromServer,
      );
      socketRef.current.disconnect();
    };
  }, [answerOffer]);

  const call = async () => {
    await fetchUserMedia();

    //peerConnection is all set with our STUN servers sent over
    await createPeerConnection();

    //create offer time!
    try {
      console.log('Creating offer...');
      const offer = await peerConnection.current.createOffer();
      console.log(offer);
      peerConnection.current.setLocalDescription(offer);
      didIOffer.current = true;
      socketRef.current.emit('newOffer', offer); //send offer to signalingServer
    } catch (err) {
      console.log(err);
    }
  };

  const addAnswer = async (offerObj: any) => {
    //addAnswer is called in socketListeners when an answerResponse is emitted.
    //at this point, the offer and answer have been exchanged!
    //now CLIENT1 needs to set the remote
    await peerConnection.current.setRemoteDescription(offerObj.answer);
    // console.log(peerConnection.signalingState)
  };

  const fetchUserMedia = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          // audio: true,
        });
        localVideoEl.current.srcObject = stream;
        localStream.current = stream;
        resolve(1);
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  };

  const addNewIceCandidate = (iceCandidate: RTCIceCandidateInit) => {
    peerConnection.current.addIceCandidate(iceCandidate);
    console.log('======Added Ice Candidate======');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="flex">
        <div id="user-name"></div>
        <button
          id="call"
          onClick={call}
          className="bg-sky-400 w-20 h-10 rounded mx-4 hover:bg-sky-500 focus:ring"
        >
          Call!
        </button>
        <button
          id="hangup"
          className="bg-rose-400 w-20 h-10 rounded mx-4 hover:bg-rose-500 focus:ring"
        >
          Hangup
        </button>
        <div id="answer" className="col"></div>
      </div>
      <div
        id="videos"
        className="w-full grid max-xl:grid-rows-2 xl:grid-cols-2 xl:h-96 justify-items-center"
      >
        <div id="video-wrapper">
          <div id="waiting">Waiting for answer...</div>
          <video
            className=" h-72"
            id="local-video"
            autoPlay
            playsInline
            controls
            ref={localVideoEl}
          ></video>
        </div>
        <div id="video-wrapper">
          <div id="waiting">Waiting for answer...</div>
          <video
            className=" h-72"
            id="remote-video"
            autoPlay
            playsInline
            controls
            ref={remoteVideoEl}
          ></video>
        </div>
      </div>
      <div className="flex justify-center items-center">
        status:
        {isConnected ? (
          <div className=" bg-green-500 w-4 h-4"></div>
        ) : (
          <div className=" bg-red-500 w-4 h-4"></div>
        )}
        {isConnected ? (
          <span className="text-lime-500">online</span>
        ) : (
          <span className="text-rose-400">offline</span>
        )}
      </div>
    </main>
  );
}
