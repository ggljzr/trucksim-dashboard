/**
 * Function for decoding MQTT message payloads.
 */
export function decodePayload<T>(payload: Buffer): T {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(payload)) as T;
}

export function minutesToDate(minutes: number): Date {
    return new Date(minutes * 60 * 1000);
}

/**
 * Function for formatting date object to short string ("weekday HH:MM") based on locale string.
 * This function also forces UTC timezone, since game time does not use timezones.
 */
export function dateShortStr(date: Date): string {
    return date.toLocaleTimeString("en", { timeZone: 'UTC', hour: "2-digit", minute: "2-digit", weekday: "short" })
}