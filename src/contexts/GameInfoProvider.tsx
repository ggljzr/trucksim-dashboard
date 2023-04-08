import React, { createContext, useContext, useState } from 'react';
import { Point } from 'leaflet';

import { GameInfo, DPlacement } from '../types';

import { AtsTileInfo, Ets2TileInfo } from '../tileinfo';
import { dPlacementToLeafletPoint } from '../utils';

interface IGameInfoContext {
    gameInfo: GameInfo | null,
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfo | null>>

    // context dependent functions

    /**
     * Function for converting DPlacement to Point for use with Leaflet.
     * This function uses appropriate tile info based on the game string.
     */
    dPlacementToPoint: (placement: DPlacement) => Point,
}

const GameInfoContext = createContext<IGameInfoContext | undefined>(undefined);

interface Props {
    children?: React.ReactNode;
}

/**
 * Context provider for game info e. g. game string ('ats' or 'eut2') or game version.
 */
export default function GameInfoProvider({ children }: Props) {
    const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);

    const dPlacementToPoint = (placement: DPlacement) => {
        if (gameInfo === null) {
            return new Point(0, 0);
        }

        if (gameInfo.game_id === 'ats')
            return dPlacementToLeafletPoint(placement, AtsTileInfo);
        if (gameInfo.game_id === 'eut2')
            return dPlacementToLeafletPoint(placement, Ets2TileInfo);

        return new Point(0, 0);
    }

    return (
        <GameInfoContext.Provider value={{ gameInfo, setGameInfo, dPlacementToPoint }}>
            {children}
        </GameInfoContext.Provider>
    );
}

export function useGameInfo() {
    const context = useContext(GameInfoContext);

    if (context === undefined) {
        throw new Error("useGameInfo must be used within GameInfoProvider context!");
    }

    return context;
}
