'use strict';

const remote = require('electron').remote;

let rightClickPos = null;


function inpectElementMenu(Menu, MenuItem) {
  const mnu = new Menu();

  mnu.append(new MenuItem({
    label: 'Inspect element',
    click: () => {
      remote
        .getCurrentWindow()
        .inspectElement(rightClickPos.x, rightClickPos.y);
    }
  }));

  return mnu;
}


const menu = inpectElementMenu(
  remote.Menu,
  remote.MenuItem
);

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
