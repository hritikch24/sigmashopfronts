import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 card-gradient-border hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]"
    >
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space via-space/40 to-transparent" />
        <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/5 transition-colors duration-500" />
      </div>
      <div className="p-5 bg-space-light/50 backdrop-blur-sm">
        <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-cyan transition-colors duration-300">
          {title}
        </h3>
        <p className="text-grey-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan group-hover:gap-3 transition-all duration-300">
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
