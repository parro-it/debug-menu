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

	if (process.platform === 'darwin') {
		electron.Menu.setApplicationMenu(menu);
	} else {
		win.setMenu(menu);
	}

	win.webContents.executeJavaScript(`
		require('${__dirname}').install();
	`);

	win.loadURL('https://google.com');

	const win2 = new electron.BrowserWindow({
		show: true
	});

	win2.loadURL(`file://${__dirname}/example.html`);
});
