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

exports.windowDebugMenu = () => {
  const Menu = electron.Menu;
  return Menu.buildFromTemplate([
    {
      label: 'Devtools',
      submenu: [{
        label: 'Open detached'
      }, {
        label: 'Open right'
      }, {
        label: 'Open bottom'
      }, {
        label: 'Toggle'
      }]
    }, {
      label: 'Current window',
      submenu: [{
        label: 'Close'
      }, {
        label: 'Reload'
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

