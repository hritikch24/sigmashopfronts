export const metadata = {
  title: 'Admin | Sigma Shop Fronts',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="admin-light"
      style={{
        ['--color-navy' as string]: '#0f172a',
        ['--color-navy-light' as string]: '#1e293b',
        ['--color-charcoal' as string]: '#1e2533',
        ['--color-gold' as string]: '#00e5ff',
        ['--color-gold-light' as string]: '#62f0ff',
        ['--color-white' as string]: '#ffffff',
        ['--color-grey-50' as string]: '#f8fafc',
        ['--color-grey-100' as string]: '#f1f5f9',
        ['--color-grey-200' as string]: '#e2e8f0',
        ['--color-grey-300' as string]: '#cbd5e1',
        ['--color-grey-400' as string]: '#94a3b8',
        ['--color-grey-500' as string]: '#64748b',
        ['--color-grey-600' as string]: '#475569',
        ['--color-grey-700' as string]: '#334155',
        ['--color-grey-800' as string]: '#1e293b',
        ['--color-grey-900' as string]: '#0f172a',
        backgroundColor: '#f8fafc',
        color: '#1e2533',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
