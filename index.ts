const PiCamera = require('pi-camera');
const jsQR = require("jsqr");
const promisify = require("promisify-node");

const util = require('util');
const sleep = util.promisify(setTimeout);
const image = promisify(require('get-image-data'))

const snapPath = `${ __dirname }/test.jpg`;
console.log("Setting up camera")


const myCamera = new PiCamera({
    mode: 'photo',
    output: snapPath,
    width: 640,
    height: 480,
    nopreview: true,
});



( async () => {
    while(true){
        console.log("Round")
        const rec = myCamera.snap()
        await rec

        const imageData = await image(snapPath);
        console.log(imageData)
        const qr = jsQR(imageData.data, imageData.width, imageData.height)
        if(qr !== null) {
            console.log(qr.data)
        }
        await sleep(1000);
    }
})()