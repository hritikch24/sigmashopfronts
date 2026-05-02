export interface Testimonial {
  name: string;
  business: string;
  location: string;
  rating: 4 | 5;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'James Whitfield',
    business: 'Whitfield & Co Estate Agents',
    location: 'Birmingham',
    rating: 5,
    text: 'Sigma replaced our dated timber frontage with a sleek aluminium system in under three days. The difference to our street presence has been remarkable — we have had compliments from clients and neighbouring businesses alike.',
  },
  {
    name: 'Priya Sharma',
    business: 'Spice Quarter Restaurant',
    location: 'Manchester',
    rating: 5,
    text: 'We needed bi-fold doors that could open our restaurant onto the pavement during summer. Sigma handled the structural survey, building control, and installation without a single hitch. The doors work beautifully and have genuinely increased covers.',
  },
  {
    name: 'David Hughes',
    business: 'Hughes Pharmacy Group',
    location: 'Cardiff',
    rating: 5,
    text: 'After a break-in, Sigma fitted new security shutters and a reinforced entrance door within 48 hours. Their emergency response was outstanding, and the quality of the installation is first-rate. We have since used them for two more branches.',
  },
  {
    name: 'Sarah Mitchell',
    business: 'Mitchell Boutique',
    location: 'Leeds',
    rating: 5,
    text: 'From the initial survey to the final snagging visit, the Sigma team were professional and communicative. The frameless glass frontage they installed has transformed our shop — it looks like a completely different premises.',
  },
  {
    name: 'Mohammed Al-Rashid',
    business: 'Al-Rashid Jewellers',
    location: 'London',
    rating: 5,
    text: 'Security was our primary concern. Sigma specified PAS 24-rated doors and LPS 1175-certified shutters, and took the time to explain every detail. Our insurers were satisfied immediately, and we feel far more secure.',
  },
  {
    name: 'Karen Foster',
    business: 'Foster & Lane Solicitors',
    location: 'Bristol',
    rating: 4,
    text: 'We chose Sigma for our office entrance refurbishment based on a recommendation. They delivered a smart, DDA-compliant automatic entrance that suits a professional services firm perfectly. Good value compared to the other quotes we received.',
  },
  {
    name: 'Tom Bradley',
    business: 'Bradley Motors',
    location: 'Sheffield',
    rating: 5,
    text: 'Our showroom needed industrial roller shutters that could handle daily use. Sigma installed electrically operated insulated shutters that run quietly and have not missed a beat in over a year of heavy use.',
  },
  {
    name: 'Fiona Campbell',
    business: 'The Campbell Gallery',
    location: 'Edinburgh',
    rating: 5,
    text: 'Listed building consent made our shopfront project more complex than most. Sigma worked closely with the conservation officer and delivered a sympathetic aluminium design that satisfied planning and still looks contemporary. Impressive attention to detail.',
  },
  {
    name: 'Raj Patel',
    business: 'Patel Convenience Stores',
    location: 'Leicester',
    rating: 5,
    text: 'Sigma have now fitted shopfronts and shutters at four of our stores. Consistent quality every time, competitive prices, and they always clean up properly afterwards. They are our go-to for any shopfront work.',
  },
  {
    name: 'Claire Donovan',
    business: 'Donovan Dental Practice',
    location: 'Liverpool',
    rating: 4,
    text: 'We needed fire-rated doors for our clinical areas as part of a refurbishment. Sigma sourced FD60-rated steel doorsets and installed them neatly with minimal disruption to our patients. Would recommend for healthcare premises.',
  },
];
