'use strict';
const remote = require('electron').remote;

let rightClickPos = null;

const menu = new remote.Menu();

menu.append(new remote.MenuItem({
  label: 'Inspect element',
  click: () => {
    remote.BrowserWindow
      .getFocusedWindow()
      .inspectElement(rightClickPos.x, rightClickPos.y);
  }
}));

function onContextMenu(e) {
  e.preventDefault();
  rightClickPos = {x: e.x, y: e.y};
  menu.popup();
}

exports.install = () => {
  window.addEventListener('contextmenu', onContextMenu);
};

exports.uninstall = () => {
  window.removeEventListener('contextmenu', onContextMenu);
};

exports.menu = menu;
