import React from 'react';
import './detections.css'
import MediaInput from '../media-input';

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
      imagePath: null,
      foundObjects: [],
    }

    // This binding is necessary to make `this` work in the callback
    this.findDetections = this.findDetections.bind(this);
  }

  findDetections() {
    let detections = []
    let url = ''
    const imgfile = this.state.imagePath

    console.log(imgfile);

    if (imgfile !== null) {
      url = apiConfig.url + '/new/?imgfile=' + imgfile
    }
    else {
      url = apiConfig.url
    }

    console.log(url);

    fetch(url, apiConfig.headers)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.map( (item, index) => {
        item.key = index
        return detections.push(item)
      })
    })
    .then( () => {
      this.setState(state => ({
        foundObjects: detections
      }))
    })

  }

  handleUploadedImage = (imagePath) => {
    console.log(this.state);
    console.log(imagePath);
    this.setState({
      imagePath: './' + imagePath,
    })
    console.log(this.state);
  }

  render() {
    return (
      <div className="Detections">
        <div>
          <h2>Detections</h2>
        </div>
        <MediaInput imageUploadCallback={this.handleUploadedImage} />
        <div>
          <h3>Detected Objects</h3>
          <DetectionList detections={this.state.foundObjects}/>
        </div>
        <div>Detection Image</div>
        <button onClick={this.findDetections}>
          Detect Objects
        </button>
      </div>
    )
  }
}

export default Detections;
