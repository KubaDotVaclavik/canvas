import React, { Component } from 'react';
import Canvas from '../canvas/Canvas';
import Svg from '../svg/Svg'
import './App.css';

const styles = {
  // canvas
}

class App extends Component {
  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <div>
        <Canvas width={width}  height={height} style={{zIndex: 2}}/>
        <Svg  width={width}  height={height} style={{zIndex: 1}}/>
      </div>
    );
  }
}

export default App;
