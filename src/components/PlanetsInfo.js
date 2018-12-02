import React, { Component } from 'react';
import closeIcon from "./../icon-close-white.png"


const PlanetsInfo = (props) => {
  var position = !isNaN(props.position) ? props.position : Math.round((Math.random() * 100) % 15)
  if (position > 15) {
    position = position % 15
  }
  if (position < 0) {
    position = 0
  }
  var image = require("./../planets/planet_" + position + ".png")

    return (
      <div style={{ width:'auto', height:'auto', display:props.show ? '' : 'none', position:'fixed', right:'0', top:'0', margin:'40px'}}>
        <div >
          <p style={{fontSize:'40px',color:'white'}}><b>{props.children.name}</b></p>
          <img alt="close" src={closeIcon} style={{height:'30px', width:'30px', position:'absolute', right:'0', top:'0', marginTop:'55px'}} onClick={props.handleClose}/>
          <img src={image} style={{height:calculateSize(props.children), width:calculateSize(props.children)}} alt="loader" />
          <div>
            <p style={{fontSize:'12px',color:'white'}}>Population: <b>{props.children.population}</b>.</p>
            <p style={{fontSize:'12px',color:'white'}}>Rotation period: <b>{props.children.rotation_period} days</b></p>
            <p style={{fontSize:'12px',color:'white'}}>Orbital period: <b>{props.children.orbital_period} days</b></p>
          </div>
        </div>

      </div>
  );
}

const calculateSize = (planet) => {
  var diameter = isNaN(planet.diameter) ? '2000' : planet.diameter
  if (diameter === '0') {
    diameter = '2000'
  }
  return Math.min(Math.round(Math.pow(diameter, 0.3)) * 20, 500)
}

export default PlanetsInfo;
