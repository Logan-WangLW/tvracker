import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import ShowSearchForm from './show-search-form';
import ShowSearchResults from './show-search-results';

export class ShowSearch extends React.Component {

  render() {
    return (
      <React.Fragment>
      <div>
        <div>
          <h1>Show Search</h1>
          <p>Looking for shows?</p>
        </div>
        <ShowSearchForm />
        <div>
          {this.props.loading ? 'Loading event search results...' : ''}
        </div>
        <ShowSearchResults />
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    loggedIn: state.auth.currentUser !== null,
    userId: state.auth.currentUser._id,
    searchResults: state.show.searchResults,
    loading: state.show.loading,
    show: state.show
  };
};

export default requiresLogin()(connect(mapStateToProps)(ShowSearch));