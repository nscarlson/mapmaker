// modules/NavLink.js
import React from 'react';
import { Link } from 'react-router';

export default class NavLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li><Link {...this.props} activeClassName="active"/></li>
    );
  }
}
