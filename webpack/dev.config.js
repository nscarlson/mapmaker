require('babel-polyfill');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === 'development'
});

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {
    plugins: combinedPlugins
});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
        reactTransform = plugin;
    }
}

if (!reactTransform) {
    reactTransform = ['react-transform', {
        transforms: []
    }];
    babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], {
        transforms: []
    });
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
});

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        main: [
            `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
            //            'font-awesome-webpack!./src/theme/font-awesome.config.js',
            'services/client',
            'components/App/App.scss'
        ],
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: `http://${host}:${port}/dist/`
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery)]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader',
                }),
            },
            { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
            {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                loader: 'url-loader?limit=10240'
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
        }),
        new ExtractTextPlugin({
            filename: '[name]-[chunkhash].css',
            allChunks: true,
        }),
        webpackIsomorphicToolsPlugin.development()
    ]
};
