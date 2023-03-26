import { LatLng } from "leaflet";
import { DPlacement } from "./types";

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
 * Function converts time delta (in minutes) into "HH:MM" string.
 */
export function timedelatStr(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

/**
 * Tranlates DPlacement from telemetry into LatLng.
 */
export function dPlacementToLatLng(dPlacement: DPlacement): LatLng {
    return new LatLng(dPlacement.x, dPlacement.y);
}