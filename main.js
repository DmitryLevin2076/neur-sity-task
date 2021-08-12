const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('file://'+__dirname+'/index.html')
  mainWindow.toggleDevTools()
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on('asynchronous-message', (event, args) => {
  console.log(args);
  event.reply('asynchronous-reply', 'pong')
})

/**
 * 2 NodeJS: a
 */

const testFolder = '/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {

  for (let file of files ) {
    console.log(file)
  }
});