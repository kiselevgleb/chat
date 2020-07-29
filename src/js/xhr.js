export {
  chackName,
  allName,
  close,
};

function chackName(name) {
  const url = `https://chat-back2.herokuapp.com/names?name=${name}`;
  // const url = `http://localhost:7070/names?name=${name}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}

function allName() {
  const url = `https://chat-back2.herokuapp.com/all`;
  // const url = `http://localhost:7070/all`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}

function close(name) {
  const url = `https://chat-back2.herokuapp.com/close?name=${name}`;
  // const url = `http://localhost:7070/close?name=${name}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}