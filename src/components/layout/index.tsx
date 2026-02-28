// components/layout/LayoutClient.tsx

'use client';

import { usePathname } from 'next/navigation';

import { Flex } from 'ddingdong-design-system';
import { Snowfall } from 'react-snowfall';

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
      <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
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
