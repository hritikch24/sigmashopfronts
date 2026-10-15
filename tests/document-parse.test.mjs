/**
 * Plain-English quote/invoice parser. Run: node tests/document-parse.test.mjs
 * (Node strips the types from the imported .ts module; it has no imports.)
 */
import { groundDraft, mergeDrafts, missingRequired, ruleParse } from '../lib/document-parse.ts';

let failed = 0;
function eq(label, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log(`${ok ? '✓' : '✗'} ${label}${ok ? '' : `\n    got:  ${JSON.stringify(got)}\n    want: ${JSON.stringify(want)}`}`);
}

// The owner's own phrasing.
const s1 = 'build a invoice for user name hritik email is hritik@example.com number is 07123 456789 and job description is replace shutter motor, price 450';
const r1 = ruleParse(s1, 'quote');
eq('type from the sentence', r1.type, 'invoice');
eq('name', r1.customerName, 'Hritik');
eq('email', r1.customerEmail, 'hritik@example.com');
eq('phone', r1.customerPhone, '07123 456789');
eq('line item', r1.lineItems, [{ description: 'Replace shutter motor', qty: 1, unitPrice: 450 }]);
eq('nothing else invented', [r1.customerAddress, r1.depositPercent, r1.dueInDays, r1.notes, r1.vatRate], [undefined, undefined, undefined, undefined, 0]);
eq('complete', missingRequired(r1), []);

const s2 = 'quote for customer John Smith, £1,250 for new aluminium shopfront plus VAT, address 12 High Street Leicester LE1 2AB';
const r2 = ruleParse(s2, 'invoice');
eq('quote type', r2.type, 'quote');
eq('two-word name', r2.customerName, 'John Smith');
eq('£ with comma, VAT added', [r2.lineItems[0]?.unitPrice, r2.vatRate], [1250, 20]);
eq('address', r2.customerAddress, '12 High Street Leicester LE1 2AB');

const r3 = ruleParse('invoice for Sam, price 120 inc vat, 30% deposit, due in 14 days', 'quote');
eq('VAT-inclusive price stored net', [r3.lineItems[0]?.unitPrice, r3.vatRate], [100, 20]);
eq('deposit and due days', [r3.depositPercent, r3.dueInDays], [30, 14]);

eq('price missing is reported', missingRequired(ruleParse('invoice for name hritik email a@b.co', 'invoice')), ['price']);
eq('name missing is reported', missingRequired(ruleParse('invoice price 300 for shutter repair', 'invoice')), ['customer name']);
eq('bare name after "invoice for"', ruleParse('invoice for hritik email h@x.com price 50', 'quote').customerName, 'Hritik');
eq('a job after "invoice for" is not a name', ruleParse('invoice for the shutter repair price 300', 'quote').customerName, undefined);
eq('falls back to the open tab', ruleParse('name Ali price 90', 'quote').type, 'quote');
eq('phone digits not read as price', ruleParse('invoice name Ali phone 07123456789', 'invoice').lineItems, []);

// The guard on the AI reading.
const g = groundDraft(
  {
    customerName: 'Hritik Sharma', // surname invented
    customerEmail: 'hritik@example.com',
    customerPhone: '07123 456780', // one digit wrong
    lineItems: [
      { description: 'Replace shutter motor', qty: 1, unitPrice: 450 },
      { description: 'Call-out fee', qty: 1, unitPrice: 80 }, // price never typed
    ],
    customerAddress: '5 Made Up Lane, Leeds', // not in the sentence
    depositPercent: 50, // not typed
  },
  s1,
  'quote',
);
eq('invented surname dropped', g.customerName, undefined);
eq('typed email kept', g.customerEmail, 'hritik@example.com');
eq('wrong phone dropped', g.customerPhone, undefined);
eq('untyped price dropped', g.lineItems, [{ description: 'Replace shutter motor', qty: 1, unitPrice: 450 }]);
eq('invented address and deposit dropped', [g.customerAddress, g.depositPercent], [undefined, undefined]);
const m = mergeDrafts(g, r1);
eq('rules fill what the guard dropped', [m.customerName, m.customerPhone], ['Hritik', '07123 456789']);

const multi = 'invoice to Mr Patel: 2 x shutter motors at £300 each, and labour £150';
const gm = groundDraft({ customerName: 'Patel', lineItems: [{ description: 'Shutter motors', qty: 2, unitPrice: 300 }, { description: 'Labour', qty: 1, unitPrice: 150 }] }, multi, 'quote');
eq('several typed items kept', gm.lineItems.map((li) => [li.qty, li.unitPrice]), [[2, 300], [1, 150]]);
eq('AI garbage gives an empty draft', missingRequired(groundDraft('nonsense', s1, 'quote')), ['customer name', 'price']);

// Proformas, and the way speech comes back from transcription.
const spoken = 'Proforma invoice for Royal Way Belton Park Loughborough. Supply and fit: one aluminium double door with fixed glass panels, a letter box and cladding, six thousand, £6,630 plus VAT, 40 percent deposit.';
const rp = ruleParse(spoken, 'invoice');
eq('proforma named in the sentence', rp.type, 'proforma');
eq('"proforma invoice" is not an invoice', ruleParse('proforma invoice for Sam, price 100', 'quote').type, 'proforma');
eq('name after "proforma for"', ruleParse('Proforma for Royal Way, price £100', 'quote').customerName, 'Royal Way');
eq('spoken percent deposit', rp.depositPercent, 40);
eq('price and VAT from speech', [rp.lineItems[0]?.unitPrice, rp.vatRate], [6630, 20]);
const gp = groundDraft(
  { customerName: 'Royal Way', lineItems: [{ description: 'Supply and fit\n• one aluminium double door with fixed glass panels\n• a letter box\n• cladding', qty: 1, unitPrice: 6630 }] },
  spoken,
  'invoice',
);
eq('bulleted components kept as one priced line', [gp.lineItems.length, gp.lineItems[0]?.description.split('\n').length], [1, 4]);

console.log(failed ? `\n${failed} failed` : '\nAll passed');
process.exit(failed ? 1 : 0);
