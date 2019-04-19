

require('dotenv').config();

import HiFi from "./src/hifi";
import { CameraCycle } from "./src/cameraCycle";
import { Spotify } from "./src/spotify";
import { Controller } from "./src/controller" ;

( async () => {
    // const res = await HiFi.turnOff()

    const client = new Spotify()
    const camera =  new CameraCycle(client)
    const controller = new Controller({
        0: async () => {
            const a =  await client.toggle()
            console.log(a)
        }
    })

    await camera.init()

    while(true) {
        await controller.check()
        await camera.check()
    }

})()