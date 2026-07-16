import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import DocumentView from '@/components/DocumentView';

export const metadata: Metadata = {
  title: 'Your Invoice | Sigma Shopfronts',
  robots: { index: false, follow: false },
};

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });

  if (!doc || doc.type !== 'invoice') {
    notFound();
  }

  return (
    <DocumentView
      doc={{
        ...doc,
        lineItems: doc.lineItems as unknown as { description: string; qty: number; unitPrice: number }[],
        meta: doc.meta as unknown as { projectReference?: string; scope?: string; specifications?: string; leadTime?: string } | null,
      }}
    />
  );
}
