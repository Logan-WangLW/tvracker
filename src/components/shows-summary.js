import React from 'react';
import Moment from 'react-moment';
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
        // console.log(show);
        let showEpisodes = show.episodes;
        
        //organise episodes by season
        let episodes = showEpisodes.reduce((acc, episode) => {
              if (!acc[episode.season]) {
                acc[episode.season] = [];
              }
          
              acc[episode.season].push(episode);
          
              return acc;
        }, {});
        // console.log(episodes);
        

        let cleanSummary = '';
        if(show.summary){
            cleanSummary = show.summary.replace(/<[^>]*>?/gm, '');
        }



        return (
          <li key={show.id}>
            <div>
              <h1>{show.name}</h1>
              {Object.keys(episodes).map(season =>{
              // console.log(episodes[season]) //returns array of episodes in each season
              // console.log(season) //returns individual season number
              return(
              episodes[season].map(episode =>{
                return(
                  <div key={episode._id}>
                  <div>Season: {season}</div>
                  <div>
                    <div>Episode: {episode.number}</div>
                    <div>{episode.name}</div>
                    <Moment format ='DD/MMM/YYYY'>{episode.airdate}</Moment>
                  </div>
                  </div>
                )
                })
              
              )
              })}
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