import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from '../actions';

class Header extends React.Component {

  handleSignout() {
    this.props.signOutUser();
  }

  getSignOutTitle() {
    return 'Sign out '+this.props.user.email;
  }

  renderAuthLinks() {
    if (this.props.authenticated) {

      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">My Favorites</Link>
        </li>,
        <li className="nav-item" key={2}>
          <a className="nav-link" title={this.getSignOutTitle()} onClick={() => this.handleSignout()}>Sign Out</a>
        </li>
      ]
    }
    else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">React2Gifs</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/" className="navbar-brand">
                  <i className="fa fa-search"></i>
                </Link>
              </li>
              { this.renderAuthLinks() }
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, Actions)(Header);
