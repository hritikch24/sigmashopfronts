import Crumbs, { type Crumb } from './Crumbs';

/**
 * The top of every content page: breadcrumb, an optional label, the H1 and the
 * answer-first paragraph. Set on the drawing-grid ground.
 */
export default function PageHead({
  trail,
  label,
  title,
  lede,
  children,
}: {
  trail: Crumb[];
  label?: React.ReactNode;
  title: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="paper-grid">
      <div className="frame" style={{ paddingBlock: 'clamp(1.75rem, 1.2rem + 3vw, 3.5rem)' }}>
        <Crumbs trail={trail} />
        {label && <p className="sheet-label">{label}</p>}
        <h1 style={{ marginTop: label ? '0.5rem' : '0.9rem', maxWidth: '22ch' }}>{title}</h1>
        {lede && (
          <p className="lede measure" style={{ marginTop: '1rem' }}>
            {lede}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
