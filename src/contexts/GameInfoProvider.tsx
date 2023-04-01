import React, { createContext, useContext, useState, useEffect } from 'react';

import { GameInfo } from '../types';

interface IGameInfoContext {
    gameInfo: GameInfo | null,
    setGameInfo: React.Dispatch<React.SetStateAction<GameInfo | null>>
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

    return (
        <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
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
