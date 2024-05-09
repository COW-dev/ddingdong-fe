import { useRouter } from 'next/router';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import UserHeader from './UserHeader';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const curPath = router.pathname;
  const isAdminPage = curPath.startsWith('/admin');
  const isLoginPage = curPath.endsWith('/login');

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-between bg-white text-gray-800">
        {isAdminPage ? <AdminHeader /> : <UserHeader />}
        <div className="flex w-full max-w-6xl flex-col px-6 pt-22 md:px-16 md:pt-26">
          {children}
        </div>
        {!isLoginPage && <Footer />}
      </div>
    </>
  );
}
