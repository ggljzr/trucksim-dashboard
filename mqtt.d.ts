// see https://github.com/mqttjs/MQTT.js/issues/1412#issuecomment-1193363330
declare module "mqtt/dist/mqtt" {
    import MQTT from "mqtt"
    export = MQTT
}