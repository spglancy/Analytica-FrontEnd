import React, { Component } from 'react'
import Stats from './Stats.js'
import firestore from '../firebase.js'
import './Stats.css'

const StatList = (props) => {
  console.log(props)
    return (
      <div>
        {props.viewers.length > 0  ? 
          <div className='viewerContainer'>    
<div className='Info'><Stats  place='Rank' viewer='Username' points={props.active === 'WatchTime' ? 'Minutes' : 'Points'} /> </div>
            {props.viewers.map((val, index) => <Stats key={index+1} place={index+1} viewer={val[0]} points={val[1]}/>)}
          </div>
      :
      <div className='viewerContainer'></div>}
        
      </div>
    )
}

export default StatList