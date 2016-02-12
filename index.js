'use strict';

const electron = require('electron');
const electronDebug = require('electron-debug');

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

exports.windowDebugMenu = _win => {
  const win = _win || electron.BrowserWindow.getFocusedWindow();
  const Menu = electron.Menu;

  return Menu.buildFromTemplate([
    {
      label: 'Devtools',
      submenu: [{
        label: 'Open detached',
        click: () => {
          electronDebug.devTools(win);
        }
      }, {
        label: 'Open right',
        click: () => {
          electron.dialog.showErrorBox(
            'Not implemented',
            'Feature not implemented'
          );
        }
      }, {
        label: 'Open bottom',
        click: () => {
          electron.dialog.showErrorBox(
            'Not implemented',
            'Feature not implemented'
          );
        }
      }, {
        label: 'Toggle',
        click: () => {
          electron.dialog.showErrorBox(
            'Not implemented',
            'Feature not implemented'
          );
        }
      }]
    }, {
      label: 'Current window',
      submenu: [{
        label: 'Close',

      }, {
        label: 'Reload',
        click: () => {
          electronDebug.refresh(win);
        }
      }]
    }, {
      label: 'App',
      submenu: [{
        label: 'Quit'
      }, {
        label: 'Exit'
      }]
    }
  ]);
};

