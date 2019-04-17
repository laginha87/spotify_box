

require('dotenv').config()
const MPR121 = require('adafruit-mpr121')
import HiFi from "./src/hifi";
import { cameraCycle } from "./src/cameraCycle";

( async () => {
    mpr121  = new MPR121(0x5A, 1);
    mpr121.on('touch', (pin) => console.log(`pin ${pin} touched`));
    mpr121.on('release', (pin) => console.log(`pin ${pin} released`));
    mpr121.on(10, (state) => console.log(`pin 10 is ${state ? 'touched' : 'released'}`));
    mpr121.on(10, (state) => console.log(`pin 0 is ${state ? 'touched' : 'released'}`));
    while(true) {

    }
    // const res = await HiFi.turnOff()
    // cameraCycle()
})()