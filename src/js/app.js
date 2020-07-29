import {
  chackName,
  allName,
  close,
} from './xhr.js';

const table = document.querySelector('table');
const divEdit = document.getElementById('note');
const inputName = document.getElementById('inputName');
const butSave = document.getElementById('butSave');
const erName = document.getElementById('errorName');
const wrapChat = document.getElementById('wrap-chat');
const mesChat = document.getElementById('mes');
const butSend = document.getElementById('butSend');
const trChat = document.getElementById('tr-chat');

let users;
let name = "";
let mes = JSON.stringify({});
// let ws = new WebSocket('ws://localhost:7070/ws');
let ws = new WebSocket('ws://chat-back2.herokuapp.com/ws');
ws.binaryType = 'blob';
ws.addEventListener('open', () => {
  console.log('connected');
  ws.send(mes);
});
ws.addEventListener('message', (evt) => {
  trChat.innerHTML = evt.data;
  const pMes = document.querySelectorAll('.pMes');
  if (pMes.length > 0) {
    pMes.forEach(e => {
      console.log(e.previousSibling.getAttribute('data-id'));
      if (e.previousSibling.getAttribute('data-id') === name) {
        e.style.textAlign = "right";
        e.previousSibling.style.textAlign = "right";
      }
    });
  }
});
ws.addEventListener('close', (evt) => {
  close(name);
});
ws.addEventListener('error', () => {
  console.log('error');
});
window.addEventListener('beforeunload', (e) => {
  e.returnValue = ws.close();
  return ws.close();
});

function add() {
  butSend.addEventListener('click', () => {
    if (mesChat.value.length !== 0) {
      mes = JSON.stringify({
        name: `${name}`,
        mes: `${mesChat.value}`
      });
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(mes);
      } else {}

      mesChat.value = "";
    }
  });
  setInterval(() => {
    users = JSON.parse(allName());
    table.innerHTML = '';
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      const trFirst = document.createElement('tr');
      const thN = document.createElement('th');
      const thPic = document.createElement('th');
      thN.innerHTML = element;
      thPic.innerHTML = '&#9678';
      trFirst.appendChild(thPic);
      trFirst.appendChild(thN);
      table.appendChild(trFirst);
    }
  }, 1000);
}

function save() {
  butSave.addEventListener('click', (e) => {
    if (chackName(inputName.value)) {
      name = inputName.value;
      users = JSON.parse(allName());
      divEdit.style.display = 'none';
      wrapChat.style.display = 'inline-block';
      erName.innerText = '';
      add();
    } else {
      erName.innerText = 'uncorrect name';
    }
  });
}
save();
