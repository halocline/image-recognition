const darknet = require('@moovel/yolo')
const fs = require('fs')

/*
darknet.detectImage({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  image: './data/dog.jpg',
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5,
}, (modified, original, detections, dimensions) => {
  handleDetections(detections)
})
*/

const handleDetections = (detections) => {
  console.log('Detections:', detections)
  console.log(detections.length, 'objects detected.')
  writeToFile(detections)
}

const writeToFile = (data) => {
  data = JSON.stringify(data, null, 3)
  console.log(data)
  fs.writeFile('detections.json', data, err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log('The file has been saved!')
  })
}

const detectImage = () => {
  darknet.detectImage({
    cfg: './cfg/yolo.cfg',
    weights: './yolo.weights',
    data: './cfg/coco.data',
    image: './data/dog.jpg',
    thresh: 0.24, // optional, default: 0.24
    hierThresh: 0.5, // optional, default: 0.5,
  }, (modified, original, detections, dimensions) => {
    handleDetections(detections)
    return detections
  })
}

export default detectImage;
