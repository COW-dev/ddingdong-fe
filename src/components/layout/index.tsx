import { Flex } from 'ddingdong-design-system';

import { AdminHeader } from './AdminHeader';
import Footer from './Footer';
import { UserHeader } from './UserHeader';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const sub = host.split('.')[0];
  const isAdminHost = sub === 'admin';

  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const isLoginPage = path.endsWith('/login');

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
