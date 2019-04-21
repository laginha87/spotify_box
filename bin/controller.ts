

require('dotenv').config();
import { Spotify } from "../src/spotify";
import { Controller } from "../src/controller" ;

( async () => {
    const client = new Spotify()
    const controller = new Controller({
        0: client.back.bind(client),
        1: client.toggle.bind(client),
        2: client.next.bind(client),
    })


    while(true) {
        await controller.check()
    }

})()