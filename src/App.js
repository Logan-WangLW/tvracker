import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LandingInfo from './components/landing-info';
import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={LandingInfo} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(App);