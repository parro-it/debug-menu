'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  win.webContents.executeJavaScript(`
    require('${__dirname}').install();
  `);

  win.loadURL('https://google.com');
});
