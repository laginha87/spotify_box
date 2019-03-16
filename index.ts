const PiCamera = require('pi-camera');
const jsQR = require("jsqr");
const promisify = require("promisify-node");
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config()


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
        const rec = myCamera.snap()
        await rec

        const imageData = await image(snapPath);
        const qr = jsQR(imageData.data, imageData.width, imageData.height)
        if(qr !== null) {
            await spotifyApi.play({context_uri: qr.data});
        }
        await sleep(1000);
    }
})()