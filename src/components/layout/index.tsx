'use client';

import { usePathname } from 'next/navigation';

import { Flex } from 'ddingdong-design-system';

import { AdminHeader } from './AdminHeader';
import Footer from './Footer';
import { UserHeader } from './UserHeader';

type LayoutClientProps = {
  children: React.ReactNode;
  isAdminHost: boolean;
};

export default function Layout({ children, isAdminHost }: LayoutClientProps) {
  const pathname = usePathname();

  const isLoginPage = pathname?.includes('/login');

  return (
    <>
      {isAdminHost ? <AdminHeader /> : <UserHeader />}
      <Flex
        as="main"
        dir="col"
        alignItems="center"
        className="min-h-screen w-full bg-white text-gray-800"
      >
        <Flex
          dir="col"
          className="w-full max-w-6xl px-6 pt-22 md:px-16 md:pt-26"
        >
          {children}
        </Flex>
      </Flex>
      {!isLoginPage && <Footer />}
    </>
  );
}
