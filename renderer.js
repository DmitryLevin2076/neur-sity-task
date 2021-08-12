const { ClientRequest, ipcRenderer } = require('electron');
const asyncBtn = document.querySelector('#asyncBtn')

asyncBtn.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping')

})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg)
})

