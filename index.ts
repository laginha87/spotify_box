const dir = '/Users/filipecorreia/Dropbox/explosions.png';

const jsQR = require("jsqr");

const image = require('get-image-data')

const PiCamera = require('pi-camera');


console.log("Setting up camera")

const myCamera = new PiCamera({
  mode: 'video',
  output: `${ __dirname }/video.h264`,
  width: 1920,
  height: 1080,
  timeout: 5000, // Record for 5 seconds
  nopreview: true,
});

console.log("Starting Recording")

myCamera.record()
  .then((result) => {
    // Your video was captured
    console.log(result)
  })
  .catch((error) => {
     // Handle your error
  });


// const end = new Promise((resolve ) => {
//     image(dir, function (err, info) {
//         const cenas = jsQR(info.data, info.width, info.height)
//         console.log(cenas.data)
//         resolve()
//     })

// });

while(true){

}