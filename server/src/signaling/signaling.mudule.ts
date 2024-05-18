import { Module } from '@nestjs/common';
import { Signaling } from './signaling.gateway';

@Module({
  providers: [Signaling],
})
export class SignalingModule {}
