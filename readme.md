# debug-menu

Chrome-like "inspect element" context-menu for [Electron](http://electron.atom.io)

> This module was extracted from [electron-debug](https://github.com/sindresorhus/electron-debug) to keep it focused on its main features.

[![Travis Build Status](https://img.shields.io/travis/parro-it/debug-menu.svg)](http://travis-ci.org/parro-it/debug-menu)
[![npm module](https://img.shields.io/npm/v/debug-menu.svg)](https://npmjs.org/package/debug-menu)
[![npm downloads](https://img.shields.io/npm/dt/debug-menu.svg)](https://npmjs.org/package/debug-menu)

## Context menu items

### Inspect element

Inspect the clicked HTML element.
It shows DevTools if it's not already opened.


## Install

```
$ npm install --save-dev debug-menu
```

## Usage

Require this module only in renderer process code.
BrowserWindow instance has to be opened with node integration
enabled.

We usually load this module only if the `DEBUG` environment variable is defined, to avoid end users of the app inadvertently opening DevTools.


```js
const debugMenu = require('debug-menu');
debugMenu.install();  // activate context menu

// later, if needed
debugMenu.uninstall();  // deactivate context menu
```

## API

### debugMenu.install()

Activate context menu. This method add a listener on `window` object `contextmenu` event.

### debugMenu.uninstall()

Deactivate context menu. This method remove the listener on `window` object.

### debugMenu.windowDebugMenu(win);

The debug [Menu](http://electron.atom.io/docs/latest/api/menu/) object template. You can use it to integrate with your own app context or `BrowserWindow` menu.

#### options

##### win

`BrowserWindow` instance to use for this Menu.

Type: `BrowserWindow`<br>
Default: the currently focused `BrowserWindow`.


## License

The MIT License (MIT)

Copyright (c) 2016 Andrea Parodi



