

require('dotenv').config();

import { CameraCycle } from "../src/cameraCycle";
import { Spotify } from "../src/spotify";

( async () => {

    const client = new Spotify()
    const camera =  new CameraCycle(client)

    await camera.init()

    while(true) {
        await camera.check()
    }

})()