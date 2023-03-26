import { useEffect } from 'react'

import { Icon } from 'leaflet';
import { useMap, Marker } from 'react-leaflet'

import { DPlacement } from '../../types';
import { dPlacementToPoint } from '../../utils';

interface Props {
    currentPlacement: DPlacement | null,
    autoCenter?: boolean,
}

/**
 * Component for displaying player marker within the map. Has to be in MapContainer.
 */
export default function PlayerMarker({ currentPlacement, autoCenter }: Props) {
    const map = useMap();
    const position = (currentPlacement === null) ? null : map.unproject(dPlacementToPoint(currentPlacement), map.getMaxZoom());


    useEffect(() => {
        if (autoCenter && position !== null)
            map.setView(position, map.getZoom());
    }, [currentPlacement, autoCenter])

    return position === null ? null : (
        <Marker position={position} />
    )
}