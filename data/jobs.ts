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
  kind: 'shopfront' | 'doors' | 'glazing' | 'screens' | 'shutters';
  /** Shown in the "Our work" strip on the home page. */
  home?: boolean;
}

export const jobs: Job[] = [
  { src: '/assets/sigma-retail-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', what: 'Restaurant front: dark grey aluminium with a single glazed entrance door, fixed display glazing and a painted fascia sign above.' },
  { src: '/assets/sigma-mall-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', home: true, what: 'Single-storey retail unit with a new dark aluminium front and a pair of sliding glazed doors, between existing neighbouring units.' },
  { src: '/assets/sigma-parade-sliding-front.jpg', w: 1000, h: 680, kind: 'shopfront', home: true, what: 'Shop unit in a brick parade: dark aluminium front with sliding glazed entrance doors between fixed display panes.' },
  { src: '/assets/sigma-modern-front.jpeg', w: 1600, h: 1200, kind: 'shopfront', what: 'A new aluminium shopfront frame and entrance door going in, with the site still taped off.' },
  { src: '/assets/sigma-commercial-entrance.jpeg', w: 1024, h: 768, kind: 'doors', home: true, what: 'Double glazed entrance doors with full-height pull handles beneath a glazed fanlight, ready for an opening day.' },
  { src: '/assets/automatic-door-sigma.jpeg', w: 480, h: 848, kind: 'doors', what: 'Automatic sliding door in a dark aluminium frame at a convenience store entrance.' },
  { src: '/assets/sigma-gallery-1.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Ground-floor commercial unit with new full-height aluminium glazing set between brick piers.' },
  { src: '/assets/sigma-glazing-install.jpg', w: 1000, h: 1001, kind: 'glazing', home: true, what: 'Dark aluminium framing and a glazed door going into a commercial unit, with glass panels still stacked inside.' },
  { src: '/assets/sigma-glazed-shopfront.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Black-framed glazed screen with doors and slim glazing bars across the rear of a brick building, during installation.' },
  { src: '/assets/sigma-roller-front.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'White-framed glazed doors and side panels installed in a brick opening.' },
  { src: '/assets/sigma-front-variant.jpeg', w: 1600, h: 1200, kind: 'screens', what: 'Internal black-framed glazed partition with a glazed door, creating a meeting room inside an office.' },
  { src: '/assets/sigma-front-wide.jpeg', w: 1600, h: 1200, kind: 'screens', what: 'The same internal partition seen from the wider room.' },
  { src: '/assets/sigma-glass-front.jpeg', w: 1600, h: 1200, kind: 'glazing', what: 'Glazed roof lantern on a flat roof, mid-installation.' },
  { src: '/assets/sigma-shutter-over-entrance.jpg', w: 1000, h: 680, kind: 'shutters', home: true, what: 'Roller shutter and box fitted above a dark aluminium glazed entrance, the door standing open beneath it.' },
  { src: '/assets/sigma-industrial-shutter.jpg', w: 1000, h: 1000, kind: 'shutters', home: true, what: 'Dark green steel roller shutter closed across a loading opening in a clad industrial unit, with a yellow bottom rail.' },
  { src: '/assets/sigma-shutter-repair.jpg', w: 1000, h: 700, kind: 'shutters', what: 'A shop’s roller shutter being worked on, with stepladders set up beneath it.' },
];

export const videos = [
  { src: '/assets/sigma-installation-video.mp4', poster: '/assets/video-drinks-door-poster.jpg', what: 'An automatic sliding door we fitted inside a store, opening into a chilled drinks room.' },
  { src: '/assets/automatic-door-web.mp4', poster: '/assets/video-entrance-door-poster.jpg', what: 'An automatic sliding entrance door at a convenience store, running through its opening cycle.' },
];
