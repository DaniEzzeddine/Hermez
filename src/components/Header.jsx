import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import hermes from 'hermes.png';

class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <nav className="navbar sticky-top navbar-light bg-light w-100">
            <img width="80px" src={hermes} alt="hermes" />

          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
