const jsQR = require("jsqr");
const SpotifyWebApi = require('spotify-web-api-node');
const jpeg = require('jpeg-js');
const {StreamCamera, Codec} = require("pi-camera-connect");

const util = require('util');
const sleep = util.promisify(setTimeout);


export async function cameraCycle() {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG,
        width: 600,
        height: 800
    });

    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://www.example.com/callback'
    });

    spotifyApi.setRefreshToken(process.env.REFRESH_TOKEN);
    try {
        const token = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(token.body['access_token']);

    } catch (error) {
        console.log(error)
    }
    await streamCamera.startCapture();
    while (true) {

        const imageData = await streamCamera.takeImage();
        const rawImageData = jpeg.decode(imageData, true);
        const qr = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);
        if (qr !== null) {
            await spotifyApi.play({ context_uri: qr.data });
            await sleep(5000);
        }
        await sleep(30);
    }
}