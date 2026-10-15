/**
 * The fixed choices on the enquiry form. The API accepts only these keys, so a
 * lead's `serviceType` can be counted without cleaning free text, and nothing
 * personal ever goes into a measurement event.
 */
export const SERVICE_TYPES = {
  'shopfront-repair': 'Repair: shop front, door or glass',
  'shutter-repair': 'Repair: roller shutter',
  'new-shopfront': 'New shop front or door',
  'new-shutter': 'New roller shutter',
  'garage-repair': 'Repair: garage door',
  'garage-install': 'New garage door',
  other: 'Something else',
} as const;
export type ServiceType = keyof typeof SERVICE_TYPES;

const GARAGE: ServiceType[] = ['garage-repair', 'garage-install'];

/**
 * What the form offers. Garage choices only once those pages are live; the
 * server page passes `garageLive` down, because the draft switch is a
 * server-only variable.
 */
export function offeredServiceTypes(garage: boolean): ServiceType[] {
  return (Object.keys(SERVICE_TYPES) as ServiceType[]).filter((k) => garage || !GARAGE.includes(k));
}

export const DOOR_TYPES = {
  roller: 'Roller',
  sectional: 'Sectional (panels that go up under the ceiling)',
  'up-and-over': 'Up-and-over (one panel)',
  'side-hinged': 'Side-hinged (opens like two doors)',
  'not-sure': 'Not sure',
} as const;
export type DoorTypeKey = keyof typeof DOOR_TYPES;

export const TIMINGS = {
  urgent: 'As soon as possible',
  weeks: 'In the next few weeks',
  prices: 'Just getting prices for now',
} as const;
export type Timing = keyof typeof TIMINGS;

export function pick<T extends Record<string, string>>(table: T, raw: string): keyof T | undefined {
  return Object.prototype.hasOwnProperty.call(table, raw) ? (raw as keyof T) : undefined;
}

/** A site path only: no query string, so nothing a visitor typed can ride along. */
export function cleanPath(raw: string): string | undefined {
  return /^\/[a-z0-9\-/]{0,150}$/.test(raw) ? raw : undefined;
}
