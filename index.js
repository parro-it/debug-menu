'use strict';

const remote = require('electron').remote;

let rightClickPos = null;

const menu = new remote.Menu();

menu.append(new remote.MenuItem({
  label: 'Inspect element',
  click: () => {
    remote
      .getCurrentWindow()
      .inspectElement(rightClickPos.x, rightClickPos.y);
  }
}));

function onContextMenu(e) {
  e.preventDefault();
  rightClickPos = {x: e.x, y: e.y};
  menu.popup(remote.getCurrentWindow());
}

exports.install = () => {
  window.addEventListener('contextmenu', onContextMenu);
};

exports.uninstall = () => {
  window.removeEventListener('contextmenu', onContextMenu);
};

exports.menu = menu;
