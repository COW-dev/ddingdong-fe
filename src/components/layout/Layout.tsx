import Footer from './Footer';
import { UserHeader } from './header-kit';
import AdminHeader from './header-kit/AdminHeader';

type LayoutProps = { children: React.ReactNode };

export function Layout({ children }: LayoutProps) {
  const host = window.location.hostname;
  const sub = host.split('.')[0];
  const isAdminHost = sub === 'admin';

  const path = window.location.pathname;
  const isLoginPage = path.endsWith('/login');

  return (
    <>
      {isAdminHost ? <AdminHeader /> : <UserHeader />}
      <main className="flex min-h-screen w-full flex-col items-center bg-white text-gray-800">
        <div className="flex w-full max-w-6xl flex-col px-6 pt-22 md:px-16 md:pt-26">
          {children}
        </div>
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}
