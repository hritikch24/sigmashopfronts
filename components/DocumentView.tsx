import PrintButton from './PrintButton';

const COMPANY_NAME = 'SIGMA SHOP FRONTS LTD';
const COMPANY_ADDRESS = '4 Thornwood Close, Oldbury, West Midlands, B68 9LX';
const COMPANY_PHONE = '07414 779594';
const LOGO_SRC = '/assets/sigma-icon-512.png';

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
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

export default function DocumentView({ doc }: { doc: DocumentData }) {
  const isInvoice = doc.type === 'invoice';
  const title = isInvoice ? 'PROFORMA INVOICE' : 'QUOTATION';
  const numberLabel = isInvoice ? 'Invoice Number' : 'Quote Number';
  const dateLabel = isInvoice ? 'Invoice Date' : 'Quote Date';

  const deposit = doc.depositPercent && doc.depositPercent > 0 ? (doc.total * doc.depositPercent) / 100 : null;
  const balance = deposit !== null ? doc.total - deposit : null;

  return (
    <div className="min-h-screen bg-grey-100 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-[210mm] mx-auto">
        <div className="no-print flex justify-end mb-4">
          <PrintButton />
        </div>

        <div className="bg-white shadow-lg print:shadow-none p-10 sm:p-14 text-black" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {/* Letterhead */}
          <div className="flex items-center gap-4 border-b-[3px] border-[#c0392b] pb-3 mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt={COMPANY_NAME + ' logo'} className="w-14 h-14 rounded" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#c0392b] tracking-wide">{COMPANY_NAME}</h1>
          </div>

          {/* Title */}
          <p className="text-center font-bold underline text-lg mb-10">{title}</p>

          {/* Number + date */}
          <div className="flex flex-wrap justify-between gap-4 mb-8 text-[15px]">
            <p><span className="font-bold">{numberLabel}:</span> {doc.number}</p>
            <p><span className="font-bold">{dateLabel}:</span> {formatDate(doc.createdAt)}</p>
          </div>

          {/* Bill to */}
          <div className="mb-10 text-[15px]">
            <p className="font-bold mb-2">{isInvoice ? 'Invoice To:' : 'Quote For:'}</p>
            <p>{doc.customerName}</p>
            {doc.customerAddress && doc.customerAddress.split(',').map((line, i) => <p key={i}>{line.trim()}</p>)}
            {doc.customerPhone && <p>{doc.customerPhone}</p>}
            {doc.customerEmail && <p>{doc.customerEmail}</p>}
          </div>

          {/* Items table */}
          <table className="w-full border-collapse mb-10 text-[15px]">
            <thead>
              <tr>
                <th className="border border-black px-3 py-2 text-left font-normal">Description</th>
                <th className="border border-black px-3 py-2 text-right font-normal w-40">Total (£)</th>
              </tr>
            </thead>
            <tbody>
              {doc.lineItems.map((li, idx) => (
                <tr key={idx}>
                  <td className="border border-black px-3 py-2">
                    {li.description}
                    {li.qty > 1 && <span className="text-sm"> ({li.qty} × {gbp(li.unitPrice)})</span>}
                  </td>
                  <td className="border border-black px-3 py-2 text-right font-bold">{gbp(li.qty * li.unitPrice)}{doc.vatRate > 0 ? ' + VAT' : ''}</td>
                </tr>
              ))}
              {doc.vatRate > 0 && (
                <tr>
                  <td className="border border-black px-3 py-2 text-right">VAT {doc.vatRate}%</td>
                  <td className="border border-black px-3 py-2 text-right">{gbp(doc.vatAmount)}</td>
                </tr>
              )}
              <tr>
                <td className="border border-black px-3 py-2 text-right font-bold">TOTAL</td>
                <td className="border border-black px-3 py-2 text-right font-bold">{gbp(doc.total)}</td>
              </tr>
              {deposit !== null && balance !== null && (
                <>
                  <tr>
                    <td className="border border-black px-3 py-2 text-right"><span className="bg-yellow-300 px-1 font-bold">{doc.depositPercent}% DEPOSIT</span></td>
                    <td className="border border-black px-3 py-2 text-right"><span className="bg-yellow-300 px-1">{gbp(deposit)}</span></td>
                  </tr>
                  <tr>
                    <td className="border border-black px-3 py-2 text-right">{100 - (doc.depositPercent as number)}% BALANCE</td>
                    <td className="border border-black px-3 py-2 text-right">{gbp(balance)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {/* Quote validity / invoice due date */}
          {!isInvoice && doc.validUntil && (
            <p className="mb-8 text-[15px]"><span className="font-bold">Valid until:</span> {formatDate(doc.validUntil)}</p>
          )}
          {isInvoice && doc.dueDate && (
            <p className="mb-8 text-[15px]"><span className="font-bold">Due date:</span> {formatDate(doc.dueDate)}</p>
          )}

          {/* Notes */}
          {doc.notes && (
            <div className="mb-8 text-[15px]">
              <p className="font-bold mb-1">Notes:</p>
              <p className="whitespace-pre-wrap">{doc.notes}</p>
            </div>
          )}

          {isInvoice && (
            <p className="font-bold underline mb-8 text-[15px]">When making payments, please use invoice number as references.</p>
          )}

          {/* Footer */}
          <div className="mt-16 text-[13px] leading-relaxed">
            <p><span className="font-bold">Company address</span>: {COMPANY_ADDRESS}</p>
            <p><span className="font-bold">Phone:</span> {COMPANY_PHONE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
