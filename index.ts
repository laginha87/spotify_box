

require('dotenv').config();
const MPR121 = require('adafruit-mpr121');
import HiFi from "./src/hifi";
import { cameraCycle } from "./src/cameraCycle";
import { Spotify } from "./src/spotify";

( async () => {
    console.log("Startinge")
    const mpr121  = new MPR121(0x5A, 1);
    console.log("Created")
    mpr121.on('touch', (pin) => console.log(`pin ${pin} touched`));
    mpr121.on('release', (pin) => console.log(`pin ${pin} released`));
    mpr121.on(10, (state) => console.log(`pin 10 is ${state ? 'touched' : 'released'}`));
    mpr121.on(10, (state) => console.log(`pin 0 is ${state ? 'touched' : 'released'}`));
    mpr121.on('error', (e) => console.log(e))
    console.log("Starting the loop")
    let i = 0
    while(true) {
        (() => {
            console.log(mpr121)
        })()
    }
    // const res = await HiFi.turnOff()
    // client = new Spotify()
    // cameraCycle(client)
})()