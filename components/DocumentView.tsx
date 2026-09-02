import PrintButton from './PrintButton';

/* The brand people recognise, and the name the company is actually registered
   under. They are not the same, and quotes and invoices are exactly the
   documents that have to carry the registered one — a customer checking
   Companies House for "Sigma Shop Fronts Ltd" would find nothing. */
const COMPANY_NAME = 'SIGMA SHOP FRONTS';
const COMPANY_LEGAL = 'Sigma Shopfronts and Shutter Limited';
const COMPANY_NUMBER = '16794487';
const COMPANY_ADDRESS = '4 Thornwood Close, Oldbury, West Midlands, B68 9LX';
const COMPANY_PHONE = '07414 779594';
const COMPANY_EMAIL = 'info@sigmashopfronts.com';
const COMPANY_SITE = 'www.sigmashopfronts.com';
const LOGO_SRC = '/assets/sigma-icon-512.png';

/* Hardcoded — independent of site theme so documents print correctly */
const C = {
  brand:     '#1e3a5f',
  brandAlt:  '#2a4f7a',
  accent:    '#e85d3a',
  accentBg:  '#fef0ec',
  text:      '#1e2332',
  textMuted: '#5a6070',
  border:    '#d1d9e6',
  borderAlt: '#e4eaf2',
  paper:     '#ffffff',
  rowAlt:    '#f5f7fa',
};

interface LineItem { description: string; qty: number; unitPrice: number; isOption?: boolean }
interface DocumentMeta { projectReference?: string; scope?: string; specifications?: string; leadTime?: string; photoDrawing?: string }

interface DocumentData {
  id: string; type: string; number: string;
  customerName: string; customerEmail: string | null; customerPhone: string | null; customerAddress: string | null;
  lineItems: LineItem[]; subtotal: number; vatRate: number; vatAmount: number; total: number;
  notes: string | null; meta: DocumentMeta | null; depositPercent: number | null;
  issueDate: string | Date | null; validUntil: string | Date | null; dueDate: string | Date | null;
  status: string; createdAt: string | Date;
}

