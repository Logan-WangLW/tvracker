import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {addTrackedShowsToUser, fetchTrackedShows} from '../actions/shows';
export class ShowSearchResults extends React.Component {

  onClick(showId) {
    console.log('show ---> ', showId);
    return(
      this.props.dispatch(addTrackedShowsToUser(showId)),
      this.props.dispatch(fetchTrackedShows())
      );
  }

  render() {
    console.log(this.props);
    const { shows } = this.props;
    let searchResults;
    if (shows === null) {
      searchResults = <p>No search results to display.</p>
    }
    if (shows !== null) {
      searchResults = shows.map((show, index) => {
        let showId = show.id;
        if(show.image){
          if(show.image.medium){
            return (
              <div key={index}>
              <ul>
                <li>{show.name}</li>
                <li>Status: {show.status}</li>
                <li>Image:<img src={show.image.medium} alt={show.name}></img></li>
                <li>Type: {show.type}</li>
              </ul>
              <button id={show.id} value={show.name} onClick={() => this.onClick(showId)}>Add Show</button>
            </div>
          )
          }
        }
        return (
          <div key={index}>
            <ul>
              <li>{show.name}</li>
              <li>Status:{show.status}</li>
              <li>Image: 'No image available'</li>
              <li>Type:{show.type}</li>
            </ul>
            <button id={show.id} value={show.name} onClick={() => this.onClick(showId)}>Add Show</button>
          </div>
        )
      })
    }
    if (shows !== null && shows.length === 0) {
      searchResults = <p>The search has returned no results. Try searching with different inputs.</p>
    }


    return (
      <section>
        <h1>Show Search Results!</h1>
        {searchResults}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    loggedIn: state.auth.currentUser !== null,
    userId: state.auth.currentUser._id,
    shows: state.show.searchResults
  };
};

export default requiresLogin()(connect(mapStateToProps)(ShowSearchResults));