/**
 * Towns inside the 100-mile repair radius from Birmingham.
 *
 * These exist because the repair business is real and local, and a town page
 * is only worth having if it says something true about that town. Every
 * council name, retail street and conservation note here is verifiable.
 * Nothing in this file may be invented — if a fact is not known, leave it out
 * rather than filling the gap.
 *
 * Deliberately a separate namespace from /areas/{city}. The city pages are
 * national installation coverage; these are the places we actually turn up to
 * when something has failed. Different promise, different URL.
 */

export interface Town {
  slug: string;
  name: string;
  /** Local planning authority — determines shopfront and advertisement consent. */
  council: string;
  county: string;
  /** Approximate road miles from Birmingham. */
  miles: number;
  /** Principal retail streets, parades or centres. */
  retail: string[];
  /** Conservation / heritage context where it genuinely applies. */
  conservation?: string;
  /** What is distinctive about working here. One paragraph, specific, no filler. */
  note: string;
  /** Neighbouring towns in this list, for internal linking. */
  near: string[];
}

export const towns: Town[] = [
  {
    slug: 'oldbury', name: 'Oldbury', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 6,
    retail: ['Halesowen Street', 'Birmingham Street', 'Savacentre'],
    note: 'Our own base. Oldbury is a working Black Country town — a mix of older retail parades along Halesowen Street and a heavy concentration of trade counters and light industrial units towards the M5 junction. A large share of what we fit here is not retail at all: roller shutters and personnel doors on units where the opening is wide, the duty cycle is high and appearance is beside the point. Being local means a failed shutter here is a short drive rather than a scheduling exercise.',
    near: ['smethwick', 'rowley-regis', 'west-bromwich', 'halesowen'],
  },
  {
    slug: 'dudley', name: 'Dudley', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 10,
    retail: ['High Street', 'Market Place', 'Churchill Shopping Centre'],
    conservation: 'Dudley town centre carries a conservation area covering the Market Place and parts of High Street, where original shopfront detail is expected to be retained rather than concealed.',
    note: 'Dudley’s retail core sits on a steep hill, which matters more than it sounds — thresholds, level access and door swings all have to be worked out on site rather than assumed from a drawing. The Market Place frontages are mostly older stock with surviving pilasters and stallrisers, and they are worth keeping — they are what make an older front read as a shopfront. Out towards Castle Gate and the trading estates the work is modern openings and shutters.',
    near: ['brierley-hill', 'tipton', 'halesowen', 'stourbridge'],
  },
  {
    slug: 'walsall', name: 'Walsall', council: 'Walsall Council',
    county: 'West Midlands', miles: 10,
    retail: ['Park Street', 'Digbeth Arcade', 'Saddlers Centre', 'The Bridge'],
    conservation: 'Parts of the town centre including Church Hill and the area around St Matthew’s carry conservation designation.',
    note: 'Walsall has a long leather-trade history and the older frontages around Digbeth Arcade and Park Street reflect it — narrow units, deep plans, and a lot of first-floor signage competing with the ground floor. The practical constraint here is usually access: Park Street is pedestrianised, so deliveries and installation plant have to be scheduled around the restricted-hours window rather than turning up with a van.',
    near: ['willenhall', 'west-bromwich', 'wednesbury'],
  },
  {
    slug: 'west-bromwich', name: 'West Bromwich', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 7,
    retail: ['High Street', 'Queens Square', 'New Square'],
    note: 'West Bromwich High Street is one of the longest in the region and the unit stock varies enormously along it — Victorian frontages at one end, post-war rebuilds in the middle, and modern retail at New Square. That spread means there is no standard West Bromwich specification; the survey matters more here than in a town with uniform stock. Security shutters are a frequent ask on the High Street, and our advice is an open-lattice design that is unobtrusive by day, because solid shutters are the type councils most often resist.',
    near: ['oldbury', 'wednesbury', 'smethwick', 'tipton'],
  },
  {
    slug: 'smethwick', name: 'Smethwick', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 4,
    retail: ['High Street', 'Cape Hill', 'Bearwood Road'],
    note: 'Bearwood Road is one of the busiest independent retail parades in Sandwell — a dense run of food, pharmacy, barbers and takeaways where units change hands often and a frontage gets replaced because the business changed, not because it failed. That means short programmes and tight budgets, and it means we are often working next door to a unit that is still trading. Dust screening and out-of-hours glazing are routine here rather than exceptional.',
    near: ['oldbury', 'west-bromwich', 'rowley-regis'],
  },
  {
    slug: 'halesowen', name: 'Halesowen', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 9,
    retail: ['Cornbow Shopping Centre', 'Great Cornbow', 'Hagley Street'],
    note: 'Halesowen town centre is compact and largely enclosed, which changes the job. A lot of the retail is inside the Cornbow Shopping Centre rather than on open street, so the specification is driven by the centre management’s shopfitting guide — permitted materials, fascia zones, permitted working hours — before the council sees anything. We ask for that document first; it usually answers half the questions a survey would otherwise raise.',
    near: ['dudley', 'stourbridge', 'oldbury', 'cradley-heath'],
  },
  {
    slug: 'stourbridge', name: 'Stourbridge', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 13,
    retail: ['High Street', 'Ryemarket', 'Market Street'],
    conservation: 'Stourbridge town centre includes a conservation area, and the glass-making heritage of the wider area means some frontages carry historic interest beyond their listing status.',
    note: 'Stourbridge has a better-preserved high street than most of the Black Country. Original timber shopfronts survive in places, and where they do, replacing them in aluminium is usually the wrong answer — ask Dudley’s planners before assuming it will be accepted. We have done enough of these to say early whether a scheme is likely to be approved rather than letting a client discover it at validation.',
    near: ['halesowen', 'dudley', 'kidderminster', 'brierley-hill'],
  },
  {
    slug: 'brierley-hill', name: 'Brierley Hill', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 12,
    retail: ['Merry Hill Centre', 'High Street'],
    note: 'Brierley Hill is dominated by Merry Hill, and work inside the centre runs entirely to the landlord’s shopfitting guide and out-of-hours access rules — night working, lift bookings, protected routes. The older High Street outside is a different job altogether: smaller independent units, open street, and ordinary planning. Worth being clear which one you are asking about when you call, because the programmes are nothing alike.',
    near: ['dudley', 'stourbridge', 'cradley-heath'],
  },
  {
    slug: 'tipton', name: 'Tipton', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 8,
    retail: ['Owen Street', 'Tipton Shopping Centre', 'Great Bridge'],
    note: 'Tipton is canal-and-industry country and the commercial frontages reflect it — more trade counters, MOT centres and food units than conventional retail. Great Bridge has a busier parade than Owen Street. Most of what we fit here is security-led: roller shutters, grilles and reinforced doorsets on units that are empty overnight in areas where that matters.',
    near: ['oldbury', 'west-bromwich', 'dudley', 'wednesbury'],
  },
  {
    slug: 'wednesbury', name: 'Wednesbury', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 8,
    retail: ['Union Street', 'Market Place', 'Wednesbury Shopping Precinct'],
    conservation: 'The Market Place and Church Hill area carry conservation designation.',
    note: 'Wednesbury’s Market Place retains a reasonable amount of original frontage detail and the conservation designation around Church Hill means alterations there get looked at properly. The retail parade on Union Street is more ordinary and more forgiving. The Midland Metro runs through, which occasionally affects access and delivery timing on Union Street more than people expect.',
    near: ['west-bromwich', 'walsall', 'tipton'],
  },
  {
    slug: 'rowley-regis', name: 'Rowley Regis', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 7,
    retail: ['Blackheath High Street', 'Halesowen Street'],
    note: 'Most commercial activity here is on Blackheath High Street rather than Rowley Regis proper — a working parade of independents where a shopfront replacement is usually triggered by a change of tenant. Budgets are tight and programmes are short, so we quote these honestly rather than optimistically: a frontage that needs structural work to the opening is a different job from one that needs a new frame in the existing aperture, and it is worth knowing which before you commit.',
    near: ['oldbury', 'cradley-heath', 'smethwick', 'halesowen'],
  },
  {
    slug: 'cradley-heath', name: 'Cradley Heath', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 9,
    retail: ['High Street', 'Cradley Heath Shopping Centre'],
    note: 'A compact centre with a high proportion of independent food and service businesses. Chain-making heritage means some older industrial frontages survive around the edges. The practical point here is parking and loading — the High Street is narrow and timed restrictions apply, so glazing deliveries get scheduled rather than assumed.',
    near: ['rowley-regis', 'halesowen', 'brierley-hill', 'oldbury'],
  },
  {
    slug: 'willenhall', name: 'Willenhall', council: 'Walsall Council',
    county: 'West Midlands', miles: 12,
    retail: ['Market Place', 'Stafford Street', 'New Road'],
    conservation: 'The Market Place is a conservation area.',
    note: 'Willenhall was the centre of the British lock industry and still has a cluster of security-related manufacturing. The Market Place conservation area is small but genuinely enforced. Given the local trade, clients here tend to know more than most about what a lock and a shutter should actually be rated to, which we find makes for better specifications rather than worse.',
    near: ['walsall', 'bilston', 'wednesbury'],
  },
  {
    slug: 'bilston', name: 'Bilston', council: 'City of Wolverhampton Council',
    county: 'West Midlands', miles: 13,
    retail: ['Church Street', 'High Street', 'Bilston Market'],
    conservation: 'Parts of Church Street and the area around the town hall are within a conservation area.',
    note: 'Bilston has one of the longest-running outdoor markets in the region and the retail around it is correspondingly traditional — small units, direct-to-street, heavy footfall on market days. Work gets scheduled around those days rather than through them. The Church Street conservation area means fascia proportions and materials are looked at, and painted timber is still a realistic specification here rather than an obstacle.',
    near: ['willenhall', 'wednesbury', 'tipton'],
  },
  {
    slug: 'solihull', name: 'Solihull', council: 'Solihull Metropolitan Borough Council',
    county: 'West Midlands', miles: 10,
    retail: ['High Street', 'Mell Square', 'Touchwood'],
    conservation: 'Solihull High Street is a conservation area with surviving timber-framed buildings; it is among the more tightly controlled frontages in the region.',
    note: 'Solihull is the opposite end of the market from most of the Black Country work. The High Street conservation area includes genuinely old building stock so raise materials, proportion and signage with the council early. Touchwood is landlord-governed and runs to its own fit-out standards. Both are jobs where turning up with a standard aluminium shopfront specification is the wrong starting point.',
    near: ['sutton-coldfield'],
  },
  {
    slug: 'sutton-coldfield', name: 'Sutton Coldfield', council: 'Birmingham City Council',
    county: 'West Midlands', miles: 8,
    retail: ['The Parade', 'Mere Green', 'Gracechurch Centre', 'Boldmere'],
    note: 'Sutton has several distinct retail centres rather than one. The Parade and Gracechurch are conventional town-centre retail; Mere Green and Boldmere are affluent independent parades where a frontage is a marketing decision as much as a practical one — more frameless glass, more considered signage, more willingness to spend on finish. Planning sits with Birmingham City Council rather than a Sutton authority, which occasionally surprises people.',
    near: ['solihull', 'tamworth'],
  },
  {
    slug: 'cannock', name: 'Cannock', council: 'Cannock Chase District Council',
    county: 'Staffordshire', miles: 20,
    retail: ['Market Place', 'Cannock Shopping Centre', 'McArthurGlen Designer Outlet'],
    note: 'Cannock splits between a conventional town centre and the designer outlet at Mill Green, which operates to its own fit-out standards and night-working rules. The town-centre stock is mostly modest post-war retail with straightforward openings — these are usually quick, predictable jobs, which is worth saying because not every town is.',
    near: ['walsall', 'lichfield', 'stafford'],
  },
  {
    slug: 'lichfield', name: 'Lichfield', council: 'Lichfield District Council',
    county: 'Staffordshire', miles: 20,
    retail: ['Market Street', 'Bore Street', 'Three Spires Shopping Centre'],
    conservation: 'Lichfield city centre is a conservation area with a high concentration of listed buildings around the Cathedral Close, Bore Street and Market Street.',
    note: 'Lichfield is the most heritage-constrained town in our local radius. Listed frontages on Bore Street and around the Cathedral Close mean listed building consent as well as planning. Lichfield District Council also runs a heritage shopfront grant scheme for the city centre conservation area — it was open to expressions of interest when we checked in October 2026. We will tell you before you commission drawings whether what you have in mind is realistic here.',
    near: ['tamworth', 'cannock', 'sutton-coldfield', 'burton-upon-trent'],
  },
  {
    slug: 'tamworth', name: 'Tamworth', council: 'Tamworth Borough Council',
    county: 'Staffordshire', miles: 16,
    retail: ['George Street', 'Church Street', 'Ankerside Shopping Centre'],
    conservation: 'The area around the castle, Church Street and Lady Bank carries conservation designation.',
    note: 'Tamworth’s retail is concentrated between Ankerside and the George Street parade, with the older and more constrained frontages up towards the castle. The practical distinction is sharp: Ankerside work runs to centre management rules, George Street runs to ordinary planning, and the conservation area adds a layer again. Tell us which part of town the unit is in and the answer on timescale changes immediately.',
    near: ['lichfield', 'sutton-coldfield', 'nuneaton', 'burton-upon-trent'],
  },
  {
    slug: 'nuneaton', name: 'Nuneaton', council: 'Nuneaton and Bedworth Borough Council',
    county: 'Warwickshire', miles: 22,
    retail: ['Abbey Street', 'Queens Road', 'Ropewalk Shopping Centre'],
    note: 'Nuneaton town centre has seen sustained vacancy and equally sustained regeneration effort, which in practice means a lot of unit churn — frontages replaced because a new tenant is taking a space that has sat empty. Those are jobs where the existing opening is an unknown until it is opened up, and we price them with that stated rather than discovered later.',
    near: ['tamworth', 'rugby'],
  },
  {
    slug: 'redditch', name: 'Redditch', council: 'Redditch Borough Council',
    county: 'Worcestershire', miles: 15,
    retail: ['Kingfisher Shopping Centre', 'Evesham Street', 'Church Green'],
    note: 'Redditch is a new town and it behaves like one — most retail sits inside the Kingfisher Centre rather than on open street, so the governing document is the centre’s fit-out guide and the work happens at night. The needle-making heritage survives mainly in the industrial estates, where shutter and security door work is steadier than the retail.',
    near: ['bromsgrove', 'solihull', 'worcester'],
  },
  {
    slug: 'bromsgrove', name: 'Bromsgrove', council: 'Bromsgrove District Council',
    county: 'Worcestershire', miles: 14,
    retail: ['High Street', 'Worcester Road'],
    conservation: 'Bromsgrove High Street is a conservation area.',
    note: 'A compact, largely independent high street with a conservation designation that is actively applied. Units are small and the frontages are mostly direct-to-street with limited setback, so working space is the practical constraint — scaffold licences and glazing access have to be sorted — often with the neighbours too — before the programme is fixed.',
    near: ['redditch', 'kidderminster', 'halesowen', 'worcester'],
  },
  {
    slug: 'kidderminster', name: 'Kidderminster', council: 'Wyre Forest District Council',
    county: 'Worcestershire', miles: 18,
    retail: ['Vicar Street', 'Worcester Street', 'Weavers Wharf'],
    note: 'Kidderminster’s carpet-industry buildings give parts of the town unusually large ground-floor openings, which is an advantage for a glazed frontage and a complication for a shutter — wide openings need the right lintel and the right tube, and a standard retail shutter is often undersized. Weavers Wharf is modern retail park stock with none of those issues.',
    near: ['stourbridge', 'bromsgrove', 'worcester'],
  },
  {
    slug: 'worcester', name: 'Worcester', council: 'Worcester City Council',
    county: 'Worcestershire', miles: 28,
    retail: ['High Street', 'Friar Street', 'CrownGate', 'The Shambles'],
    conservation: 'The city centre is a conservation area and Friar Street and New Street carry a dense concentration of listed timber-framed buildings.',
    note: 'Friar Street is one of the best-preserved medieval streets in the region, and much of the shopfront work there involves listed buildings, so listed building consent is usually part of the job. The modern retail at CrownGate is entirely different. Worcester is worth a conversation before drawings: the gap between what is achievable on the High Street and what is achievable on Friar Street is larger than in most cities.',
    near: ['kidderminster', 'bromsgrove', 'redditch'],
  },
  {
    slug: 'telford', name: 'Telford', council: 'Telford and Wrekin Council',
    county: 'Shropshire', miles: 32,
    retail: ['Telford Shopping Centre', 'Ironmasters Way', 'Wellington High Street'],
    note: 'Telford is a new town built around a covered centre, so most retail work runs to centre management rules and night access. Wellington and Oakengates have conventional older high streets and behave completely differently. The industrial estates are a steady source of shutter and personnel door work — larger openings, higher duty cycles, specification led by use rather than appearance.',
    near: ['stafford'],
  },
  {
    slug: 'stafford', name: 'Stafford', council: 'Stafford Borough Council',
    county: 'Staffordshire', miles: 28,
    retail: ['Greengate Street', 'Gaolgate Street', 'Guildhall Shopping Centre'],
    conservation: 'Stafford town centre is a conservation area; Greengate Street includes the timber-framed Ancient High House.',
    note: 'Stafford’s historic core is tighter than its size suggests — Greengate Street and Gaolgate Street carry genuine heritage constraint. Outside the centre the retail parks and trade units are ordinary modern work. The split is clean, and which side of it a unit falls on determines almost everything about the programme.',
    near: ['cannock', 'telford'],
  },
  {
    slug: 'rugby', name: 'Rugby', council: 'Rugby Borough Council',
    county: 'Warwickshire', miles: 32,
    retail: ['High Street', 'Sheep Street', 'Clock Towers Shopping Centre'],
    conservation: 'The town centre around Church Street and Market Place is a conservation area.',
    note: 'Rugby has a compact, largely independent centre with a conservation area covering the oldest part. The surrounding logistics and distribution sector generates a steady stream of non-retail work — industrial shutters, loading bay doors and security grilles on units where the specification is about cycle count and resistance rather than appearance.',
    near: ['nuneaton', 'leamington-spa'],
  },
  {
    slug: 'leamington-spa', name: 'Leamington Spa', council: 'Warwick District Council',
    county: 'Warwickshire', miles: 26,
    retail: ['The Parade', 'Regent Street', 'Royal Priors'],
    conservation: 'Almost the whole of central Leamington is a conservation area, with Regency terraces on The Parade and Regent Street carrying listed status.',
    note: 'Leamington is one of the most design-sensitive towns in our radius. Many of the Regency frontages on The Parade are listed. Plan for a fascia, lettering and lighting designed for the building rather than a standard illuminated box, and read Warwick District Council’s guidance before the design is fixed.',
    near: ['warwick', 'rugby', 'stratford-upon-avon'],
  },
  {
    slug: 'warwick', name: 'Warwick', council: 'Warwick District Council',
    county: 'Warwickshire', miles: 24,
    retail: ['Swan Street', 'Jury Street', 'Market Place'],
    conservation: 'Warwick town centre is a conservation area with extensive listed building coverage following the 1694 fire rebuild.',
    note: 'Warwick’s centre was largely rebuilt after the 1694 fire and the resulting uniformity is exactly what the conservation designation protects. Many frontages are listed, so listed building consent is a common part of the job here. These are slower jobs with longer lead-ins, and we would rather set that expectation at the first conversation than at validation.',
    near: ['leamington-spa', 'stratford-upon-avon'],
  },
  {
    slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon', council: 'Stratford-on-Avon District Council',
    county: 'Warwickshire', miles: 25,
    retail: ['Bridge Street', 'Henley Street', 'High Street', 'Bell Court'],
    conservation: 'The town centre is a conservation area with a very high concentration of listed and timber-framed buildings, particularly on Henley Street and High Street.',
    note: 'Stratford is a heritage retail environment with international footfall. Many of the timber-framed frontages on Henley Street are listed, and alterations to those need listed building consent. Expect signage and lighting to be looked at closely. This is specialist work and we price it as such rather than quoting a standard rate and discovering the constraints later.',
    near: ['warwick', 'leamington-spa', 'redditch'],
  },
  {
    slug: 'burton-upon-trent', name: 'Burton upon Trent', council: 'East Staffordshire Borough Council',
    county: 'Staffordshire', miles: 28,
    retail: ['High Street', 'Station Street', 'Coopers Square'],
    note: 'Burton’s brewing industry still shapes the commercial stock — large industrial frontages and loading openings alongside a conventional town-centre retail core. Coopers Square is landlord-governed; the High Street and Station Street are ordinary planning. The brewery-related units are where the interesting shutter work is: wide openings, heavy use, and specifications that have to account for vehicle movement rather than footfall.',
    near: ['lichfield', 'tamworth'],
  },
];

/** Lookup by slug. */
export const townBySlug: Record<string, Town> = Object.fromEntries(
  towns.map((t) => [t.slug, t]),
);
