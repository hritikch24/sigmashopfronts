/**
 * What the drafting assistant in the admin area may say about the business.
 * Every line here is either a fact from lib/business.ts or a technical point
 * that is true of the product. No guarantees, response times, savings figures
 * or "years in the trade" — the company was incorporated in October 2025, and
 * the only service promise is a two-hour REPLY to emergency repair calls.
 */
import { business } from './business';

export const serviceNotes: Record<string, string> = {
  'Aluminium Shopfronts': 'Powder-coated aluminium in any RAL colour. A new shopfront usually needs planning permission; we draw it to suit the council before quoting.',
  'Roller Shutters': 'Manual or motorised. Many councils restrict solid external shutters; internal and open-lattice designs are easier to get approved.',
  'Security Doors': 'Steel doorsets; LPS 1175-rated options where an insurer specifies a rating. Escape-route hardware where needed.',
  'Automatic Doors': 'Sliding and swing operators to BS EN 16005. Need regular servicing to stay safe.',
  'Bi-Fold Doors': 'Folding aluminium systems for cafés and restaurants. Usually need planning permission on a traditional frontage.',
  'Shopfront Repairs': `Repairs within ${business.repairRadiusMiles} road miles of ${business.repairCentre}: floor springs, closers, locks, dropped doors.`,
  'Shutter Repair': `Repairs within ${business.repairRadiusMiles} road miles of ${business.repairCentre}: motors, springs, laths, guides. ${business.emergencyPromise}`,
  'Glass Replacement': 'Toughened or laminated safety glass, made to size — so usually a make-safe visit then a fitting visit.',
  'Fire Doors': 'Certified FD30/FD60 doorsets fitted so the rating holds.',
  'Industrial Shutters': 'Steel or insulated roller doors for warehouses and loading bays, sized for the opening and wind load. Powered doors need safety edges and a manual release.',
  'uPVC Doors': 'Made-to-measure uPVC doors for houses, flats and the back of commercial premises. A door more than half glazed is building-regulations work.',
  'Composite Doors': 'Reinforced-core front doors for houses and flats. A flat door onto a shared stair must be a certified fire doorset, not a standard composite door.',
  'House Windows': 'Replacement uPVC or aluminium windows for homes and flats. Building-regulations work; planning is mainly an issue for flats, listed buildings and Article 4 areas.',
  'Emergency Callout': `${business.emergencyPromise} Attendance time is agreed when we reply and depends on distance.`,
};

export const draftingRules = `Facts you may use: ${business.name} (${business.legalName}, Companies House ${business.companyNumber}), based in Oldbury, West Midlands. Installs UK-wide; repairs within ${business.repairRadiusMiles} road miles of ${business.repairCentre}. ${business.emergencyPromise} Phone ${business.phones.main.display}.
Never state or imply: years of experience or trading history, guarantees or warranties, response or attendance times other than the two-hour reply, energy or insurance savings figures, statistics, awards, accreditations, named clients, or that we have worked in the customer's town before. If you do not know something, ask the customer instead of asserting it.`;
