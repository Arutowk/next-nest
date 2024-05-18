'use client';

import { io } from 'socket.io-client';

export const userName = 'Rob-' + Math.floor(Math.random() * 100000);
const password = 'x';

export const socket = io('https://localhost:3001', {
  auth: {
    userName,
    password,
  },
});
