import { usePathname } from 'next/navigation';

import { Flex } from 'ddingdong-design-system';

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
    <Flex dir="col" justifyContent="between" className="min-h-screen">
      {isAdminPage ? <AdminHeader /> : <UserHeader />}
      <Flex
        as="main"
        dir="col"
        alignItems="center"
        className="w-full bg-white text-gray-800"
      >
        <Flex
          dir="col"
          className="w-full max-w-6xl px-6 pt-22 md:px-16 md:pt-26"
        >
          {children}
        </Flex>
      </Flex>
      {!isLoginPage && <Footer />}
    </Flex>
  );
}
