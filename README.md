# trucksim-dashboard

React dashboard build on [trucksim-mqtt-telemetry](https://github.com/ggljzr/trucksim-mqtt-telemetry) plugin.

![trucksim dashboard displaying a map](dashboard.png "Dashboard")

## Starting developement server

Environment variable ``REACT_APP_MQTT_BROKER_URL`` with full MQTT broker URL (e. g. ``ws://192.168.22.83:8080``) has to be
set. This will be the broker that the application will connect to.

On Windows (Powershell) with NPM:

```bash
> ($env:REACT_APP_MQTT_BROKER_URL = "ws://192.168.22.83:8080") -and (npm start)
```

## Map tiles

This repository includes [SCS Map Tiles](https://github.com/Unicor-p/SCS_Map_Tiles) as a submodule.