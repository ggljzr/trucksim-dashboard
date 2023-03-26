import { Icon } from 'leaflet';
import { useMap, Marker } from 'react-leaflet'

import { DPlacement } from '../../types';
import { dPlacementToPoint } from '../../utils';

interface Props {
    currentPlacement: DPlacement | null,
}

/**
 * Component for displaying player marker within the map. Has to be in MapContainer.
 */
export default function PlayerMarker({ currentPlacement }: Props) {
    const map = useMap();
    const position = (currentPlacement === null) ? null : map.unproject(dPlacementToPoint(currentPlacement), map.getMaxZoom());

    const icon = new Icon({
        iconUrl: 'logo192.png',

        iconSize: [20, 20], // size of the icon
        rotationAngle: 10,
    })

    return position === null ? null : (
        <Marker position={position} icon={icon} />
    )
}