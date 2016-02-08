'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  const win2 = new electron.BrowserWindow({
    show: true
  });

  win.webContents.executeJavaScript(`
    require('${__dirname}').install();
  `);

  win2.webContents.executeJavaScript(`
    require('${__dirname}').install();
  `);

  win.loadURL('https://google.com');
  win2.loadURL('https://google.com');
});
