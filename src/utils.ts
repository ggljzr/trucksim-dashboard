import { Point } from "leaflet";
import { DPlacement, TileInfo } from "./types";

/**
 * Function for decoding MQTT message payloads.
 */
export function decodePayload<T>(payload: Buffer): T {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(payload)) as T;
}

/**
 * Function for recalculating minutes since the first game day into date object.
 * Minutes since the first game day are used in telemetry data. These minutes
 * can be converted into milliseconds and interpreted as a unix epoch.
 * 
 * Since unix epoch starts on thursday, but first game day is monday, this
 * function also adds 4 days to the epoch. This is to get the correct weekday,
 * we don't care about correct month or year.
 */
export function minutesToDate(minutes: number): Date {
    // unix epoch is thursday but the game starts on monday
    // so we need to offset the epoch by 4 days
    const epochOffset = 24 * 60 * 60 * 1000 * 4;
    return new Date(minutes * 60 * 1000 + epochOffset);
}

/**
 * Function for formatting date object to short string ("weekday HH:MM") based on locale string.
 * This function also forces UTC timezone, since game time does not use timezones.
 */
export function dateShortStr(date: Date): string {
    return date.toLocaleTimeString("en", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", weekday: "short" })
}

/**
 * Function converts time delta (in minutes) into "xxh yym" string.
 */
export function timeDeltaStr(minutes: number): string {
    const hours = (Math.floor(minutes / 60)).toFixed(0);
    const mins = (minutes % 60).toFixed(0);
    return `${hours.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m`;
}

/**
 * Converts DPlacement from game telemetry to Leaflet Point. This point can then be projected to LatLng.
 * 
 * TileMapInfo.json is required for conversion. It should come with the tiles (see tiles folder in 'public').
 * 
 * See https://github.com/dariowouters/ts-map/issues/16 for more info.
 */
export function dPlacementToLeafletPoint(xy: DPlacement, tileInfo: TileInfo): Point {
    const x1 = tileInfo.map.x1;
    const x2 = tileInfo.map.x2;
    const y1 = tileInfo.map.y1;
    const y2 = tileInfo.map.y2;

    // these values work, at least for ATS, but not sure why
    // they were found experimentally
    const maxX = 65536;
    const maxY = 65536;

    const xtot = x2 - x1; // Total X length
    const ytot = y2 - y1; // Total Y length

    const xrel = (xy.x - x1) / xtot; // The fraction where the X is (between 0 and 1, 0 being fully left, 1 being fully right)
    // Note that DPlacement uses Z for Y, and Y for Z, so Y is altitude.
    const yrel = (xy.z - y1) / ytot; // The fraction where the Y is

    return new Point(xrel * maxX, yrel * maxY);
}