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