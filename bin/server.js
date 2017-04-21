#!/usr/bin/env node

require('../server.babel'); // babel registration (runtime transpilation for node)
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
let __CLIENT__ = false;
let __SERVER__ = true;
let __DISABLE_SSR__ = false; // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING

if (process.env.NODE_ENV === 'development') {
    if (!require('piping')(
        {
            hook: true,
            ignore: /(\/\.|~$|\.json|\.scss$)/i
        }
    )) {
        return;
    }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .server(rootDir, () => {
        require('services/server');
    });
