

require('dotenv').config()

import HiFi from "./src/hifi";
import { cameraCycle } from "./src/cameraCycle";

( async () => {

    // const res = await HiFi.turnOff()
    cameraCycle()
})()