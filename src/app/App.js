import React, { Component } from 'react';
import Canvas from '../canvas/Canvas';
import Svg from '../svg/Svg'
import './App.css';

const styles = {
  // canvas
}

class App extends Component {
  constructor(props){
    super(props)
    this.getCoors = this.getCoors.bind(this)
  }


  getCoors(n){
    return this.refs.svg.pathToCoors(n)
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <div onClick={this.getCoors}>
        <Canvas width={width}  height={height} style={{zIndex: 2}}
        distributeAlongPath={this.getCoors}        
        />
        <Svg ref="svg" width={width}  height={height} style={{zIndex: 1}}/>
      </div>
    );
  }
}

export default App;
