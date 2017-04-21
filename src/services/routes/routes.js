import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';


import App              from 'components/App';
import About            from 'scenes/About';
import Home             from 'scenes/Home';
import Blog             from 'scenes/Blog';

export default (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='/blog/:blogtitle' component={Blog}/>
            <Route path='/about' component={About}/>
        </Route>
    </Router>
);
