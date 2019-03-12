const darknet = require('@moovel/yolo')
const fs = require('fs')

const handleDetections = (detections) => {
  //console.log('Detections:', detections)
  //console.log(detections.length, 'objects detected.')
  writeToFile(detections)
}

const writeToFile = (data) => {
  data = JSON.stringify(data, null, 3)
  console.log(data)
  fs.writeFile('./public/detections.json', data, err => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log('The file has been saved!')
  })
}

const detectImage = (options = 0) => {
/*
  options = {
    image: './public/files/scream.jpg'
  }
  */
  const params = {
    cfg: './cfg/yolo.cfg',
    weights: './yolo.weights',
    data: './cfg/coco.data',
    image: options.image || './public/files/giraffe.jpg',
    thresh: 0.24, // optional, default: 0.24
    hierThresh: 0.5, // optional, default: 0.5,
  }

  return new Promise(function(resolve, reject) {
    darknet.detectImage(
      params,
      (modified, original, detections, dimensions) => {
        handleDetections(detections)
        resolve(detections)
    })
  });
}

module.exports = {
  detectImage: detectImage,
  yo: 'mamma',
}
