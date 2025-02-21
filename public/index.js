const container = document.querySelector('.container');
const chat = document.querySelector('#chat');
const messageForm = document.querySelector('#messageForm');
const HOST = window.location.host;
const PROTOCOL = window.location.protocol
const socket = new WebSocket(`ws://${HOST}`);

socket.addEventListener('open', async () => {
  const messages = await getAllMessages();
  messages.forEach(showMessage);
})

socket.addEventListener('message', ({ data }) => {
  showMessage(data);
})  

function showMessage(message) {
  const messageElem = document.createElement('p');
  messageElem.textContent = message;
  chat.appendChild(messageElem);
}

const input = document.createElement('input');
input.required = true;

const userName = document.createElement('input');

const savedUserName = localStorage.getItem('userName');

if (savedUserName) {
  userName.value = savedUserName
}

userName.placeholder = 'Ваше имя';

const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Send message';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userNameRegExp = new RegExp('\\p{L}{2,20}', 'u');

  if (userNameRegExp.test(userName.value)) {
    socket.send(`${userName.value}:  ${input.value}`);
    
    if (savedUserName !== userName.value) {
      localStorage.setItem('userName', userName.value);
    }

    input.value = '';
  } else {
    alert('Представься!')
  }
});

messageForm.append(userName, input, button);

async function getAllMessages() {
  const response = await fetch(`${PROTOCOL}//${HOST}/messages`);
  const messages = response.json();
  return messages;
}