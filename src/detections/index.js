import React from 'react';
import './detections.scss'
import MediaInput from '../media-input';
import DetectionCanvas from './detection-canvas'

// Detect-API settings
const apiConfig = require('../config/').detectApi

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
      imageFileName: null,
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

  handleUploadedImage = (imagePath, fileName) => {
    this.setState({
      imagePath: './' + imagePath,
      imageFileName: fileName,
    })
  }

  render() {
    return (
      <div className="Detections">
        <div className="container">
          <h2>Detections</h2>
          <div className="left_column">
            <MediaInput imageUploadCallback={this.handleUploadedImage} />
            <button onClick={this.findDetections}>
              Detect Objects
            </button>
          </div>
          <div className="right_column">
            <h3>Detected Objects</h3>
            <div>
              <h4>Detection Image</h4>
              <DetectionCanvas
                detections={this.state.foundObjects}
                source={apiConfig.url + '/files/' + this.state.imageFileName}
              />
            </div>
            <DetectionList detections={this.state.foundObjects}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Detections;
