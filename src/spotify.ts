const SpotifyWebApi = require('spotify-web-api-node');


export class Spotify {
    private api : any;
    constructor(){
        this.api = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: 'http://www.example.com/callback'
        });

        this.api.setRefreshToken(process.env.REFRESH_TOKEN);
    }

    async refreshToken(){
        try {
            const token = await this.api.refreshAccessToken();
            this.api.setAccessToken(token.body['access_token']);

        } catch (error) {
            console.log(error)
        }
    }

    play(arg) {
        this.refreshToken()
        return this.api.play(arg)
    }

    toggle() {
        this.refreshToken()
        return this.api.getMyCurrentPlaybackState()
    }

    next() {
        this.refreshToken()
        return this.api.skipToNext()
    }

    back(){
        this.refreshToken()
        return this.api.skipToPrevious()
    }


}