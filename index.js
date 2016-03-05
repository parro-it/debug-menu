'use strict';

const electron = require('electron');

let menu = null;
let rightClickPos = null;


function inpectElementMenu() {
  const Menu = process.type === 'renderer'
    ? electron.remote.Menu
    : electron.Menu;

  const MenuItem = process.type === 'renderer'
    ? electron.remote.MenuItem
    : electron.MenuItem;

  const mnu = new Menu();

  mnu.append(new MenuItem({
    label: 'Inspect element',
    click: () => {
      electron.remote
        .getCurrentWindow()
        .inspectElement(rightClickPos.x, rightClickPos.y);
    }
  }));

  return mnu;
}

function onContextMenu(e) {
  if (menu === null) {
    menu = inpectElementMenu();
  }
  e.preventDefault();
  rightClickPos = {x: e.x, y: e.y};
  menu.popup(electron.remote.getCurrentWindow());
}

exports.install = () => {
  window.addEventListener('contextmenu', onContextMenu);
};

exports.uninstall = () => {
  window.removeEventListener('contextmenu', onContextMenu);
};


function openDevTools(_win) {
  const win = _win || electron.BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.webContents.isDevToolsOpened()) {
      /*
      console.log('isDevToolsOpened')
      const webContents = win.devToolsWebContents;
      console.log('webContents',webContents)
      const devToolsWin = electron.BrowserWindow.fromDevToolsWebContents(webContents);
      console.log('devToolsWin',devToolsWin)
      console.log('restore')

      devToolsWin.restore();
      console.log('focus')
      devToolsWin.focus();
      console.log('close')

      devToolsWin.close();
      */
      const webContents = win.devToolsWebContents;
      webContents.executeJavaScript(`
        (function() {
          console.log(1)
          const electron = require('electron');
          console.log(2)
          const win = electron.remote.getCurrentWindow();
          console.log(3)
          win.focus();
          console.log(4)
          win.restore();
          console.log(5)
        })();
      `);
    } else {
      win.webContents.openDevTools();
    }
  }
}

exports.windowDebugMenu = _win => {
  const electronDebug = require('electron-debug');
  const win = _win || electron.BrowserWindow.getFocusedWindow();

  return [
    {
      label: 'Devtools',
      submenu: [{
        label: 'Toggle',
        click: () => {
          electronDebug.devTools(win);
        },
        accelerator: 'CmdOrCtrl+F12'

      }, {
        label: 'Open detached',
        click: () => {
          openDevTools(win);
        },
        accelerator: 'F12'

      }, {
        label: 'Open right',
        click: () => {
          openDevTools(win);
        }
      }]
    }, {
      label: 'Current window',
      submenu: [{
        label: 'Close',
        click: () => win.close(),
        accelerator: 'CmdOrCtrl+Q'
      }, {
        label: 'Reload',
        click: () => electronDebug.refresh(win),
        accelerator: 'F5'
      }]
    }, {
      label: 'App',
      submenu: [{
        label: 'Quit',
        click: () => electron.app.quit(),
        accelerator: 'Shift+CmdOrCtrl+Q'
      }, {
        label: 'Exit',
        click: () => electron.app.exit(0),
        accelerator: 'Shift+CmdOrCtrl+Esc'
      }]
    }
  ];
};

