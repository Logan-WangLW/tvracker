import React from 'react';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth.js';
import { clearAuthToken } from '../local-storage.js';
import { connect } from 'react-redux';

export class Navbar extends React.Component {

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    if (this.props.user) {
      return (
        <nav>
          <ul>
            <li><Link to={'/'}>Login/Register</Link></li>
            <li><Link to={'/shows-summary'}> Shows </Link> </li>
            <li><Link to={'/show-search'}>Search for Shows</Link></li>
            <li id="logout-button" onClick={() => this.logOut()}><Link to={'/'}>Sign Out</Link></li>
          </ul>

        </nav>
      )
    }
    return (
      <nav>
        <ul>
          <li><Link to={'/'}>Login/Register</Link></li>
          <li><Link to={'/shows-summary'}> Shows </Link> </li>
          <li><Link to={'/show-search'}>Search for Shows</Link></li>
        </ul>

      </nav>
    )
  }
}
const mapStateToProps = state => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(Navbar)