function fmt(d: string | Date | null) { return d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null; }
function gbp(n: number) { return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function SpecLines({ text }: { text: string }) {
  return (
    <div style={{ lineHeight: '1.7' }}>
      {text.split('\n').map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height: 6 }} />;
        if (t.endsWith(':')) return <p key={i} style={{ fontWeight: 700, color: C.brand, marginTop: 8 }}>{t}</p>;
        return <p key={i} style={{ paddingLeft: 18, position: 'relative' }}><span style={{ position: 'absolute', left: 4, color: C.accent }}>&bull;</span>{t}</p>;
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

  // Option lines are alternatives to each other, not additions. They stay out
  // of the subtotal and are priced individually below, so a customer choosing
  // between single and double glazing is never shown the sum of both.
  const optionItems = doc.lineItems.filter((li) => li.isOption);
  const baseItems = doc.lineItems.filter((li) => !li.isOption);
  const hasOptions = optionItems.length > 0;
  const optionLetter = (i: number) => String.fromCharCode(65 + i);
  const optionTotal = (li: LineItem) => {
    const net = doc.subtotal + li.qty * li.unitPrice;
    const tax = net * (doc.vatRate / 100);
    return { net, tax, gross: net + tax };
  };
  // With options there is no single VAT figure — each option carries its own,
  // so the aggregate Subtotal/VAT rows are suppressed and VAT is shown against
  // each option instead. The shared-items row only appears if there are any.
  const hasSharedItems = baseItems.length > 0;
  const displayDate = doc.issueDate || doc.createdAt;
  const validityDays = doc.validUntil
    ? Math.max(1, Math.round((new Date(doc.validUntil).getTime() - new Date(displayDate).getTime()) / 86400000))
    : null;

  const intro = isInvoice
    ? 'Thank you for your business. Please find below our invoice for the works carried out at the above premises.'
    : 'Thank you for your enquiry. We are pleased to submit our quotation for the supply and installation works at the above premises as per your request.';

  const terms: string[] = isInvoice
    ? [
        vat ? 'Prices are inclusive of 20% VAT where shown.' : 'No VAT has been applied to this invoice.',
        deposit !== null ? `A deposit of ${doc.depositPercent}% is required to confirm the order.` : 'Payment is due upon completion unless otherwise agreed.',
        'Please use the invoice number as the payment reference.',
        'All work completed by qualified engineers using high-quality materials.',
      ]
    : [
        vat ? 'All prices include 20% VAT as shown.' : 'Prices shown are the full amounts payable.',
        'Additional works not listed will be quoted separately.',
        validityDays ? `Valid for ${validityDays} days from date of issue.` : 'Valid for 15 days from date of issue.',
        'Payment due upon completion unless otherwise agreed.',
        'Work completed by qualified engineers using high-quality materials.',
      ];

  const detailRows = [
    [isInvoice ? 'Invoice No.' : 'Quote No.', doc.number],
    ['Date', fmt(displayDate)],
    ...(!isInvoice && doc.validUntil ? [['Valid Until', fmt(doc.validUntil)]] : []),
    ...(isInvoice && doc.dueDate ? [['Payment Due', fmt(doc.dueDate)]] : []),
    ...(meta.projectReference ? [['Reference', meta.projectReference]] : []),
  ];

  return (
    <div className="min-h-screen py-10 px-4 print:bg-white print:py-0 print:px-0" style={{ background: 'linear-gradient(135deg, #0a1422 0%, #0f1c2e 50%, #081018 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      <div style={{ maxWidth: '210mm', margin: '0 auto' }}>
        {/* Action bar */}
        <div className="no-print flex items-center justify-between mb-5">
          <p style={{ color: '#8b8eb0', fontSize: 13, fontFamily: 'var(--font-heading)' }}>
            {isInvoice ? 'Invoice' : 'Quotation'} &middot; {doc.number}
          </p>
          <PrintButton />
        </div>

        {/* ── Document ── */}
        <div style={{ background: C.paper, fontFamily: '"Plus Jakarta Sans", "Segoe UI", Arial, sans-serif', fontSize: '14px', lineHeight: 1.6, color: C.text, boxShadow: '0 25px 60px rgba(0,0,0,0.5)', borderRadius: 4, overflow: 'hidden' }} className="print:shadow-none print:rounded-none">

          {/* ── Top accent bar ── */}
          <div style={{ height: 5, background: `linear-gradient(90deg, ${C.brand}, ${C.brandAlt}, ${C.accent})` }} />

          {/* ── Header ── */}
          <div style={{ padding: '32px 40px 28px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* The icon now ships as a dark tile with its own rounded
                    corners, so the old 10px radius and border cut across them.
                    Radius matches the artwork and the border is dropped. */}
                <img src={LOGO_SRC} alt="" style={{ width: 56, height: 56, borderRadius: 12 }} />
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 800, color: C.brand, letterSpacing: '0.5px', margin: 0, lineHeight: 1.2 }}>{COMPANY_NAME}</h1>
                  <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{COMPANY_ADDRESS}</p>
                  <p style={{ fontSize: 12, color: C.textMuted }}>{COMPANY_PHONE} &nbsp;&middot;&nbsp; {COMPANY_SITE}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: 36, fontWeight: 800, color: C.brand, margin: 0, lineHeight: 1, letterSpacing: '1px' }}>{title}</h2>
                <div style={{ width: 48, height: 3, background: C.accent, marginTop: 8, marginLeft: 'auto', borderRadius: 2 }} />
              </div>
            </div>
          </div>

          <div style={{ padding: '28px 40px 40px' }}>
            {/* ── Detail strip + Customer ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: C.textMuted, marginBottom: 8 }}>
                  {isInvoice ? 'Billed To' : 'Quote For'}
                </p>
                <div style={{ padding: '14px 16px', borderLeft: `3px solid ${C.accent}`, background: C.rowAlt, borderRadius: '0 6px 6px 0' }}>
                  <p style={{ fontWeight: 700, color: C.brand, fontSize: 15, marginBottom: 2 }}>{doc.customerName}</p>
                  {doc.customerAddress && <p style={{ fontSize: 13, color: C.textMuted }}>{doc.customerAddress}</p>}
                  {doc.customerPhone && <p style={{ fontSize: 13, color: C.textMuted }}>{doc.customerPhone}</p>}
                  {doc.customerEmail && <p style={{ fontSize: 13, color: C.textMuted }}>{doc.customerEmail}</p>}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: C.textMuted, marginBottom: 8 }}>
                  Document Details
                </p>
                <table style={{ fontSize: 13 }}>
                  <tbody>
                    {detailRows.map(([label, val], i) => (
                      <tr key={i}>
                        <td style={{ paddingRight: 16, paddingTop: 3, paddingBottom: 3, fontWeight: 600, color: C.brand, whiteSpace: 'nowrap' }}>{label}</td>
                        <td style={{ paddingTop: 3, paddingBottom: 3, color: C.text }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 28, lineHeight: 1.7 }}>{intro}</p>

            {!isInvoice && meta.scope && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontWeight: 700, color: C.brand, fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scope of Work</p>
                <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.8 }}>
                  {meta.scope.split('\n').filter((l) => l.trim()).map((l, i) => <li key={i} style={{ fontSize: 13, color: C.text }}>{l.trim()}</li>)}
                </ul>
              </div>
            )}

            {!isInvoice && meta.specifications && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontWeight: 700, color: C.brand, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Specifications</p>
                <SpecLines text={meta.specifications} />
              </div>
            )}

            {!isInvoice && meta.photoDrawing && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontWeight: 700, color: C.brand, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Photo / Drawing</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={meta.photoDrawing} alt="Photo / Drawing" style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 6, border: `1px solid ${C.border}` }} />
              </div>
            )}

            {/* ── Line Items Table ── */}
            <table className="doc-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
              <thead>
                <tr>
                  <th style={{ background: C.brand, color: '#fff', padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', width: 44 }}>#</th>
                  <th style={{ background: C.brand, color: '#fff', padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Description</th>
                  <th style={{ background: C.brand, color: '#fff', padding: '10px 14px', textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', width: 60 }}>Qty</th>
                  <th style={{ background: C.brand, color: '#fff', padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', width: 100 }}>Unit Price</th>
                  <th style={{ background: C.brand, color: '#fff', padding: '10px 14px', textAlign: 'right', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', width: 110 }}>{vat ? 'Amount' : 'Total'}</th>
                </tr>
              </thead>
              <tbody>
                {baseItems.map((li, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 1 ? C.rowAlt : C.paper, borderBottom: `1px solid ${C.borderAlt}` }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: C.brand, fontSize: 14 }}>{idx + 1}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <p style={{ fontWeight: 600, color: C.brand, fontSize: 14, margin: 0 }}>{li.description}</p>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', color: C.textMuted }}>{li.qty}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', color: C.textMuted }}>{gbp(li.unitPrice)}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: C.brand, fontSize: 15 }}>{gbp(li.qty * li.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {hasOptions && (
              <div className="doc-keep" style={{ marginTop: 18, marginBottom: 4 }}>
                <p className="doc-heading" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: C.brand, marginBottom: 2 }}>
                  Choose one option
                </p>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 0, marginBottom: 10 }}>
                  These are alternatives — the price below is the full cost for that choice, not an addition.
                </p>
                <table className="doc-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {optionItems.map((li, i) => {
                      const t = optionTotal(li);
                      return (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.borderAlt}` }}>
                          <td style={{ padding: '12px 14px', width: 44, verticalAlign: 'top' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 13, background: C.brand, color: '#fff', fontSize: 13, fontWeight: 700 }}>
                              {optionLetter(i)}
                            </span>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <p style={{ fontWeight: 600, color: C.brand, fontSize: 14, margin: 0 }}>{li.description}</p>
                            {li.qty > 1 && (
                              <p style={{ fontSize: 12, color: C.textMuted, margin: '2px 0 0' }}>
                                {li.qty} × {gbp(li.unitPrice)}
                              </p>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>
                              {gbp(t.net)}{vat ? ` + ${gbp(t.tax)} VAT` : ''}
                            </p>
                            <p style={{ fontSize: 17, fontWeight: 800, color: C.brand, margin: '2px 0 0' }}>
                              {gbp(t.gross)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {!isInvoice && meta.leadTime && (
              <p style={{ margin: '16px 0 24px', fontWeight: 600, color: C.brand, fontSize: 13 }}>
                Lead Time: <span style={{ fontWeight: 400, color: C.text }}>{meta.leadTime}</span>
              </p>
            )}

            {/* ── Totals + Terms ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, marginTop: 24, marginBottom: 32 }}>
              <div>
                <p className="doc-heading" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: C.brand, marginBottom: 8 }}>Terms &amp; Conditions</p>
                <ol style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: C.textMuted, lineHeight: 1.8 }}>
                  {terms.map((t, i) => <li key={i}>{t}</li>)}
                </ol>
                {doc.notes && (
                  <div style={{ marginTop: 12, padding: '10px 12px', background: C.accentBg, borderRadius: 6, fontSize: 12 }}>
                    <p style={{ fontWeight: 700, color: C.brand, marginBottom: 2 }}>Notes</p>
                    <p style={{ color: C.text, whiteSpace: 'pre-wrap' }}>{doc.notes}</p>
                  </div>
                )}
              </div>

              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                {(!hasOptions || hasSharedItems) && (
                  <div className="doc-keep" style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.borderAlt}` }}>
                    <span style={{ fontSize: 13, color: C.textMuted }}>{hasOptions ? 'Included in every option' : 'Subtotal'}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{gbp(doc.subtotal)}</span>
                  </div>
                )}
                {vat && !hasOptions && (
                  <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.borderAlt}` }}>
                    <span style={{ fontSize: 13, color: C.textMuted }}>VAT ({doc.vatRate}%)</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{gbp(doc.vatAmount)}</span>
                  </div>
                )}
                {hasOptions ? (
                  <>
                    {optionItems.map((li, i) => {
                      const t = optionTotal(li);
                      return (
                        <div key={i} style={{ padding: '12px 16px', background: C.brand, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < optionItems.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Option {optionLetter(i)} {vat ? '(inc. VAT)' : ''}
                          </span>
                          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{gbp(t.gross)}</span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                <div style={{ padding: '14px 16px', background: C.brand, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total {vat ? '(Inc. VAT)' : ''}</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{gbp(doc.total)}</span>
                </div>
                )}
                {deposit !== null && balance !== null && (
                  <>
                    <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', background: C.accentBg, borderBottom: `1px solid ${C.borderAlt}` }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.brand }}>{doc.depositPercent}% Deposit</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.brand }}>{gbp(deposit)}</span>
                    </div>
                    <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: C.textMuted }}>{100 - (doc.depositPercent as number)}% Balance</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{gbp(balance)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Closing */}
            <p style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: C.brand, fontStyle: 'italic', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
              {isInvoice ? 'Thank you for your business.' : 'Thank you for the opportunity to quote.'}
            </p>
            <p style={{ textAlign: 'center', fontSize: 12, color: C.textMuted }}>We look forward to working with you.</p>
          </div>

          {/* ── Footer ── */}
          <div style={{ background: C.brand, padding: '14px 40px', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              {COMPANY_LEGAL} &nbsp;&middot;&nbsp; Company No. {COMPANY_NUMBER}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
              {COMPANY_ADDRESS}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
              {COMPANY_PHONE} &nbsp;&middot;&nbsp; {COMPANY_EMAIL} &nbsp;&middot;&nbsp; {COMPANY_SITE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
