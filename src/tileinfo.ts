import { TileInfo } from "./types"

/**
 * TileInfo for ATS copied from https://github.com/Unicor-p/SCS_Map_Tiles.
 */
export const AtsTileInfo: TileInfo = {
    "map": {
        "maxX": 131072,
        "maxY": 131072,
        "x1": -127721.344,
        "x2": 20049.6563,
        "y1": -72181.5,
        "y2": 75589.5,
        "tileSize": 512,
        "minZoom": 0,
        "maxZoom": 8
    },
    "game": {
        "id": "ats",
        "game": "ats",
        "name": "American Truck Simulator",
        "version": "1.46.2.4",
        "generatedAt": "2022-11-26T00:08:35.2174918-06:00"
    }
}

/**
 * TileInfo for ETS2 copied from https://github.com/Unicor-p/SCS_Map_Tiles.
 */
export const Ets2TileInfo: TileInfo = {
    "map": {
        "maxX": 131072,
        "maxY": 131072,
        "x1": -94621.8047,
        "x2": 79370.13,
        "y1": -80209.1641,
        "y2": 93782.77,
        "tileSize": 512,
        "minZoom": 0,
        "maxZoom": 8
    },
    "game": {
        "id": "ets2",
        "game": "ets2",
        "name": "Euro Truck Simulator 2",
        "version": "1.46.1.0",
        "generatedAt": "2022-11-26T00:42:44.178632-06:00"
    }
}