const routes = require('express').Router();
const detectImage = require('../detectImage.js');

routes.get('/', function (req, res) {
  return new Promise(async function(resolve, reject) {
    const json = [
     {
        "x": 0.7502243518829346,
        "y": 0.20667922496795654,
        "w": 0.31608420610427856,
        "h": 0.18409302830696106,
        "prob": 0.7948464751243591,
        "name": "truck"
     },
     {
        "x": 0.4135103225708008,
        "y": 0.5051250457763672,
        "w": 0.6160792708396912,
        "h": 0.6109573245048523,
        "prob": 0.8468945622444153,
        "name": "bicycle"
     },
     {
        "x": 0.2994929254055023,
        "y": 0.6545103788375854,
        "w": 0.24297258257865906,
        "h": 0.5616251826286316,
        "prob": 0.775431752204895,
        "name": "dog"
     }
  ]
    const options = {
      //image: './data/horses.jpg',
      //image: './public/files/scream.jpg',
    }
    const detections = await detectImage.detectImage(options)

    resolve( res.json(detections) )
  });
})


routes.get('/new', function (req, res) {
  return new Promise(async function(resolve, reject) {
    const requestedImage = req.query.imgfile
    console.log('Requested image:', requestedImage);
    const options = {
      image: requestedImage,
    }
    const detections = await detectImage.detectImage(options)

    resolve( res.json(detections) )
  });
})


routes.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name

  console.log('Post endpoint hit.');
  console.log('Upload POST Request:', req.files);

  uploadFile.mv(
    `${__dirname}/../public/files/${fileName}`,
    (err) => {
      if(err) {
        return res.status(500).send(err)
      }
      res.json({
        file: `public/files/${req.files.file.name}`,
      })
    }
  )
})

module.exports = routes
