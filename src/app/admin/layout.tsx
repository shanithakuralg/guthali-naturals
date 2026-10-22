import { Providers } from './providers';
import AdminLayoutClient from './AdminLayoutClient';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </Providers>
  );
}
