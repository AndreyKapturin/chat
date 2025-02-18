import fs from 'fs/promises';
import path from 'path';

const PATH = path.resolve('store/messages.txt');

export async function getMessages() {
  try {
    const text = await fs.readFile(PATH, 'utf-8');
    const messages = text.split('\n');
    return messages;
  } catch (error) {
    console.log(error)
  }
}

export async function addMessage(message) {
  try {
    await fs.appendFile(PATH, '\n' + message);
  } catch (error) {
    console.log(error)
  }
}

export async function deleteMessage() {
  try {
    await fs.writeFile(PATH, '');
  } catch (error) {
    console.log(error)
  }
}
