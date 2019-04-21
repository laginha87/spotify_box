const jsQR = require("jsqr");
const jpeg = require('jpeg-js');
const {StreamCamera, Codec} = require("pi-camera-connect");

const util = require('util');
const sleep = util.promisify(setTimeout);

export class CameraCycle {
    streamCamera : any
    spotifyClient : any

    constructor(spotifyClient){
        this.streamCamera = new StreamCamera({
            codec: Codec.MJPEG,
            width: 600,
            height: 800
        });

        this.spotifyClient = spotifyClient

    }

    async init() {
        await this.streamCamera.startCapture();
    }

    async check() {
        const imageData = await this.streamCamera.takeImage();
        const rawImageData = jpeg.decode(imageData, true);
        const qr = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);
        if (qr !== null) {
            await this.spotifyClient.play({ context_uri: qr.data });
            await sleep(5000);
        } else {
            await sleep(100);
        }
    }
}