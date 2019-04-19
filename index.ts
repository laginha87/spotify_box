

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
        0: client.back.bind(client),
        1: client.toggle.bind(client),
        2: client.next.bind(client),
    })

    await camera.init()

    while(true) {
        await controller.check()
        await camera.check()
    }

})()