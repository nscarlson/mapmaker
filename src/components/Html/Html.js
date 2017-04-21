import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

const { object, string } = PropTypes;

class Html extends Component {
    static defaultProps = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    }

    static displayName = 'Html'

    static propTypes = {
        children: string.isRequired,
        initialState: object.isRequired
    }

    render() {
        const {assets, component, store} = this.props;
        const head = Helmet.rewind();

        return (
            <html lang="en-us">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    <link href="/favicon.ico" rel="shortcut icon" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    {/* styles (will be present only in production with webpack extract text plugin) */}
                    {Object.keys(assets.styles).map((style, key) =>
                        <link
                            charSet="UTF-8"
                            href={assets.styles[style]}
                            key={key}
                            media="screen, projection"
                            rel="stylesheet"
                            type="text/css"
                        />
                    )}

                    {/* (will be present only in development mode) */}
                    {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
                    {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
                    {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
                    {/* { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('components/App/App.scss')._style }} /> : null } */ }

                </head>

                <body>
                    <div dangerouslySetInnerHTML={{ __html: this.props.children }} id="app" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`
                        }}
                        id="initial-state"
                    />
                    <script src={assets.javascript.main} charSet="UTF-8"/>
                </body>

            </html>
    )}
}

export default Html;
