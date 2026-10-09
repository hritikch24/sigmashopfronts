/**
 * Photographs of our own work. Captions describe what is visible and nothing
 * more: no client names, towns or dates until a client agrees to be named.
 * Every file here was checked against the other sites' images and is unique
 * to this site (seo-plan/check-portfolio.mjs re-checks on every run).
 */
export interface Job {
  src: string;
  w: number;
  h: number;
  what: string;
  kind: 'shopfront' | 'doors' | 'glazing' | 'screens';
}

export const jobs: Job[] = [
  { src: '/assets/sigma-retail-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', what: 'Restaurant frontage: dark grey aluminium front with a single glazed entrance door, fixed display glazing and a painted fascia sign above.' },
  { src: '/assets/sigma-mall-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', what: 'Single-storey retail unit with a new dark aluminium front and a pair of sliding glazed doors, between existing neighbouring units.' },
  { src: '/assets/sigma-modern-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', what: 'A new aluminium shopfront frame and entrance door going in, with the site still taped off.' },
  { src: '/assets/sigma-commercial-entrance.jpeg', w: 1024, h: 768, kind: 'doors', what: 'Double glazed entrance doors with full-height pull handles beneath a glazed fanlight, ready for an opening day.' },
  { src: '/assets/automatic-door-sigma.jpeg', w: 480, h: 848, kind: 'doors', what: 'Automatic sliding door in a dark aluminium frame at a convenience store entrance.' },
  { src: '/assets/sigma-gallery-1.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Ground-floor commercial unit with new full-height aluminium glazing set between brick piers.' },
  { src: '/assets/sigma-glazed-shopfront.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Black-framed glazed screen with doors and slim glazing bars across the rear of a brick building, during installation.' },
  { src: '/assets/sigma-roller-front.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'White-framed glazed doors and side panels installed in a brick opening.' },
  { src: '/assets/sigma-front-variant.jpeg', w: 1600, h: 1200, kind: 'screens', what: 'Internal black-framed glazed partition with a glazed door, creating a meeting room inside an office.' },
  { src: '/assets/sigma-front-wide.jpeg', w: 1600, h: 1200, kind: 'screens', what: 'The same internal partition seen from the wider room.' },
  { src: '/assets/sigma-glass-front.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Glazed roof lantern on a flat roof, mid-installation.' },
];

export const videos = [
  { src: '/assets/sigma-installation-video.mp4', poster: '/assets/video-drinks-door-poster.jpg', what: 'An automatic sliding door we fitted inside a store, opening into a chilled drinks room.' },
  { src: '/assets/automatic-door-web.mp4', poster: '/assets/video-entrance-door-poster.jpg', what: 'An automatic sliding entrance door at a convenience store, running through its opening cycle.' },
];
