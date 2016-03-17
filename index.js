'use strict';

const electron = require('electron');

let menu = null;

function inpectMenuTemplate(pos) {
  return {
    label: 'Inspect element',
    click: () => {
      electron.remote
        .getCurrentWindow()
        .inspectElement(pos.x, pos.y);
    }
  };
}

function inpectElementMenu(pos) {
  const Menu = process.type === 'renderer'
    ? electron.remote.Menu
    : electron.Menu;

  const MenuItem = process.type === 'renderer'
    ? electron.remote.MenuItem
    : electron.MenuItem;

  const mnu = new Menu();

  mnu.append(new MenuItem(
    inpectMenuTemplate(pos)
  ));

  return mnu;
}

function onContextMenu(e) {
  if (menu === null) {
    menu = inpectElementMenu({x: e.x, y: e.y});
  }
  e.preventDefault();
  menu.popup(electron.remote.getCurrentWindow());
}


exports.middleware = (ctx, next) => {
  ctx.menu.push(inpectMenuTemplate(ctx.click));
  next();
};


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
      win.webContents.closeDevTools();
    }

    win.webContents.openDevTools();

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
        accelerator: 'F12'

      }, {
        label: 'Show',
        click: () => {
          openDevTools(win);
        },
        accelerator: 'CmdOrCtrl+F12'
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

