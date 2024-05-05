import io from 'socket.io-client';

export const socket = io('http://localhost:4545', { path: '' }); // PROD: https://auth-airbnb.com
// PROD /api/socket
