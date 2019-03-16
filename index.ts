
const jsQR = require("jsqr");
const promisify = require("promisify-node");
const SpotifyWebApi = require('spotify-web-api-node');
const jpeg = require('jpeg-js');


const {StreamCamera, Codec} = require("pi-camera-connect");



require('dotenv').config()


const util = require('util');
const sleep = util.promisify(setTimeout);

const snapPath = `${ __dirname }/test.jpg`;
console.log("Setting up camera")


const streamCamera = new StreamCamera({
    codec: Codec.MJPEG
});

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://www.example.com/callback'
  });

spotifyApi.setRefreshToken(process.env.REFRESH_TOKEN);





( async () => {
    try {
        const token = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(token.body['access_token']);

    } catch(error)  {
        console.log(error)
    }

    while(true){
        console.log("Round")

        await streamCamera.startCapture();

        const imageData = await streamCamera.takeImage();

        const rawImageData = jpeg.decode(imageData, true);
        const qr = jsQR(rawImageData.data, rawImageData.width, rawImageData.height);
        if(qr !== null) {
            await spotifyApi.play({context_uri: qr.data});
        }
        await streamCamera.stopCapture();
        await sleep(10);
    }
})()