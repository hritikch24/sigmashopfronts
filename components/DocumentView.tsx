import PrintButton from './PrintButton';

const COMPANY_NAME = 'SIGMA SHOP FRONTS LTD';
const COMPANY_ADDRESS = '4 Thornwood Close, Oldbury, West Midlands, B68 9LX';
const COMPANY_PHONE = '07414 779594';
const COMPANY_SITE = 'www.sigmashopfronts.com';
const LOGO_SRC = '/assets/sigma-icon-512.png';

const NAVY = '#101a3a';
const NAVY_LIGHT = '#1d2b5c';

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
}

interface DocumentMeta {
  projectReference?: string;
  scope?: string;
  specifications?: string;
  leadTime?: string;
}

interface DocumentData {
  id: string;
  type: string;
  number: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  lineItems: LineItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  notes: string | null;
  meta: DocumentMeta | null;
  depositPercent: number | null;
  validUntil: string | Date | null;
  dueDate: string | Date | null;
  status: string;
  createdAt: string | Date;
}

function formatDate(d: string | Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-GB');
}

function gbp(n: number) {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SpecLines({ text }: { text: string }) {
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-1.5" />;
        if (t.endsWith(':')) return <p key={i} className="font-bold" style={{ color: NAVY }}>{t}</p>;
        return (
          <p key={i} className="pl-5 relative">
            <span className="absolute left-1" style={{ color: NAVY }}>&bull;</span>
            {t}
          </p>
        );
      })}
    </div>
  );
}

