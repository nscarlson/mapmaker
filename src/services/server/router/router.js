import { createLocation } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import { RouterContext, match } from 'react-router';
import { NODE_ENV } from 'services/constants'
import routes from 'services/routes';
import reducers from 'services/redux/reducers';

// Html root component
import Html from 'components/Html';

let store = createStore(reducers);

const router = (req, res) => {

    if (NODE_ENV === 'development') {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const location = createLocation(req.url);

    match({ location, routes }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient();
        } else if (renderProps) {
            loadOnServer({...renderProps, store }).then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect {...renderProps} />
                    </Provider>
                );

                res.status(200);
                global.navigator = {userAgent: req.headers['user-agent']};
                res.send(
                    '<!doctype html>\n' + ReactDOM.renderToString(
                        <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
            });
        } else {
            res.status(404).send('Not found');
        }
            //res.status(200).send(
            // `<!doctype html>
            // <html>
            //     <header>
            //         <title>My Universal App</title>
            //         <link rel='stylesheet' href='/public/main.css'>
            //     </header>
            //     <body>
            //         <div id='app'>
            //             ${renderToString(
            //                 <Provider store={createStore(reducers)}>
            //                     <RouterContext {...renderProps} />
            //                 </Provider>
            //             )}
            //         </div>
            //         <script src='/public/client.js' />
            //     </body>
            // </html>`
            //);
        }
    )
}
export default router;
