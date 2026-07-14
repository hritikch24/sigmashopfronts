'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/metrics') || pathname.startsWith('/admin')) return null;
  if (pathname.startsWith('/invoice/')) return null;
  if (pathname.startsWith('/quote/') && pathname !== '/quote') return null;
  return <>{children}</>;
}
