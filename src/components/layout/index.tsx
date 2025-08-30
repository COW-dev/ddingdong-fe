import { usePathname } from 'next/navigation';

import AdminHeader from './AdminHeader';
import Footer from './Footer';
import UserHeader from './UserHeader';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname.endsWith('/login');

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white text-gray-800">
        {isAdminPage ? <AdminHeader /> : <UserHeader />}
        <div className="flex w-full max-w-6xl flex-col px-6 pt-22 md:px-16 md:pt-26">
          {children}
        </div>
        {!isLoginPage && <Footer />}
      </main>
    </>
  );
}
