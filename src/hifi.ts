
const fetch = require('node-fetch');

export default class HiFi {

    public static async turnOn() {
        return this.post('<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>On</Power></Power_Control></Main_Zone></YAMAHA_AV>')
    }

    public static async turnOff() {
        return this.post('<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>Standby</Power></Power_Control></Main_Zone></YAMAHA_AV>')
    }

    public static async post(body) {
        return await fetch(process.env.HIFI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/xml' },
            body })
    }
}