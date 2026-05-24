import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for could not be found. Browse our shopfront services or contact us for help.',
};

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-max text-center py-16">
        <p className="text-7xl font-heading font-extrabold text-gold mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
          Page Not Found
        </h1>
        <p className="text-grey-600 max-w-md mx-auto mb-8 leading-relaxed">
          Sorry, we cannot find the page you are looking for. It may have been moved or no longer
          exists. Try one of the links below.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
          <Link href="/services" className="btn-outline">
            View Services
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
