import { useMap, Circle } from 'react-leaflet'

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

    return position === null ? null : (
        <Circle center={position} radius={2500} />
    )
}