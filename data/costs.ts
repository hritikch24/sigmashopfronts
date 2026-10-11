/**
 * Typical supply-and-fit ranges, before survey. Carried over from the previous
 * site's cost guide and confirmed by the owner on 11 Oct 2026.
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
      { item: 'Double bay', range: '£4,000 – £8,000', note: 'Two glass sections with an upright bar between' },
      { item: 'Three bays or more', range: '£8,000 – £20,000+', note: 'Wide shopfronts and large glass' },
    ],
  },
  shutters: {
    title: 'Roller shutters',
    lines: [
      { item: 'Manual shutter', range: '£800 – £1,500', note: 'Pulled up and down by hand' },
      { item: 'Motorised shutter', range: '£1,200 – £2,500', note: 'Electric, with a key switch or remote' },
      { item: 'Fire-rated shutter', range: '£2,000 – £4,000', note: 'Tested to stop fire spreading (BS EN 16034)' },
      { item: 'LPS 1175-rated shutter', range: '£2,500 – £5,000', note: 'Tested and certified against break-ins' },
    ],
  },
  doors: {
    title: 'Security doors',
    lines: [
      { item: 'Standard steel door', range: '£800 – £1,500', note: 'Rust-proof steel, locks at several points' },
      { item: 'LPS 1175 SR2 door', range: '£1,500 – £3,000', note: 'Certified against break-ins, grade SR2' },
      { item: 'LPS 1175 SR3 door', range: '£2,500 – £5,000', note: 'Certified against break-ins, grade SR3 (stronger)' },
    ],
  },
  automatic: {
    title: 'Automatic doors',
    lines: [
      { item: 'Bi-parting sliding door', range: '£3,000 – £6,000', note: 'Opens by sensor, two doors slide apart' },
      { item: 'Motor added to an existing door', range: '£1,500 – £3,000', note: 'Makes a suitable door open by itself' },
    ],
  },
  folding: {
    title: 'Folding glazed doors',
    lines: [
      { item: 'Three panels', range: '£3,000 – £5,000', note: 'Opening up to about 3 m' },
      { item: 'Five panels', range: '£5,000 – £8,000', note: 'Opening up to about 5 m' },
      { item: 'Eight panels', range: '£8,000 – £14,000', note: 'Wide shop and restaurant fronts' },
    ],
  },
  fire: {
    title: 'Fire doors (single leaf)',
    lines: [
      { item: 'FD30', range: '£400 – £800', note: 'Holds back fire for 30 minutes' },
      { item: 'FD60', range: '£600 – £1,200', note: 'Holds back fire for 60 minutes' },
      { item: 'FD90', range: '£1,000 – £2,000', note: 'Holds back fire for 90 minutes' },
    ],
  },
};
