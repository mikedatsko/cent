import { app, BrowserWindow } from 'electron';
import Torque from 'torque';
import path from 'node:path';
import * as electronSquirrelStartup from 'electron-squirrel-startup';
import sources from './modules/sources/index.js';
import transactions from './modules/transactions/index.js';
import theme from './themes/main/index.js';

const __dirname = import.meta.dirname;
const modules = [sources, transactions];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  console.log('close 1');
  // app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  const port = '12345';
  const dbPath = path.join(__dirname, '..', 'cent.db');

  Torque({ port, dbPath, theme, modules });
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL('http://localhost:' + port);

  // Open the DevTools.
  // setTimeout(() => {
  //   mainWindow.webContents.openDevTools();
  //   // mainWindow.webContents.openDevTools({ mode: 'detach', activate: true });
  // }, 1000);
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch(err => {
    console.log(err);
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('close 2');
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
