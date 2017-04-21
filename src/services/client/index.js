import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from 'services/redux/reducers';
import routes from 'services/routes';

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={store}>
            {routes}
    </Provider>),

    document.getElementById('app')
);
