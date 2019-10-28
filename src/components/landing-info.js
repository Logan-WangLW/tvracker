import React from 'react';
import Landing from './landing.js';
export default function LandingInfo(props) {
  return (
    <div>
      <div>
        <p>
          <br></br>
          <br></br>Sign up and log in to start tracking your shows
          <br></br>On log in you'll be redirected to an overview of your currently tracked shows
          <br></br>Add shows by pressing the add button
          <br></br>
        </p>
      </div>
      <Landing />
    </div>
  )
}