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

    async play(arg=null) {
        await this.refreshToken()
        return this.api.play(arg)
    }

    async toggle() {
        await this.refreshToken()
        const { body: { is_playing } } = await this.api.getMyCurrentPlaybackState()
        return is_playing ? this.api.pause() : this.api.play()
    }

    async next() {
        await this.refreshToken()
        return this.api.skipToNext()
    }

    async back(){
        await this.refreshToken()
        return this.api.skipToPrevious()
    }


}