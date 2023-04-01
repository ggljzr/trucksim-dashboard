import React, { createContext, useContext, useState, useEffect } from 'react';

interface IGameInfoContext {
    game: string | null,
    setGame: React.Dispatch<React.SetStateAction<string | null>>
}

const GameInfoContext = createContext<IGameInfoContext | undefined>(undefined);

interface Props {
    children?: React.ReactNode;
}

/**
 * Context provider for game info e. g. game string ('ats' or 'ets') or game version.
 */
export default function GameInfoProvider({ children }: Props) {
    const [game, setGame] = useState<string | null>(null);

    return (
        <GameInfoContext.Provider value={{ game, setGame }}>
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
