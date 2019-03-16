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



( async () => {
    while(true){
        const rec = myCamera.snap()
        await rec

        const end = new Promise((resolve ) => {
            image(snapPath, function (err, info) {
                const qr = jsQR(info.data, info.width, info.height)
                console.log(qr.data)
                resolve()
            })

        });
        await end
    }
})()