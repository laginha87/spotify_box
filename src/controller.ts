const MPR121 = require('adafruit-mpr121');

type Signal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type Callback = () => void
type InputMap = Partial<{ [key in Signal]: Callback }>

export class Controller {
    mpr121: any

    constructor(map: InputMap) {
        this.mpr121 = new MPR121(0x5A, 1);

        Object.keys(map).forEach((k) => {
            this.mpr121.on(k, async (state : boolean) => { if (state) { await map[k]() } })
        })
        this.mpr121.on('touch', (pin) => console.log(`touched ${pin}`))
    }

    async check() {
        await this.mpr121.touched()
    }
}