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
    note: 'This is our home town, so a call-out here is a short drive. Oldbury has older shops along Halesowen Street. Near the M5 there are many trade counters and small industrial units. A lot of our work here is not shops at all. It is roller shutters and doors on wide units that open and close all day. On those, strength matters more than looks.',
    near: ['smethwick', 'rowley-regis', 'west-bromwich', 'halesowen'],
  },
  {
    slug: 'dudley', name: 'Dudley', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 10,
    retail: ['High Street', 'Market Place', 'Churchill Shopping Centre'],
    conservation: 'Dudley town centre has a conservation area. It covers the Market Place and parts of the High Street. The council expects old shopfront details there to be kept, not covered up.',
    note: 'Dudley’s main shopping streets sit on a steep hill. That matters more than you might think. Door steps, level access and the way a door opens all have to be measured on site. Many Market Place shops still have their old side columns and the low panel under the window. They are worth keeping, because they make an old shop look right. Out towards Castle Gate and the trading estates, the work is modern openings and shutters.',
    near: ['brierley-hill', 'tipton', 'halesowen', 'stourbridge'],
  },
  {
    slug: 'walsall', name: 'Walsall', council: 'Walsall Council',
    county: 'West Midlands', miles: 10,
    retail: ['Park Street', 'Digbeth Arcade', 'Saddlers Centre', 'The Bridge'],
    conservation: 'Parts of the town centre are a conservation area. This includes Church Hill and the streets around St Matthew’s.',
    note: 'Walsall has a long history of leather making. You can see it in the older shops around Digbeth Arcade and Park Street. The units are narrow and deep, and many have signs upstairs as well as downstairs. The main problem here is access. Park Street is closed to traffic for part of the day, so we plan deliveries and fitting around the hours when vans are allowed in.',
    near: ['willenhall', 'west-bromwich', 'wednesbury'],
  },
  {
    slug: 'west-bromwich', name: 'West Bromwich', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 7,
    retail: ['High Street', 'Queens Square', 'New Square'],
    note: 'West Bromwich High Street is one of the longest in the area, and the buildings change a lot along it. There are Victorian shops at one end, post-war buildings in the middle and modern shops at New Square. So there is no standard job here, and the site visit matters a lot. Many High Street shops ask for security shutters. We usually suggest an open grille shutter. You can see through it in the day, and councils turn down solid shutters more than any other kind.',
    near: ['oldbury', 'wednesbury', 'smethwick', 'tipton'],
  },
  {
    slug: 'smethwick', name: 'Smethwick', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 4,
    retail: ['High Street', 'Cape Hill', 'Bearwood Road'],
    note: 'Bearwood Road is one of the busiest shopping streets in Sandwell. It is full of food shops, chemists, barbers and takeaways. Shops here change owner often. A new shopfront usually goes in because a new business is moving in, not because the old one broke. That means short timescales and tight budgets. We often work next to a shop that is still open, so we put up dust screens and fit glass outside opening hours.',
    near: ['oldbury', 'west-bromwich', 'rowley-regis'],
  },
  {
    slug: 'halesowen', name: 'Halesowen', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 9,
    retail: ['Cornbow Shopping Centre', 'Great Cornbow', 'Hagley Street'],
    note: 'Halesowen town centre is small, and much of it is indoors. Many shops are inside the Cornbow Shopping Centre, not on the open street. That changes the job. The centre has its own rules for shopfronts: which materials you can use, where signs go and when work can happen. These come before the council. We ask for the centre’s rules first. They answer about half of our questions before the visit.',
    near: ['dudley', 'stourbridge', 'oldbury', 'cradley-heath'],
  },
  {
    slug: 'stourbridge', name: 'Stourbridge', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 13,
    retail: ['High Street', 'Ryemarket', 'Market Street'],
    conservation: 'Stourbridge town centre has a conservation area. The area has a long history of glass making, so some shopfronts matter to the council even when the building is not listed.',
    note: 'Stourbridge has kept more of its old high street than most Black Country towns. Some old wooden shopfronts are still there. Swapping one of those for aluminium is usually the wrong choice, so ask Dudley Council before you plan on it. We have done many of these jobs. We can tell you early if the council is likely to say yes, so you do not find out after you apply.',
    near: ['halesowen', 'dudley', 'kidderminster', 'brierley-hill'],
  },
  {
    slug: 'brierley-hill', name: 'Brierley Hill', council: 'Dudley Metropolitan Borough Council',
    county: 'West Midlands', miles: 12,
    retail: ['Merry Hill Centre', 'High Street'],
    note: 'Brierley Hill is mostly Merry Hill. Inside the centre, the landlord sets the rules: work happens at night, lifts must be booked and walkways must be protected. The older High Street outside is a different job. It has smaller independent shops on the open street, with normal council rules. When you call, tell us which one you mean, because the time each job takes is very different.',
    near: ['dudley', 'stourbridge', 'cradley-heath'],
  },
  {
    slug: 'tipton', name: 'Tipton', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 8,
    retail: ['Owen Street', 'Tipton Shopping Centre', 'Great Bridge'],
    note: 'Tipton is a canal and industry town. There are more trade counters, MOT garages and food shops than normal high street shops. Great Bridge is busier than Owen Street. Most of our work here is about security. We fit roller shutters, grilles and strong doors on units that are empty at night.',
    near: ['oldbury', 'west-bromwich', 'dudley', 'wednesbury'],
  },
  {
    slug: 'wednesbury', name: 'Wednesbury', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 8,
    retail: ['Union Street', 'Market Place', 'Wednesbury Shopping Precinct'],
    conservation: 'The Market Place and the Church Hill area are conservation areas.',
    note: 'Many shops on Wednesbury Market Place still have their old details. Church Hill is a conservation area, so the council checks changes there carefully. The shops on Union Street are more ordinary, and the rules are easier. The Midland Metro tram runs through the town. It can affect access and delivery times on Union Street more than people expect.',
    near: ['west-bromwich', 'walsall', 'tipton'],
  },
  {
    slug: 'rowley-regis', name: 'Rowley Regis', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 7,
    retail: ['Blackheath High Street', 'Halesowen Street'],
    note: 'Most shops here are on Blackheath High Street, not in Rowley Regis itself. It is a busy row of independent shops. A new shopfront usually goes in when a new tenant moves in. Budgets are tight and time is short, so we give honest prices. Some jobs need building work around the opening. Others only need a new frame in the same space. The price is very different, so it is worth knowing which one before you agree.',
    near: ['oldbury', 'cradley-heath', 'smethwick', 'halesowen'],
  },
  {
    slug: 'cradley-heath', name: 'Cradley Heath', council: 'Sandwell Metropolitan Borough Council',
    county: 'West Midlands', miles: 9,
    retail: ['High Street', 'Cradley Heath Shopping Centre'],
    note: 'Cradley Heath is a small centre with many independent food and service businesses. The town was known for making chains, and some old industrial buildings still stand around the edges. The main problem here is parking and loading. The High Street is narrow and has timed parking rules, so we book glass deliveries for set times.',
    near: ['rowley-regis', 'halesowen', 'brierley-hill', 'oldbury'],
  },
  {
    slug: 'willenhall', name: 'Willenhall', council: 'Walsall Council',
    county: 'West Midlands', miles: 12,
    retail: ['Market Place', 'Stafford Street', 'New Road'],
    conservation: 'The Market Place is a conservation area.',
    note: 'Willenhall was the home of the British lock industry, and there are still many security firms here. The Market Place conservation area is small, but the council does enforce it. Many customers here know a lot about locks and shutter ratings. That helps us choose the right product.',
    near: ['walsall', 'bilston', 'wednesbury'],
  },
  {
    slug: 'bilston', name: 'Bilston', council: 'City of Wolverhampton Council',
    county: 'West Midlands', miles: 13,
    retail: ['Church Street', 'High Street', 'Bilston Market'],
    conservation: 'Parts of Church Street and the area around the town hall are in a conservation area.',
    note: 'Bilston has one of the oldest outdoor markets in the area. The shops around it are traditional: small, open straight onto the street and very busy on market days. We plan our work around market days. Church Street is a conservation area, so the council looks at sign sizes and materials. Painted wood is still a good choice here.',
    near: ['willenhall', 'wednesbury', 'tipton'],
  },
  {
    slug: 'solihull', name: 'Solihull', council: 'Solihull Metropolitan Borough Council',
    county: 'West Midlands', miles: 10,
    retail: ['High Street', 'Mell Square', 'Touchwood'],
    conservation: 'Solihull High Street is a conservation area with old timber-framed buildings. It has some of the strictest shopfront rules in the area.',
    note: 'Solihull is very different from most Black Country towns. The High Street has some really old buildings, so talk to the council early about materials, size and signs. Touchwood is run by a landlord with its own fitting rules. In both places, a standard aluminium shopfront is the wrong place to start.',
    near: ['sutton-coldfield'],
  },
  {
    slug: 'sutton-coldfield', name: 'Sutton Coldfield', council: 'Birmingham City Council',
    county: 'West Midlands', miles: 8,
    retail: ['The Parade', 'Mere Green', 'Gracechurch Centre', 'Boldmere'],
    note: 'Sutton Coldfield has several shopping areas, not one. The Parade and the Gracechurch Centre are normal town-centre shops. Mere Green and Boldmere are wealthier streets of independent shops. There, owners often spend more on the look: more frameless glass, better signs and a better finish. Planning is handled by Birmingham City Council, not a Sutton council, which surprises some people.',
    near: ['solihull', 'tamworth'],
  },
  {
    slug: 'cannock', name: 'Cannock', council: 'Cannock Chase District Council',
    county: 'Staffordshire', miles: 20,
    retail: ['Market Place', 'Cannock Shopping Centre', 'McArthurGlen Designer Outlet'],
    note: 'Cannock has two kinds of shopping: the normal town centre, and the designer outlet at Mill Green. The outlet has its own fitting rules, and work there happens at night. Most town-centre shops are simple post-war buildings with plain openings. These jobs are usually quick and easy to plan.',
    near: ['walsall', 'lichfield', 'stafford'],
  },
  {
    slug: 'lichfield', name: 'Lichfield', council: 'Lichfield District Council',
    county: 'Staffordshire', miles: 20,
    retail: ['Market Street', 'Bore Street', 'Three Spires Shopping Centre'],
    conservation: 'Lichfield city centre is a conservation area. There are many listed buildings around the Cathedral Close, Bore Street and Market Street.',
    note: 'Lichfield has the strictest heritage rules of any town near us. Many shops on Bore Street and around the Cathedral Close are listed buildings. That means you need listed building consent as well as planning permission. Lichfield District Council also runs a grant for old shopfronts in the city centre. It was open for people to register interest when we checked in October 2026. Before you pay for drawings, we will tell you if your idea is realistic here.',
    near: ['tamworth', 'cannock', 'sutton-coldfield', 'burton-upon-trent'],
  },
  {
    slug: 'tamworth', name: 'Tamworth', council: 'Tamworth Borough Council',
    county: 'Staffordshire', miles: 16,
    retail: ['George Street', 'Church Street', 'Ankerside Shopping Centre'],
    conservation: 'The area around the castle, Church Street and Lady Bank is a conservation area.',
    note: 'Most shops in Tamworth are in Ankerside or on George Street. The older shops with stricter rules are up near the castle. Each area works differently. Ankerside follows the centre’s own rules, George Street follows normal council rules, and the conservation area adds more rules on top. Tell us where your shop is, and we can tell you how long the job will take.',
    near: ['lichfield', 'sutton-coldfield', 'nuneaton', 'burton-upon-trent'],
  },
  {
    slug: 'nuneaton', name: 'Nuneaton', council: 'Nuneaton and Bedworth Borough Council',
    county: 'Warwickshire', miles: 22,
    retail: ['Abbey Street', 'Queens Road', 'Ropewalk Shopping Centre'],
    note: 'Nuneaton town centre has had many empty shops, and a lot of work has gone into filling them. So shops change hands often, and many new shopfronts go into units that have stood empty for a while. In those, we cannot see the state of the opening until the old front comes out. We say so in the price at the start, so there are no surprises later.',
    near: ['tamworth', 'rugby'],
  },
  {
    slug: 'redditch', name: 'Redditch', council: 'Redditch Borough Council',
    county: 'Worcestershire', miles: 15,
    retail: ['Kingfisher Shopping Centre', 'Evesham Street', 'Church Green'],
    note: 'Redditch is a new town. Most shops are inside the Kingfisher Centre, not on the open street. So the centre’s own fitting rules apply, and the work is done at night. The town was famous for making needles. Today its industrial estates give us more steady shutter and security door work than the shops do.',
    near: ['bromsgrove', 'solihull', 'worcester'],
  },
  {
    slug: 'bromsgrove', name: 'Bromsgrove', council: 'Bromsgrove District Council',
    county: 'Worcestershire', miles: 14,
    retail: ['High Street', 'Worcester Road'],
    conservation: 'Bromsgrove High Street is a conservation area.',
    note: 'Bromsgrove has a small high street of mostly independent shops. It is a conservation area, and the council does apply the rules. The shops are small and open straight onto the pavement, which leaves little room to work. Scaffold permits and access for the glass must be sorted first, often with the neighbours too. Only then do we fix the dates.',
    near: ['redditch', 'kidderminster', 'halesowen', 'worcester'],
  },
  {
    slug: 'kidderminster', name: 'Kidderminster', council: 'Wyre Forest District Council',
    county: 'Worcestershire', miles: 18,
    retail: ['Vicar Street', 'Worcester Street', 'Weavers Wharf'],
    note: 'Kidderminster was a carpet-making town. Some of its old buildings have very wide ground-floor openings. That is good for a glass shopfront, but harder for a shutter. A wide opening needs a strong beam above it and a bigger shutter roller, and a normal shop shutter is often too small. Weavers Wharf is a modern retail park and has none of these problems.',
    near: ['stourbridge', 'bromsgrove', 'worcester'],
  },
  {
    slug: 'worcester', name: 'Worcester', council: 'Worcester City Council',
    county: 'Worcestershire', miles: 28,
    retail: ['High Street', 'Friar Street', 'CrownGate', 'The Shambles'],
    conservation: 'The city centre is a conservation area. Friar Street and New Street have many listed timber-framed buildings.',
    note: 'Friar Street is one of the best-kept medieval streets in the area. Much of the shopfront work there is on listed buildings, so you usually need listed building consent. The modern shops at CrownGate are a very different job. Talk to us before you get drawings made, because what you can do on the High Street and on Friar Street is very different.',
    near: ['kidderminster', 'bromsgrove', 'redditch'],
  },
  {
    slug: 'telford', name: 'Telford', council: 'Telford and Wrekin Council',
    county: 'Shropshire', miles: 32,
    retail: ['Telford Shopping Centre', 'Ironmasters Way', 'Wellington High Street'],
    note: 'Telford is a new town built around a covered shopping centre. Most shop work there follows the centre’s rules, with access at night. Wellington and Oakengates have older high streets that work very differently. The industrial estates give us steady work on shutters and staff doors. The openings are bigger, they are used more, and strength matters more than looks.',
    near: ['stafford'],
  },
  {
    slug: 'stafford', name: 'Stafford', council: 'Stafford Borough Council',
    county: 'Staffordshire', miles: 28,
    retail: ['Greengate Street', 'Gaolgate Street', 'Guildhall Shopping Centre'],
    conservation: 'Stafford town centre is a conservation area. Greengate Street has the Ancient High House, an old timber-framed building.',
    note: 'Stafford’s old centre has stricter rules than you might expect for a town its size. Greengate Street and Gaolgate Street have real heritage rules. Outside the centre, the retail parks and trade units are normal modern work. The line between the two is clear, and which side your shop is on changes almost everything about the job.',
    near: ['cannock', 'telford'],
  },
  {
    slug: 'rugby', name: 'Rugby', council: 'Rugby Borough Council',
    county: 'Warwickshire', miles: 32,
    retail: ['High Street', 'Sheep Street', 'Clock Towers Shopping Centre'],
    conservation: 'The town centre around Church Street and Market Place is a conservation area.',
    note: 'Rugby has a small town centre with mostly independent shops, and the oldest part is a conservation area. Around the town there are many warehouses and delivery firms. They give us steady work on industrial shutters, loading bay doors and security grilles. On those units, what matters is how often the door is used and how strong it is.',
    near: ['nuneaton', 'leamington-spa'],
  },
  {
    slug: 'leamington-spa', name: 'Leamington Spa', council: 'Warwick District Council',
    county: 'Warwickshire', miles: 26,
    retail: ['The Parade', 'Regent Street', 'Royal Priors'],
    conservation: 'Almost all of central Leamington is a conservation area. Many Regency buildings on The Parade and Regent Street are listed.',
    note: 'Leamington is one of the strictest towns near us on design. Many of the old Regency shops on The Parade are listed. Plan a sign, lettering and lighting that suit the building, because a standard light-up box sign is unlikely to be accepted. Read Warwick District Council’s guidance before you fix the design.',
    near: ['warwick', 'rugby', 'stratford-upon-avon'],
  },
  {
    slug: 'warwick', name: 'Warwick', council: 'Warwick District Council',
    county: 'Warwickshire', miles: 24,
    retail: ['Swan Street', 'Jury Street', 'Market Place'],
    conservation: 'Warwick town centre is a conservation area. Many buildings are listed, because the town was rebuilt after a fire in 1694.',
    note: 'Most of Warwick’s centre was rebuilt after the fire of 1694. The buildings match each other, and the conservation area protects that. Many shopfronts are listed, so listed building consent is often needed. These jobs take longer, with more time needed before work starts. We tell you that in the first conversation, not after you apply.',
    near: ['leamington-spa', 'stratford-upon-avon'],
  },
  {
    slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon', council: 'Stratford-on-Avon District Council',
    county: 'Warwickshire', miles: 25,
    retail: ['Bridge Street', 'Henley Street', 'High Street', 'Bell Court'],
    conservation: 'The town centre is a conservation area. It has many listed and timber-framed buildings, mainly on Henley Street and High Street.',
    note: 'Stratford is an old town with visitors from all over the world. Many of the timber-framed shops on Henley Street are listed, and changes to those need listed building consent. The council will look closely at signs and lighting. This is specialist work, and we price it that way from the start. We do not give a standard price and find the problems later.',
    near: ['warwick', 'leamington-spa', 'redditch'],
  },
  {
    slug: 'burton-upon-trent', name: 'Burton upon Trent', council: 'East Staffordshire Borough Council',
    county: 'Staffordshire', miles: 28,
    retail: ['High Street', 'Station Street', 'Coopers Square'],
    note: 'Burton is a brewing town, and it still shows. There are big industrial buildings and loading openings next to the normal town-centre shops. Coopers Square has its own landlord rules, while the High Street and Station Street follow normal council rules. The brewery units are where the bigger shutter jobs are. The openings are wide, the doors are used a lot and lorries move around them.',
    near: ['lichfield', 'tamworth'],
  },
  {
    slug: 'chesterfield', name: 'Chesterfield', council: 'Chesterfield Borough Council',
    county: 'Derbyshire', miles: 73,
    retail: ['Market Place', 'Low Pavement', 'Vicar Lane', 'Knifesmithgate'],
    conservation: 'The Chesterfield Town Centre Conservation Area was created in 1976 and made bigger in 1982. The council has an extra rule for it, called an Article 4 Direction. So some changes that need no permission elsewhere do need it here.',
    note: 'We cover Chesterfield for shutter, door and glass repairs, with same-day call-outs for emergencies. The town centre is a conservation area built around an open-air market, which goes back to at least 1165. Shops on the Market Place and Low Pavement are seen by a lot of people. On those streets we repair like-for-like, keeping the same look. Before we order a new shopfront there, we check it against the extra council rule.',
    near: ['sheffield', 'rotherham'],
  },
  {
    slug: 'sheffield', name: 'Sheffield', council: 'Sheffield City Council',
    county: 'South Yorkshire', miles: 86,
    retail: ['Fargate', 'The Moor', 'Division Street', 'London Road', 'Abbeydale Road', 'Ecclesall Road', 'Meadowhall'],
    conservation: 'Sheffield has 38 conservation areas. In 2025 the council reviewed the City Centre and Kelham Island areas, and proposed making them bigger around Castlegate, Fitzalan Square, Norfolk Street and West Street.',
    note: 'We cover Sheffield for shutter, door and glass repairs, with same-day call-outs for emergencies. We work from Fargate and The Moor in the city centre to the long rows of shops on London Road, Abbeydale Road and Ecclesall Road. Food shops and corner shops there pull their shutters down every night, and cannot open if a shutter is stuck. Sheffield’s draft shopfront rules cover busy shopping streets, not only conservation areas. So if a shutter on a main road needs replacing, we choose one that fits those rules.',
    near: ['rotherham', 'chesterfield'],
  },
  {
    slug: 'rotherham', name: 'Rotherham', council: 'Rotherham Metropolitan Borough Council',
    county: 'South Yorkshire', miles: 88,
    retail: ['College Street', 'Effingham Street', 'High Street', 'All Saints Square', 'Parkgate Shopping'],
    conservation: 'The Rotherham Town Centre Conservation Area was created in 1995. It includes the Minster, a Grade I listed church, and Rotherham Bridge.',
    note: 'We cover Rotherham for shutter, door and glass repairs, with same-day call-outs for emergencies. The older centre around College Street, Effingham Street and High Street is a conservation area. The council has been rebuilding the streets there, so a new shopfront is judged against the street as well as the building. Out at Parkgate and the trading estates, the openings are wider and shutters go up and down all day.',
    near: ['sheffield', 'chesterfield'],
  },
];

/** Lookup by slug. */
export const townBySlug: Record<string, Town> = Object.fromEntries(
  towns.map((t) => [t.slug, t]),
);
