/**
 * Per-city planning and retail geography.
 *
 * This is the data that makes Sigma's city pages genuinely different from the
 * sibling sites rather than reworded. Those sites lead with service prose; this
 * one leads with the thing that actually governs a shopfront job — who grants
 * planning and advertisement consent, whether the retail core is a conservation
 * area, and which streets the work happens on.
 *
 * Every value here is a verifiable fact. Nothing in this file may be invented.
 * `repairRadius` reflects the real operating model: repairs run within 100 road
 * miles of Birmingham with a two-hour reply to emergency calls; installations are
 * UK-wide.
 */

export type RepairRadius = 'local' | 'regional' | 'install-only';

export interface CityPlanning {
  /** The local planning authority that determines shopfront and advert consent. */
  authority: string;
  /** Conservation / listed-building context for the main retail core, where it applies. */
  conservation?: string;
  /** Principal retail streets and centres. */
  retailStreets: string[];
  /**
   * local        — within 100 road miles of Birmingham. Repairs covered, two-hour
   *                 reply to emergency calls. Includes every town in between.
   * regional     — reserved; not currently used
   * install-only — beyond the repair radius. Installation and project work only.
   */
  repairRadius: RepairRadius;
}

export const cityPlanning: Record<string, CityPlanning> = {
  birmingham: { authority: 'Birmingham City Council', conservation: 'The Jewellery Quarter and parts of Colmore Row are conservation areas; shopfront alterations there are assessed against the council’s shopfront design guidance.', retailStreets: ['New Street', 'High Street', 'Corporation Street', 'Bullring', 'Grand Central'], repairRadius: 'local' },
  wolverhampton: { authority: 'City of Wolverhampton Council', conservation: 'Much of the city centre core falls within conservation area designations.', retailStreets: ['Dudley Street', 'Victoria Street', 'Mander Centre', 'Wulfrun Centre'], repairRadius: 'local' },
  coventry: { authority: 'Coventry City Council', conservation: 'Spon Street and the cathedral quarter carry heritage constraints.', retailStreets: ['Broadgate', 'Smithford Way', 'Lower Precinct', 'Cathedral Lanes'], repairRadius: 'local' },
  'stoke-on-trent': { authority: 'Stoke-on-Trent City Council', retailStreets: ['Piccadilly', 'Trinity Street', 'The Potteries Centre'], repairRadius: 'local' },
  derby: { authority: 'Derby City Council', conservation: 'The Cathedral Quarter is a conservation area.', retailStreets: ['St Peter’s Street', 'Sadler Gate', 'Derbion'], repairRadius: 'local' },
  leicester: { authority: 'Leicester City Council', conservation: 'The Old Town and New Walk areas are conservation areas.', retailStreets: ['Granby Street', 'Gallowtree Gate', 'Highcross'], repairRadius: 'local' },

  nottingham: { authority: 'Nottingham City Council', conservation: 'The Lace Market is a conservation area with a high density of listed buildings.', retailStreets: ['Clumber Street', 'Bridlesmith Gate', 'Victoria Centre'], repairRadius: 'local' },
  gloucester: { authority: 'Gloucester City Council', conservation: 'The Historic Docks and Westgate Street carry conservation status.', retailStreets: ['Westgate Street', 'Southgate Street', 'Gloucester Quays'], repairRadius: 'local' },
  chester: { authority: 'Cheshire West and Chester Council', conservation: 'The Rows and the walled city are among the most tightly controlled retail environments in England.', retailStreets: ['Eastgate Street', 'Watergate Street', 'Bridge Street'], repairRadius: 'local' },
  manchester: { authority: 'Manchester City Council', conservation: 'Parts of the Northern Quarter and St Ann’s Square are conservation areas.', retailStreets: ['Market Street', 'King Street', 'Deansgate', 'Arndale'], repairRadius: 'local' },
  sheffield: { authority: 'Sheffield City Council', retailStreets: ['Fargate', 'The Moor', 'Meadowhall'], repairRadius: 'local' },
  'milton-keynes': { authority: 'Milton Keynes City Council', retailStreets: ['Midsummer Place', 'Centre:MK', 'Silbury Boulevard'], repairRadius: 'local' },
  northampton: { authority: 'West Northamptonshire Council', conservation: 'The Market Square and Derngate area are conservation areas.', retailStreets: ['Abington Street', 'Market Square', 'Grosvenor Centre'], repairRadius: 'local' },
  peterborough: { authority: 'Peterborough City Council', retailStreets: ['Bridge Street', 'Queensgate', 'Cathedral Square'], repairRadius: 'local' },
  oxford: { authority: 'Oxford City Council', conservation: 'The central conservation area covers almost the whole retail core; advertisement consent is tightly controlled.', retailStreets: ['Cornmarket Street', 'High Street', 'Westgate Oxford'], repairRadius: 'local' },
  luton: { authority: 'Luton Borough Council', retailStreets: ['George Street', 'The Mall Luton'], repairRadius: 'local' },

  london: { authority: 'The relevant London borough — all 32 boroughs and the City of London determine their own shopfront and advertisement consent, and their guidance differs substantially.', conservation: 'London has more conservation areas than any other UK city; assume heritage constraints until the borough confirms otherwise.', retailStreets: ['Oxford Street', 'Regent Street', 'Kensington High Street', 'Brixton Road', 'Camden High Street'], repairRadius: 'install-only' },
  leeds: { authority: 'Leeds City Council', conservation: 'The Victorian arcades and Briggate carry listed status.', retailStreets: ['Briggate', 'Commercial Street', 'Trinity Leeds', 'Victoria Quarter'], repairRadius: 'install-only' },
  liverpool: { authority: 'Liverpool City Council', conservation: 'Parts of the waterfront and Castle Street are within conservation areas.', retailStreets: ['Church Street', 'Bold Street', 'Liverpool ONE'], repairRadius: 'local' },
  bristol: { authority: 'Bristol City Council', conservation: 'Park Street, Christmas Steps and Old City are conservation areas.', retailStreets: ['Broadmead', 'Park Street', 'Cabot Circus', 'Gloucester Road'], repairRadius: 'local' },
  newcastle: { authority: 'Newcastle City Council', conservation: 'Grainger Town is a conservation area with extensive listed frontages.', retailStreets: ['Northumberland Street', 'Grainger Street', 'Eldon Square'], repairRadius: 'install-only' },
  bradford: { authority: 'City of Bradford Metropolitan District Council', retailStreets: ['Darley Street', 'Broadway Bradford', 'Kirkgate'], repairRadius: 'install-only' },
  york: { authority: 'City of York Council', conservation: 'The walled city is a conservation area and The Shambles is among the most constrained retail streets in the country.', retailStreets: ['Coney Street', 'Parliament Street', 'The Shambles', 'Stonegate'], repairRadius: 'install-only' },
  middlesbrough: { authority: 'Middlesbrough Council', retailStreets: ['Linthorpe Road', 'Captain Cook Square', 'Hill Street Centre'], repairRadius: 'install-only' },
  cambridge: { authority: 'Cambridge City Council', conservation: 'The historic core is a conservation area; college-owned frontages carry additional constraints.', retailStreets: ['Sidney Street', 'Petty Cury', 'Grand Arcade'], repairRadius: 'local' },
  norwich: { authority: 'Norwich City Council', conservation: 'Elm Hill and the Norwich Lanes are conservation areas.', retailStreets: ['Gentleman’s Walk', 'London Street', 'Chapelfield'], repairRadius: 'install-only' },
  southampton: { authority: 'Southampton City Council', retailStreets: ['Above Bar Street', 'WestQuay', 'Oxford Street'], repairRadius: 'install-only' },
  portsmouth: { authority: 'Portsmouth City Council', conservation: 'Old Portsmouth and parts of Southsea are conservation areas.', retailStreets: ['Commercial Road', 'Gunwharf Quays', 'Palmerston Road'], repairRadius: 'install-only' },
  brighton: { authority: 'Brighton & Hove City Council', conservation: 'The Lanes and North Laine are conservation areas with specific shopfront guidance.', retailStreets: ['Western Road', 'North Street', 'The Lanes', 'North Laine'], repairRadius: 'install-only' },
  reading: { authority: 'Reading Borough Council', retailStreets: ['Broad Street', 'The Oracle', 'Friar Street'], repairRadius: 'install-only' },
  swindon: { authority: 'Swindon Borough Council', retailStreets: ['Regent Street', 'Brunel Shopping Centre'], repairRadius: 'local' },
  bath: { authority: 'Bath & North East Somerset Council', conservation: 'Bath is a UNESCO World Heritage Site; shopfront and advertisement consent is among the most tightly controlled in the UK.', retailStreets: ['Milsom Street', 'Stall Street', 'SouthGate Bath'], repairRadius: 'local' },
  bournemouth: { authority: 'BCP Council', retailStreets: ['Commercial Road', 'Old Christchurch Road', 'The Square'], repairRadius: 'install-only' },
  plymouth: { authority: 'Plymouth City Council', conservation: 'The Barbican is a conservation area with extensive listed frontages.', retailStreets: ['New George Street', 'Cornwall Street', 'Drake Circus'], repairRadius: 'install-only' },
  exeter: { authority: 'Exeter City Council', conservation: 'The Cathedral Close and Gandy Street are conservation areas.', retailStreets: ['High Street', 'Princesshay', 'Gandy Street'], repairRadius: 'install-only' },
  cardiff: { authority: 'Cardiff Council', conservation: 'The Victorian and Edwardian arcades are listed and tightly controlled.', retailStreets: ['Queen Street', 'St Mary Street', 'The Hayes', 'Castle Arcade'], repairRadius: 'install-only' },
  swansea: { authority: 'Swansea Council', retailStreets: ['Oxford Street', 'Union Street', 'Quadrant Centre'], repairRadius: 'install-only' },
  glasgow: { authority: 'Glasgow City Council', conservation: 'The Merchant City and parts of Buchanan Street are conservation areas. Scottish planning legislation differs from England and Wales.', retailStreets: ['Buchanan Street', 'Sauchiehall Street', 'Argyle Street'], repairRadius: 'install-only' },
  edinburgh: { authority: 'City of Edinburgh Council', conservation: 'The Old and New Towns are a UNESCO World Heritage Site. Scottish planning legislation applies and consent is tightly controlled.', retailStreets: ['Princes Street', 'George Street', 'Rose Street', 'Victoria Street'], repairRadius: 'install-only' },
  aberdeen: { authority: 'Aberdeen City Council', conservation: 'Union Street is a conservation area; Scottish planning legislation applies.', retailStreets: ['Union Street', 'Bon Accord Centre', 'Trinity Centre'], repairRadius: 'install-only' },
  belfast: { authority: 'Belfast City Council', conservation: 'Northern Ireland operates a separate planning system; advertisement consent is determined under NI legislation.', retailStreets: ['Donegall Place', 'Royal Avenue', 'Victoria Square'], repairRadius: 'install-only' },
};

/** Plain-English description of what the radius band means for a customer. */
export const radiusCopy: Record<RepairRadius, string> = {
  local:
    'Inside our 100-mile repair radius from Birmingham. We reply to emergency repair calls within two hours, and we cover every town in between — not just the cities.',
  regional:
    'Reachable for planned repair visits. We will book these in rather than promise same-day attendance, and we will tell you honestly when we can be there.',
  'install-only':
    'Installation and project work. We survey, fabricate and fit here. For a genuine out-of-hours emergency this far from Birmingham, a local contractor will reach you faster and we would rather say so than take the call and let you down.',
};
