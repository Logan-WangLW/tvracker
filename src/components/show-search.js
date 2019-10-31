import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { toggleShowSearchForm } from '../actions/show-search';

import ShowSearchForm from './show-search-form';
import ShowSearchResults from './show-search-results';

export class ShowSearch extends React.Component {
  handleClick() {
    this.props.dispatch(toggleShowSearchForm());
  }

  render() {
    console.log(this.props);
    let showSearchForm;
    let formButtonDesc;
    if (this.props.show.showSearchForm) {
      showSearchForm = <ShowSearchForm searchResults={this.props.searchResults} />
      formButtonDesc = 'Close Show Search Form';
    } else {
      formButtonDesc = 'Open Show Search Form';
    }

    return (
      <React.Fragment>
      <div>
        <div>
          <h1>Show Search</h1>
          <p>Looking for shows?</p>
        </div>
        <button onClick={() => this.handleClick()}>{formButtonDesc}</button>
        {showSearchForm}
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
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    loggedIn: state.auth.currentUser !== null,
    userId: state.auth.currentUser._id,
    searchResults: state.show.searchResults,
    loading: state.show.loading,
    show: state.show
  };
};

export default requiresLogin()(connect(mapStateToProps)(ShowSearch));