const HOST = window.location.host;
const PROTOCOL = window.location.protocol
const WS_PROTOCOL = PROTOCOL.startsWith('https') ? 'wss' : 'ws';

export const socket = new WebSocket(`${WS_PROTOCOL}://${HOST}`);

export async function getAllMessages(): Promise<string[]> {
  const response = await fetch(`${PROTOCOL}//${HOST}/messages`);
  const messages = response.json();
  return messages;
}