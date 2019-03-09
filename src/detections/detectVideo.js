const darknet = require('@moovel/yolo');

darknet.detect({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  cameraIndex: 0, // optional, default: 0,
  //video: './test.mp4', // optional, forces to use the video file instead of a camera
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5
}, function(modified, original, detections, dimensions) {
  /**

  modified - raw frame with detections drawn, rgb24 format
  original - raw frame, as captured by the webcam/video, rgb24 format,
  detections - array of detections
  dimenstions - image width and height

  Example detections:

  [ { x: 0.8602103590965271,
      y: 0.20008485019207,
      w: 0.13895535469055176,
      h: 0.39782464504241943,
      prob: 0.2408987432718277,
      name: 'tvmonitor' },
    { x: 0.26072466373443604,
      y: 0.4977818727493286,
      w: 0.10842404514551163,
      h: 0.22796104848384857,
      prob: 0.3290732204914093,
      name: 'person' },
    { x: 0.2568981349468231,
      y: 0.5765896439552307,
      w: 0.12322483211755753,
      h: 0.2544059157371521,
      prob: 0.2738085687160492,
      name: 'chair' },
    { x: 0.6593853235244751,
      y: 0.8188746571540833,
      w: 0.06210440397262573,
      h: 0.100614033639431,
      prob: 0.3225017189979553,
      name: 'clock' } ]

  **/
});

darknet.detectImage({
  cfg: './cfg/yolo.cfg',
  weights: './yolo.weights',
  data: './cfg/coco.data',
  image: './data/dog.jpg',
  thresh: 0.24, // optional, default: 0.24
  hierThresh: 0.5, // optional, default: 0.5,
}, (modified, original, detections, dimensions) => {
  console.log('Detections:', detections)
  const data = detections

  fs.writeFile('detections.txt', data, err => {
    if (err) throw err
    console.log('The file has been saved!')
  })
})
