import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import {addTrackedShowsToUser, fetchTrackedShows} from '../actions/shows';
import {addEpisodes} from '../actions/episodes';
export class ShowSearchResults extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchTrackedShows());
  }
  
  addShow(showId) {

      (this.props.dispatch(addTrackedShowsToUser(showId)),
      this.props.dispatch(fetchTrackedShows()))
        .then(() => this.props.dispatch(addEpisodes(showId)));
  }

  render(){
    
    let trackedShowsArray = this.props.userShows.map((show) => Number(show.id));
    // console.log(trackedShowsArray);


    const { shows } = this.props;
    let searchResults;
    if (shows === null) {
      searchResults = <p>No search results to display.</p>
    }
    if (shows !== null) {
      searchResults = shows.map((show, index) => {
        let showId = show.id;
        if(!trackedShowsArray.includes(show.id)){
            return (
              <div key={index}>
              <ul>
                <li>{show.name}</li>
                <li>Status: {show.status}</li>
                <li>Image:<img src={show.image ? show.image.medium:'No image available'} alt={show.name}></img></li>
                <li>Type: {show.type}</li>
              </ul>
              <button id={show.id} value={show.name} onClick={() => {
                this.addShow(showId);
                }}>Add Show</button>
            </div>
          )}
           else {
             return (
                  <div key={index}>
                    <ul>
                      <li>{show.name}</li>
                      <li>Status: {show.status}</li>
                      <li>Image:<img src={show.image ? show.image.medium:'No image available'} alt={show.name}></img></li>
                      <li>Type: {show.type}</li>
                    </ul>
                    <button id={show.id} value={show.name} disabled>Show is tracked!</button>
                  </div>
            )}
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
    shows: state.show.searchResults,
    userShows: state.shows.userShows
  };
};

export default requiresLogin()(connect(mapStateToProps)(ShowSearchResults));