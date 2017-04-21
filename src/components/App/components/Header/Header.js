import React, { Component } from 'react';
import NavLink from 'components/NavLink';

class Header extends Component {
    render() {
        return (
            <nav role="navigation">
                <ul role='menubar' className='nav'>
                    <li>
                        <NavLink to='/' className='active'>                <i className='fa fa-map' aria-hidden="true"></i>
</NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog'>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>About</NavLink>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Header;
