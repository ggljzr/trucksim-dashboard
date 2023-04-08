import { useEffect } from 'react';

import { useMap, Marker } from 'react-leaflet';

import { DPlacement } from '../../types';
import { useGameInfo } from '../../contexts/GameInfoProvider';

interface Props {
    currentPlacement: DPlacement | null,
    autoCenter?: boolean,
}

/**
 * Component for displaying player marker within the map. Has to be in MapContainer.
 */
export default function PlayerMarker({ currentPlacement, autoCenter }: Props) {
    const map = useMap();
    const gameInfo = useGameInfo();

    const position = (currentPlacement === null) ? null : map.unproject(gameInfo.dPlacementToPoint(currentPlacement), map.getMaxZoom());


    useEffect(() => {
        if (autoCenter && position !== null)
            map.setView(position, map.getZoom());
    }, [currentPlacement, autoCenter])

    return position === null ? null : (
        <Marker position={position} />
    )
}