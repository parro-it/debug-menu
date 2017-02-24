# debug-menu

Chrome-like "inspect element" context-menu for [Electron](http://electron.atom.io)

> This module was extracted from [electron-debug](https://github.com/sindresorhus/electron-debug) to keep it focused on its main features.

[![Travis Build Status](https://img.shields.io/travis/parro-it/debug-menu.svg)](http://travis-ci.org/parro-it/debug-menu)
[![npm module](https://img.shields.io/npm/v/debug-menu.svg)](https://npmjs.org/package/debug-menu)
[![npm downloads](https://img.shields.io/npm/dt/debug-menu.svg)](https://npmjs.org/package/debug-menu)

# Context menu items

## Inspect element

Inspect the clicked HTML element.
It shows DevTools if it's not already opened.


# Install

```
$ npm install --save-dev debug-menu
```

# Usage

When you use this module in renderer process code,
`BrowserWindow` instance need to be opened with node integration enabled.

We usually load this module only if the `DEBUG` environment variable is defined, to avoid end users of the app inadvertently opening DevTools.

```js
const debugMenu = require('debug-menu');
debugMenu.install();  // activate context menu

// later, if needed
debugMenu.uninstall();  // deactivate context menu
```

# API

## debugMenu.install()

Activate context menu. This method add a listener on `window` DOM object `contextmenu` event.

## debugMenu.middleware

Expose a middleware context menu that can be mounted with [electron-contextmenu-middleware](https://github.com/parro-it/electron-contextmenu-middleware). See [related example](#middleware-example)



## debugMenu.uninstall()

Deactivate context menu. This method remove the listener on `window` object.

## debugMenu.windowDebugMenu(win);

The debug [Menu](http://electron.atom.io/docs/latest/api/menu/) object template. You can use it to integrate with your own app context or `BrowserWindow` menu.

### Arguments

* win

`BrowserWindow` instance to use for this Menu.

Type: `BrowserWindow`<br>
Default: the currently focused `BrowserWindow`.

# Example

```js
  // ... require electorn module

  const debugMenu = require('debug-menu');
  const win = new BrowserWindow();

  const menu = Menu.buildFromTemplate([{
    label: 'Debug',
    submenu: debugMenu.windowDebugMenu(win)
  }]);

  if (process.platform !== 'darwin') {
    win.setMenu(menu);
  } else {
    electron.Menu.setApplicationMenu(menu);
  }

  // ... show window
```

# Middleware example

```js
  const debugMenu = require('debug-menu').middleware;
  const context = require('electron-contextmenu-middleware');

  context.use(debugMenu);

  context.activate();
```

# Related projects

* [electron-contextmenu-middleware](https://github.com/parro-it/electron-contextmenu-middleware) - Build `electron` context menus composing multiple middlewares functions.

* [electron-input-menu](https://github.com/parro-it/electron-input-menu) - Context menu for [electron](https://github.com/atom/electron) input elements.


# License

The MIT License (MIT)

Copyright (c) 2016 Andrea Parodi



