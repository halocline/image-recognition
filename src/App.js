import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Detections from './detections';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header></header>
        <Detections />
        <footer>
          <div>I am a footer.</div>
        </footer>
      </div>
    );
  }
}

export default App;
