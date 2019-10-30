import React from 'react';
import { BrowserRouter, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import LandingInfo from './components/landing-info';
import { connect } from 'react-redux';
import ShowSearch from './components/show-search';
import { refreshAuthToken } from './actions/auth';
class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
}

componentWillUnmount() {
    this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 // One hour
    );
}
stopPeriodicRefresh() {
  if (!this.refreshInterval) {
      return;
  }

  clearInterval(this.refreshInterval);
}
  render() {
    return (
      <div className="App">
      <Switch>
          <Route exact path='/' component={LandingInfo} />
          <Route exact path='/show-search' component={ShowSearch}/>
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
})

export default withRouter(connect(mapStateToProps)(App));