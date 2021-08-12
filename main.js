const { app, BrowserWindow, ipcMain  } = require('electron')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL('file://'+__dirname+'/index.html')
  mainWindow.toggleDevTools()
  mainWindow.webContents.send("submitted-form", "hello")
}


app.on("ready", () => {
  createWindow()
  let result = {}

  const { net } = require('electron')
  const request = net.request({
    method: 'GET',
    protocol: 'https:',
    hostname: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=voronezh&appid=1e6f33762338d481de06910c6c6e1a92',
  })

  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
      result = chunk
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})

ipcMain.on('asynchronous-message', (event, args) => {
  console.log(args);
  event.reply('asynchronous-reply', 'pong')
})


























// const { app, net, BrowserWindow, ipcMain, storeWindow } = require('electron')
// const url = require("url")
// const path = require("path")
//
// let mainWindow
//
// app.on("ready", function() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false
//     }
//   })
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, "index.html"),
//     protocol: "file:",
//     slashes: true
//   }))
//
//   mainWindow.toggleDevTools()
//
//   let result = {}
//
//   const request = net.request({
//     method: 'GET',
//     protocol: 'https:',
//     hostname: 'api.openweathermap.org',
//     path: '/data/2.5/weather?q=voronezh&appid=1e6f33762338d481de06910c6c6e1a92',
//   })
//
//   request.on('response', (response) => {
//     console.log(`STATUS: ${response.statusCode}`)
//     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//     response.on("data", (chunk) => {
//       console.log(`BODY: ${chunk}`)
//       result = JSON.stringify(chunk)
//     })
//     response.on('end', () => {
//       console.log('No more data in response.')
//     })
//   })
//   request.end()
//
//   ipcMain.on('asynchronous-message', (event, args) => {
//     console.log(args)
//     // event.reply('asynchronous-reply', result)
//     event.returnValue = 'result'
//   })
// })

