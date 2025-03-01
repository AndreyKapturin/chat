const BASE_HTTP_URL = import.meta.env.VITE_BASE_HTTP_URL;
const BASE_WS_URL = import.meta.env.VITE_BASE_WS_URL;

export const socket = new WebSocket(BASE_WS_URL);

export async function getAllMessages(): Promise<string[]> {
  const response = await fetch(`${BASE_HTTP_URL}/messages`);
  const messages = response.json();
  return messages;
}