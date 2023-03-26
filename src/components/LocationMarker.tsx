import { useState } from 'react';
import { LatLng } from 'leaflet';
import { useMapEvents, Marker, Popup } from 'react-leaflet'

/**
 * This is an utility/developement component that draws a marker with current location
 * (lat/lng) on the map. This is useful for finding coordinates in the leaflet map that
 * can be used in development (e. g. map bounds or mappings to telemetry coordinates).
 */
export default function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null)
    const map = useMapEvents({
        click(e) {
            map.locate()
            setPosition(e.latlng)
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here <br />
                {position.lat} {position.lng}
            </Popup>
        </Marker>
    )
}