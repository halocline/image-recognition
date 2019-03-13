import React from 'react';
import './detections.css'
import MediaInput from '../media-input';

// Detect-API settings
const apiConfig = require('../config/').detectApi

function drawBoundingBox(props) {
  const {ctx, x, y, width, height} = props;
  ctx.strokeRect(x, y, width, height);
}

/*
function BoundingBoxes (props) {
  const detections = props.detections
  const boxes = detections.map( (detection) => {
    const scale = 100
    return (
      drawBoundingBox({
        ctx,
        x: {props.x},
        y: {props.y},
        width: scale,
        height: scale
      })
    )
  })
}
*/

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      source: 'https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/birth_month_flowers-primary-1920x1280px_pixabay.jpg?itok=zmvl5X7w'
    }
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.refs.canvas
    const ctx = this.refs.canvas.getContext("2d")

    //ctx.clearRect(0,0, 300, 300);
    console.log('Canvas props:', this.props);

    drawBoundingBox({ctx, x: 10, y: 10, width: 50, height: 50});
    drawBoundingBox({ctx, x: 20, y: 20, width: 50, height: 50});
  }

  render() {
    return(
      <div>
        <canvas ref="canvas" width={100} height={100} />
      </div>
    )
  }
}


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
    this.setState({
      imagePath: './' + imagePath,
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
            <DetectionList detections={this.state.foundObjects}/>
            <div>
              <h4>Detection Image</h4>
              <Canvas text={'yo mamma'} detections={this.state.foundObjects} source={this.imagePath} />
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Detections;
