import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header'
import Footer from './components/Footer'

const { func, node } = PropTypes;

class App extends Component {

    static propTypes = {
        children: node
    }

    render() {
        return (
            <div className='app'>
                <Header />
                { this.props.children }
                <Footer />
            </div>
        )
    }
}

export default App;
