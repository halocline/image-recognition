import React from 'react';

function drawBoundingBox(props) {
  const {ctx, x, y, width, height, name, prob} = props;
  ctx.strokeStyle = '#FFC300';
  ctx.strokeRect(x, y, width, height);
  ctx.font = '16px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillStyle = "#FFC300";
  ctx.fillText(
    name + ', ' + (prob * 100).toFixed(1) + '%',
    x,
    y + height
  )
}

class DetectionCanvas extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.refs.canvas
    const ctx = this.refs.canvas.getContext("2d")
    const detections = this.props.detections
    const width = this.refs.canvas.width
    const height = this.refs.canvas.height
    let img = new Image()
    img.src = this.props.source
    img.className = 'result'

    ctx.drawImage(img, 0, 0, width, height);

    detections.map( detection => {
      drawBoundingBox({
        ctx,
        x: (detection.x * width) - ( (detection.w * width) / 2 ),
        y: (detection.y * height) - ( (detection.h * height) / 2 ),
        width: detection.w * width,
        height: detection.h * height,
        name: detection.name,
        prob: detection.prob,
      })
    })
  }

  render() {
    return(
      <div>
        <canvas ref="canvas" width={600} height={400} />
      </div>
    )
  }
}

export default DetectionCanvas;
