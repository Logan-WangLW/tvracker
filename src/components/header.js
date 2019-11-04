

import React from 'react';
import Navbar from './navbar';
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>TVRACKER</h1>
        </div>
        <Navbar />
      </div>
    )
  }
}