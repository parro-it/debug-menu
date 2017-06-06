'use strict';

const electron = require('electron');

let menu = null;
let posX = 0;
let posY = 0;
let elm = null;

function inspectMenuTemplate() {
	return {
		label: 'Inspect element',
		click: () => (elm || electron.remote.getCurrentWindow()).inspectElement(posX, posY)
	};
}

function inspectElementMenu() {
	const Menu = process.type === 'renderer' ?
		electron.remote.Menu :
		electron.Menu;

	const MenuItem = process.type === 'renderer' ?
		electron.remote.MenuItem :
		electron.MenuItem;

	const mnu = new Menu();

	mnu.append(new MenuItem(
		inspectMenuTemplate()
	));

	return mnu;
}

function ifInspectable(elm) {
	if (elm && (typeof elm.inspectElement === 'function')) {
		return elm;
	}
}

function onContextMenu(e) {
	if (menu === null) {
		menu = inspectElementMenu();
	}

	posX = e.x;
	posY = e.y;
	elm = ifInspectable(e.target);

	e.preventDefault();
	menu.popup(electron.remote.getCurrentWindow());
}

exports.middleware = (ctx, next) => {
	posX = ctx.click.x;
	posY = ctx.click.y;
	elm = ifInspectable(ctx.elm);

	ctx.menu.push(inspectMenuTemplate());
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

