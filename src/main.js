const { app, dialog, BrowserWindow, Menu } = require('electron')
const fs = require('fs');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Load from file",
          accelerator: 'CmdOrCtrl+L',
          click() {
            openFile();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function openFile() {
  const jsonFile = dialog.showOpenDialogSync({ 
    properties: ['openFile'],filters: [
      {
        name: 'json', extensions: ['json']
      }
    ]
  });
  const rawdata = fs.readFileSync(jsonFile[0]);
  let targetJson = JSON.parse(rawdata);
  console.log(targetJson);
}