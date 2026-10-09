import { business } from '@/lib/business';

/** Phone-width only. Both numbers are real and both reach the firm. */
export default function CallBar() {
  return (
    <div className="callbar no-print">
      <a href={`tel:${business.phones.main.tel}`} data-dial="main">
        Call {business.phones.main.display}
      </a>
      <a href={`https://wa.me/${business.whatsapp}`} data-dial="whatsapp" rel="noopener">
        WhatsApp
      </a>
    </div>
  );
}
