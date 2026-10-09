/**
 * Indicative supply-and-fit ranges.
 *
 * These are the ranges the business published on its previous site's cost
 * guide, carried over unchanged so nothing new is invented. They are listed in
 * `pendingFacts` (lib/business.ts) until the owner confirms them, and the page
 * says what they are: indicative, before survey.
 */
export interface CostLine {
  item: string;
  range: string;
  note: string;
}

export const costGroups: Record<string, { title: string; lines: CostLine[] }> = {
  shopfronts: {
    title: 'Aluminium shopfronts',
    lines: [
      { item: 'Single bay', range: '£2,000 – £5,000', note: 'Up to about 4 m wide, standard height' },
      { item: 'Double bay', range: '£4,000 – £8,000', note: 'Two bays divided by a mullion' },
      { item: 'Three bays or more', range: '£8,000 – £20,000+', note: 'Wide and large-format frontages' },
    ],
  },
  shutters: {
    title: 'Roller shutters',
    lines: [
      { item: 'Manual shutter', range: '£800 – £1,500', note: 'Spring-balanced or hand-operated' },
      { item: 'Motorised shutter', range: '£1,200 – £2,500', note: 'Tubular motor with key switch or remote' },
      { item: 'Fire-rated shutter', range: '£2,000 – £4,000', note: 'Tested to BS EN 16034' },
      { item: 'LPS 1175-rated shutter', range: '£2,500 – £5,000', note: 'Certified intruder resistance' },
    ],
  },
  doors: {
    title: 'Security doors',
    lines: [
      { item: 'Standard steel door', range: '£800 – £1,500', note: 'Galvanised steel with multi-point lock' },
      { item: 'LPS 1175 SR2 door', range: '£1,500 – £3,000', note: 'Certified to the SR2 grade' },
      { item: 'LPS 1175 SR3 door', range: '£2,500 – £5,000', note: 'Certified to the SR3 grade' },
    ],
  },
  automatic: {
    title: 'Automatic doors',
    lines: [
      { item: 'Bi-parting sliding door', range: '£3,000 – £6,000', note: 'Sensor-operated, two sliding leaves' },
      { item: 'Swing operator added', range: '£1,500 – £3,000', note: 'Operator fitted to a suitable existing door' },
    ],
  },
  folding: {
    title: 'Folding glazed doors',
    lines: [
      { item: 'Three panels', range: '£3,000 – £5,000', note: 'Opening up to about 3 m' },
      { item: 'Five panels', range: '£5,000 – £8,000', note: 'Opening up to about 5 m' },
      { item: 'Eight panels', range: '£8,000 – £14,000', note: 'Wide commercial frontages' },
    ],
  },
  fire: {
    title: 'Fire doors (single leaf)',
    lines: [
      { item: 'FD30', range: '£400 – £800', note: '30 minutes’ integrity' },
      { item: 'FD60', range: '£600 – £1,200', note: '60 minutes’ integrity' },
      { item: 'FD90', range: '£1,000 – £2,000', note: '90 minutes’ integrity' },
    ],
  },
};
