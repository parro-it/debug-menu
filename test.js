'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');

app.on('ready', () => {
  const win = new BrowserWindow({
    show: true
  });

  win.webContents.executeJavaScript(`
    require('${__dirname}/src/index').install();
  `);

  win.loadUrl('https://google.com');
});
