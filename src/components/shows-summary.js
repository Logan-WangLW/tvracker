import React from 'react';
import { connect } from 'react-redux';
import { fetchTrackedShows, deleteTrackedShowsToUser } from '../actions/shows';
import {addEpisodes} from '../actions/episodes';

export class ShowsSummary extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchTrackedShows());
    this.fetchEpisodes();
  }
  componentDidUpdate(prevProps){
    this.fetchEpisodes();
  }
  fetchEpisodes() {
    let shows = [...this.props.userShows];
    shows.forEach(show => {
      this.props.dispatch(addEpisodes(show._id,show.id));
    });
  }
  render() {

    let shows;
    const username = this.props.user ? this.props.user.username : '';
    const showsArray = [...this.props.userShows];
    // console.log(showsArray);
    
    if (showsArray.length > 0) {
      shows = this.props.userShows.map((show) => {
        let cleanSummary = '';
        if(show.summary){
            cleanSummary = show.summary.replace(/<[^>]*>?/gm, '');
        }
        // console.log(show.episodes);
        return (
          <li key={show.id}>
            <div>
              {show.name}
              
              <img src={show.image ? show.image.medium:'No image available'} alt={show.name} />
              {cleanSummary}
              <button onClick={() => this.props.dispatch(deleteTrackedShowsToUser(show._id))}>Remove</button>
            </div>
          </li>
        )
      })
    }
    return (
      <div>
        <h1> {`${username}'s Tracked Shows `}</h1>
        <p>Add shows by searching for them!</p>
        {showsArray.length > 0 &&
          <ul>
            <div>{shows}</div>
          </ul>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  userShows: state.shows.userShows,
  authToken: state.auth.authToken
})

export default connect(mapStateToProps)(ShowsSummary);