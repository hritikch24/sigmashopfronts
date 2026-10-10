import { business } from '@/lib/business';
import { whatsappLink } from '@/lib/quick-line';

/**
 * Always in reach. Phone width: a bar with call, WhatsApp and the one-line
 * message box (#reach is at the foot of every page). Desktop: a WhatsApp pill.
 */
export default function CallBar() {
  return (
    <>
      <div className="callbar no-print">
        <a href={`tel:${business.phones.main.tel}`} data-dial="main">
          Call
        </a>
        <a href={whatsappLink(business.whatsapp)} data-dial="whatsapp" rel="noopener" className="callbar__wa">
          WhatsApp
        </a>
        <a href="#reach">Message</a>
      </div>
      <a href={whatsappLink(business.whatsapp)} data-dial="whatsapp" rel="noopener" className="wa-pill no-print">
        WhatsApp {business.phones.second.display}
      </a>
    </>
  );
}
