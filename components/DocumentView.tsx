import PrintButton from './PrintButton';

const COMPANY_NAME = 'Sigma Shop Fronts Ltd';
const COMPANY_ADDRESS = '4 Thornwood Close, Oldbury, West Midlands, B68 9LX';
const COMPANY_PHONE = '07414 779594';

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
  validUntil: string | Date | null;
  dueDate: string | Date | null;
  status: string;
  createdAt: string | Date;
}

function formatDate(d: string | Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DocumentView({ doc }: { doc: DocumentData }) {
  const isInvoice = doc.type === 'invoice';
  const label = isInvoice ? 'INVOICE' : 'QUOTE';
  const dateLabel = isInvoice ? 'Due Date' : 'Valid Until';
  const dateValue = isInvoice ? formatDate(doc.dueDate) : formatDate(doc.validUntil);

  return (
    <div className="min-h-screen bg-grey-50 py-8 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="no-print flex justify-end mb-4">
          <PrintButton />
        </div>

        <div className="bg-white rounded-2xl shadow-lg print:shadow-none print:rounded-none p-8 sm:p-12">
          <div className="flex items-start justify-between border-b border-grey-100 pb-6 mb-6">
            <div>
              <h1 className="font-heading text-xl font-bold text-navy">{COMPANY_NAME}</h1>
              <p className="text-xs text-grey-500 mt-1 leading-relaxed">{COMPANY_ADDRESS}</p>
              <p className="text-xs text-grey-500">{COMPANY_PHONE}</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-2xl font-extrabold text-gold tracking-wide">{label}</p>
              <p className="text-sm text-charcoal font-semibold mt-1">{doc.number}</p>
              <p className="text-xs text-grey-400 mt-1">{formatDate(doc.createdAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[11px] font-semibold text-grey-400 uppercase tracking-wider mb-1">Bill To</p>
              <p className="text-sm font-semibold text-navy">{doc.customerName}</p>
              {doc.customerAddress && <p className="text-xs text-grey-500 mt-0.5">{doc.customerAddress}</p>}
              {doc.customerPhone && <p className="text-xs text-grey-500">{doc.customerPhone}</p>}
              {doc.customerEmail && <p className="text-xs text-grey-500">{doc.customerEmail}</p>}
            </div>
            {dateValue && (
              <div className="text-right">
                <p className="text-[11px] font-semibold text-grey-400 uppercase tracking-wider mb-1">{dateLabel}</p>
                <p className="text-sm text-charcoal">{dateValue}</p>
              </div>
            )}
          </div>

          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b-2 border-navy/10">
                <th className="py-2 text-[11px] font-semibold text-grey-400 uppercase tracking-wider">Description</th>
                <th className="py-2 text-[11px] font-semibold text-grey-400 uppercase tracking-wider text-right w-16">Qty</th>
                <th className="py-2 text-[11px] font-semibold text-grey-400 uppercase tracking-wider text-right w-24">Unit Price</th>
                <th className="py-2 text-[11px] font-semibold text-grey-400 uppercase tracking-wider text-right w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {doc.lineItems.map((li, idx) => (
                <tr key={idx} className="border-b border-grey-100">
                  <td className="py-3 text-sm text-charcoal">{li.description}</td>
                  <td className="py-3 text-sm text-charcoal text-right">{li.qty}</td>
                  <td className="py-3 text-sm text-charcoal text-right">£{li.unitPrice.toFixed(2)}</td>
                  <td className="py-3 text-sm text-charcoal text-right">£{(li.qty * li.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-full max-w-xs space-y-1.5">
              <div className="flex justify-between text-sm text-grey-500">
                <span>Subtotal</span>
                <span>£{doc.subtotal.toFixed(2)}</span>
              </div>
              {doc.vatRate > 0 && (
                <div className="flex justify-between text-sm text-grey-500">
                  <span>VAT ({doc.vatRate}%)</span>
                  <span>£{doc.vatAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-heading font-bold text-navy pt-1.5 border-t border-grey-200">
                <span>Total</span>
                <span>£{doc.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {doc.notes && (
            <div className="border-t border-grey-100 pt-4">
              <p className="text-[11px] font-semibold text-grey-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-charcoal whitespace-pre-wrap leading-relaxed">{doc.notes}</p>
            </div>
          )}

          <div className="mt-10 pt-4 border-t border-grey-100 text-center">
            <p className="text-xs text-grey-400">
              {isInvoice ? 'Thank you for your business.' : 'This quote is indicative and subject to a final site survey.'} Questions? Call {COMPANY_PHONE}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
