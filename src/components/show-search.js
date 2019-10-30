import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

// import ShowSearchForm from './show-search-form';
// import ShowSearchResults from './event-search-results';

export class EventSearch extends React.Component {

  render() {

    return (
      <React.Fragment>
      <div className="outer-div">
      <div className="header-section">
        <h1>Show Search</h1>
        <p>Looking for shows?</p>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    loggedIn: state.auth.currentUser !== null,
    userId: state.auth.currentUser._id,
  };
};

export default requiresLogin()(connect(mapStateToProps)(EventSearch));