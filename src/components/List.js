import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <ul className="list-group">
      {
        this.props.items.map((item) => {
          return <li style={{color:'white', margin:'10px 0px', width:'50px', height:'auto',fontSize:this.calculateTextSize(item, this.props.items)}} key={item.name} onClick={() => this.props.onItemClick(item)} >{item.name}</li>
        })
       }
      </ul>
    )
}

  calculateTextSize = (planet, items) => {
    const maxDisplaySize = 70

    var populationArr = items.map(item => item.population).filter(item => !isNaN(item)).map(item => parseInt(item))
    var maxPlanetPop = Math.max(...populationArr)

    var relativePlanetSize = Math.round(Math.pow(planet.population, 0.2))
    var relativeMaxSize = Math.round(Math.pow(maxPlanetPop, 0.2))

    if (isNaN(relativePlanetSize)) {
      relativePlanetSize = 2;
    }

    var calculatedSize = (relativePlanetSize / relativeMaxSize) * maxDisplaySize;
    return Math.min(10 + calculatedSize, maxDisplaySize + 10);
  }
}

export default List;
