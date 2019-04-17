const jsQR = require("jsqr");
const SpotifyWebApi = require('spotify-web-api-node');
const jpeg = require('jpeg-js');
const {StreamCamera, Codec} = require("pi-camera-connect");

const util = require('util');
const sleep = util.promisify(setTimeout);


export async function cameraCycle(spotifyClient) {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        width: 600,
        height: 800
    });

    await streamCamera.startCapture();
    while (true) {

        const imageData = await streamCamera.takeImage();
        const rawImageData = jpeg.decode(imageData, true);
        const qr = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);
        if (qr !== null) {
            await spotifyClient.play({ context_uri: qr.data });
            await sleep(5000);
        }
        await sleep(30);
    }
}