export default function DocumentView({ doc }: { doc: DocumentData }) {
  const isInvoice = doc.type === 'invoice';
  const meta = doc.meta || {};
  const title = isInvoice ? 'INVOICE' : 'QUOTATION';
  const vat = doc.vatRate > 0;

  const deposit = isInvoice && doc.depositPercent && doc.depositPercent > 0 ? (doc.total * doc.depositPercent) / 100 : null;
  const balance = deposit !== null ? doc.total - deposit : null;

  const validityDays = doc.validUntil
    ? Math.max(1, Math.round((new Date(doc.validUntil).getTime() - new Date(doc.createdAt).getTime()) / 86400000))
    : null;

  const intro = isInvoice
    ? ['Thank you for your business.', 'Please find below our invoice for the works', 'carried out at the above premises.']
    : ['Thank you for your enquiry.', 'We are pleased to submit our quotation', 'for the supply and installation works', 'at the above premises as per your request.'];

  const terms: string[] = isInvoice
    ? [
        vat ? 'Prices are inclusive of 20% VAT where shown.' : 'No VAT has been applied to this invoice.',
        deposit !== null ? `A deposit of ${doc.depositPercent}% is required to confirm the order.` : 'Payment is due upon completion of the works unless otherwise agreed.',
        'Please use the invoice number as the payment reference.',
        'All work is completed by qualified engineers using high-quality materials.',
      ]
    : [
        vat ? 'Prices are exclusive of 20% VAT.' : 'Prices shown are the full amounts payable.',
        'Any additional works not listed above will be quoted separately.',
        validityDays ? `This quotation is valid for ${validityDays} days from the date of issue.` : 'This quotation is valid for 15 days from the date of issue.',
        'Payment is due upon completion of the works unless otherwise agreed.',
        'All work will be completed by qualified engineers using high-quality materials.',
      ];

  return (
    <div className="min-h-screen bg-grey-100 py-8 px-4 print:bg-white print:py-0 print:px-0" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      <div className="max-w-[210mm] mx-auto">
        <div className="no-print flex justify-end mb-4">
          <PrintButton />
        </div>

        <div className="bg-white shadow-lg print:shadow-none text-[#1f2430] text-[14.5px] leading-relaxed overflow-hidden" style={{ fontFamily: 'var(--font-heading), "Segoe UI", Arial, sans-serif' }}>

          {/* ── Header band ── */}
          <div className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
            <div className="absolute -right-16 -top-16 w-56 h-56 rotate-45" style={{ backgroundColor: NAVY_LIGHT }} />
            <div className="relative z-10 flex items-center gap-5 px-10 py-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_SRC} alt={COMPANY_NAME + ' logo'} className="w-16 h-16 rounded" />
              <div>
                <h1 className="text-white text-2xl sm:text-[32px] font-extrabold tracking-wide leading-tight">{COMPANY_NAME}</h1>
                <p className="text-white/85 text-[13px] mt-1.5 font-medium tracking-wide">
                  ☎ {COMPANY_PHONE} &nbsp;|&nbsp; {COMPANY_SITE}
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 pt-6 pb-10">

            {/* title row */}
            <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="text-[44px] font-extrabold leading-none tracking-tight" style={{ color: NAVY }}>{title}</h2>
                <div className="w-16 h-1.5 mt-2 rounded" style={{ backgroundColor: NAVY }} />
              </div>
              <table className="text-[14px]">
                <tbody>
                  <tr>
                    <td className="font-bold pr-3 py-0.5" style={{ color: NAVY }}>{isInvoice ? 'Invoice No.' : 'Quotation No.'}</td>
                    <td className="pr-2">:</td>
                    <td>{doc.number}</td>
                  </tr>
                  <tr>
                    <td className="font-bold pr-3 py-0.5" style={{ color: NAVY }}>Date</td>
                    <td className="pr-2">:</td>
                    <td>{formatDate(doc.createdAt)}</td>
                  </tr>
                  {!isInvoice && doc.validUntil && (
                    <tr>
                      <td className="font-bold pr-3 py-0.5" style={{ color: NAVY }}>Valid Until</td>
                      <td className="pr-2">:</td>
                      <td>{formatDate(doc.validUntil)}</td>
                    </tr>
                  )}
                  {isInvoice && doc.dueDate && (
                    <tr>
                      <td className="font-bold pr-3 py-0.5" style={{ color: NAVY }}>Payment Due</td>
                      <td className="pr-2">:</td>
                      <td>{formatDate(doc.dueDate)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Customer box + intro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <span className="inline-block text-white text-[13px] font-bold px-4 py-1.5" style={{ backgroundColor: NAVY }}>
                  {isInvoice ? 'Invoice To' : 'Quotation For'}
                </span>
                <div className="border px-4 py-3.5" style={{ borderColor: NAVY }}>
                  <p className="font-bold uppercase" style={{ color: NAVY }}>{doc.customerName}</p>
                  {doc.customerAddress && doc.customerAddress.split(',').map((line, i) => <p key={i}>{line.trim()}</p>)}
                  {doc.customerPhone && <p>{doc.customerPhone}</p>}
                  {doc.customerEmail && <p>{doc.customerEmail}</p>}
                </div>
              </div>
              <div className="pt-8 space-y-1">
                {intro.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>

            {/* Scope + specifications (quotes) */}
            {!isInvoice && meta.scope && (
              <div className="mb-8">
                <p className="font-bold mb-1.5" style={{ color: NAVY }}>Scope of Work — supply and install:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {meta.scope.split('\n').filter((l) => l.trim()).map((l, i) => <li key={i}>{l.trim()}</li>)}
                </ul>
              </div>
            )}
            {!isInvoice && meta.specifications && (
              <div className="mb-10">
                <p className="font-bold mb-2 text-[15px] uppercase tracking-wide" style={{ color: NAVY }}>Specifications</p>
                <SpecLines text={meta.specifications} />
              </div>
            )}

            {/* Works table */}
            <table className="w-full border-collapse mb-8">
              <thead>
                <tr className="text-white text-[13px] tracking-wider" style={{ backgroundColor: NAVY }}>
                  <th className="px-3 py-2.5 text-left w-14">NO.</th>
                  <th className="px-3 py-2.5 text-left">DESCRIPTION OF WORKS</th>
                  <th className="px-3 py-2.5 text-right w-44">{vat ? 'PRICE (EX. VAT)' : 'PRICE'}</th>
                </tr>
              </thead>
              <tbody>
                {doc.lineItems.map((li, idx) => (
                  <tr key={idx} className="align-top" style={{ borderBottom: `1px solid ${NAVY}22`, borderLeft: `1px solid ${NAVY}44`, borderRight: `1px solid ${NAVY}44` }}>
                    <td className="px-3 py-4 font-extrabold text-lg" style={{ color: NAVY }}>{idx + 1}.</td>
                    <td className="px-3 py-4">
                      <p className="font-bold text-[15.5px]" style={{ color: NAVY }}>{li.description}</p>
                      {li.qty > 1 && <p className="text-[13px] mt-1">Quantity: {li.qty} × {gbp(li.unitPrice)}</p>}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <p className="font-extrabold text-[22px] leading-tight" style={{ color: NAVY }}>{gbp(li.qty * li.unitPrice)}</p>
                      {vat && <p className="text-[13px]">+ VAT</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isInvoice && meta.leadTime && (
              <p className="mb-8 font-bold" style={{ color: NAVY }}>LEAD TIME: <span className="font-medium text-[#1f2430]">{meta.leadTime}</span></p>
            )}

            {/* Terms + totals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <p className="font-bold text-[14px] tracking-wide mb-2" style={{ color: NAVY }}>TERMS &amp; CONDITIONS</p>
                <ul className="space-y-1.5 text-[12.5px]">
                  {terms.map((t, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0" style={{ color: NAVY }}>&bull;</span>
                      {t}
                    </li>
                  ))}
                </ul>
                {doc.notes && (
                  <div className="mt-4 text-[12.5px]">
                    <p className="font-bold" style={{ color: NAVY }}>Notes:</p>
                    <p className="whitespace-pre-wrap">{doc.notes}</p>
                  </div>
                )}
              </div>
              <div>
                <table className="w-full border-collapse text-[14.5px]">
                  <tbody>
                    <tr style={{ border: `1px solid ${NAVY}55` }}>
                      <td className="px-4 py-2 font-bold" style={{ color: NAVY }}>SUBTOTAL</td>
                      <td className="px-4 py-2 text-right">{gbp(doc.subtotal)}</td>
                    </tr>
                    {vat && (
                      <tr style={{ border: `1px solid ${NAVY}55` }}>
                        <td className="px-4 py-2 font-bold" style={{ color: NAVY }}>VAT ({doc.vatRate}%)</td>
                        <td className="px-4 py-2 text-right">{gbp(doc.vatAmount)}</td>
                      </tr>
                    )}
                    <tr className="text-white" style={{ backgroundColor: NAVY }}>
                      <td className="px-4 py-2.5 font-bold">TOTAL {vat ? '(INC. VAT)' : ''}</td>
                      <td className="px-4 py-2.5 text-right font-extrabold text-[18px]">{gbp(doc.total)}</td>
                    </tr>
                    {deposit !== null && balance !== null && (
                      <>
                        <tr style={{ border: `1px solid ${NAVY}55`, backgroundColor: '#fdf3cd' }}>
                          <td className="px-4 py-2 font-bold" style={{ color: NAVY }}>{doc.depositPercent}% DEPOSIT</td>
                          <td className="px-4 py-2 text-right font-bold">{gbp(deposit)}</td>
                        </tr>
                        <tr style={{ border: `1px solid ${NAVY}55` }}>
                          <td className="px-4 py-2 font-bold" style={{ color: NAVY }}>{100 - (doc.depositPercent as number)}% BALANCE</td>
                          <td className="px-4 py-2 text-right">{gbp(balance)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Closing line */}
            <p className="text-center italic text-[17px] font-semibold mb-1" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
              {isInvoice ? 'Thank you for your business.' : 'Thank you for the opportunity to quote.'}
            </p>
            <p className="text-center text-[13px]">We look forward to working with you.</p>
          </div>

          {/* ── Footer band ── */}
          <div className="relative overflow-hidden text-center text-white px-10 py-4" style={{ backgroundColor: NAVY }}>
            <div className="absolute -left-14 -bottom-14 w-40 h-40 rotate-45" style={{ backgroundColor: NAVY_LIGHT }} />
            <div className="relative z-10">
              <p className="font-bold text-[14px]">{COMPANY_NAME}</p>
              <p className="text-white/85 text-[12.5px] mt-0.5">{COMPANY_ADDRESS}</p>
              <p className="text-white/85 text-[12.5px] mt-0.5">☎ {COMPANY_PHONE} &nbsp;|&nbsp; {COMPANY_SITE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
