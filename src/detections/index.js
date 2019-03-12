import React from 'react';
import './detections.css'

// Detect-API settings
const apiConfig = require('../config/').detectApi
/*
const apiConfig = {
  url: 'http://localhost:8080',
  headers: {
    method: "GET",
  }
}
*/

function DetectionList (props) {
  const detections = props.detections
  const listItems = detections.map( (detection) => {
    return (
      <Detection {...detection} />
    )
  });

  return (
    <div>
      {listItems}
    </div>
  )

}

class Detection extends React.Component {
  render() {
    return (
      <div className="Detection">
        <div>{this.props.name}</div>
        <div>{this.props.prob}</div>
      </div>
    )
  }
}

class Detections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundObjects: []
    }

    // This binding is necessary to make `this` work in the callback
    this.findDetections = this.findDetections.bind(this);
  }

  findDetections() {
    let detections = []
    //const path = '/new?img=' + './data/dog.jpg'
    const url = apiConfig.url

    fetch(url, apiConfig.headers)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.map( (item, index) => {
        item.key = index
        detections.push(item)
      })
    })
    .then( () => {
      this.setState(state => ({
        foundObjects: detections
      }))
    })

  }

  render() {
    return (
      <div className="Detections">
        <div>
          <h2>Detections</h2>
        </div>
        <div>Detected Objects</div>
          <DetectionList detections={this.state.foundObjects}/>
        <div>Detection Image</div>
        <button onClick={this.findDetections}>
          Detect Objects
        </button>
      </div>
    )
  }
}

export default Detections;
