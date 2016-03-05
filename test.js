'use strict';
const electron = require('electron');
const debugMenu = require('.');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  const menu = electron.Menu.buildFromTemplate([
    {
      label: 'Debug',
      submenu: debugMenu.windowDebugMenu(win)
    }
  ]);

  if (process.platform !== 'darwin') {
    win.setMenu(menu);
  } else {
    electron.Menu.setApplicationMenu(menu);
  }

  win.webContents.executeJavaScript(`
    require('${__dirname}').install();
  `);

  win.loadURL('https://google.com');
});
