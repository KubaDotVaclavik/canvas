import React, { Component } from 'react';
import Canvas from '../canvas/Canvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas width={400}  height={350}/>
      </div>
    );
  }
}

export default App;
