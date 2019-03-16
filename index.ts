const jsQR = require("jsqr");

const image = require('get-image-data')

const PiCamera = require('pi-camera');


const snapPath = `${ __dirname }/test.jpg`;
console.log("Setting up camera")


const myCamera = new PiCamera({
    mode: 'photo',
    output: snapPath,
    width: 640,
    height: 480,
    nopreview: true,
});

console.log("Starting Recording")

const rec = myCamera.snap()
  .then((result) => {
    // Your video was captured
    console.log("Success")
  })
  .catch((error) => {
     // Handle your error
     console.log("Not really")
  });


// const end = new Promise((resolve ) => {
//     image(dir, function (err, info) {
//         const cenas = jsQR(info.data, info.width, info.height)
//         console.log(cenas.data)
//         resolve()
//     })

// });

( async () => {
    while(true){
        await rec
    }
})()