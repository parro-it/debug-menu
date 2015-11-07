# debug-menu

Chromium-like debugging context menu for electron.

This module was extracted from [electron-debug](https://github.com/sindresorhus/electron-debug) to keep it focused on it's main features.

[![NPM module](https://img.shields.io/npm/v/debug-menu.svg)](https://npmjs.org/package/debug-menu)
[![NPM downloads](https://img.shields.io/npm/dt/debug-menu.svg)](https://npmjs.org/package/debug-menu)

## Context menu items

* Inspect element

Inspect the clicked HTML element.
It show DevTools if it's not already opened.


## Installation

```bash
npm install --save-dev debug-menu
```

## Usage

Require this module only in renderer process code.
BrowserWindow instance has to be opened with node integration
enabled.

We usually load this module only if `DEBUG` environment is defined, to avoid app end users inadvertently open dev tools.


```javascript
  const debugMenu = require('debug-menu');
  debugMenu.install();  // activate context menu

  // later, if needed
  debugMenu.uninstall();  // deactivate context menu

```

## Api

* install()

Activate context menu. This method add a listener on `window` object
`contextmenu` event.

* uninstall()

Deactivate context menu. This method remove the listener on `window` object.

* menu

The debug [Menu](http://electron.atom.io/docs/v0.34.0/api/menu/) object instance. You can use it to integrate with your own app context or system menu.


## License

The MIT License (MIT)

Copyright (c) 2015 Andrea Parodi



