import React, { Component } from "react"

const Stats = (props) => {
  console.log(props.active)
    return (
      <div className='statsList'>
        <span>{props.place}</span><span>{props.viewer}</span><span>{props.points}</span>
      </div>
    )
  }


export default Stats