'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useRef, useEffect } from 'react';

import { Flex, usePortal } from 'ddingdong-design-system';
import { Snowfall } from 'react-snowfall';

import { GameStartModal } from '@/app/pair_game/_components/ui/GameStartModal';

import { AdminHeader } from './AdminHeader';
import Footer from './Footer';
import GameLayout from './GameLayout';
import { UserHeader } from './UserHeader';

type LayoutClientProps = {
  children: React.ReactNode;
  isAdminHost: boolean;
};

export default function Layout({ children, isAdminHost }: LayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = usePortal();

  const shouldShowGameStartModal = pathname === '/' && !isAdminHost;
  const hasOpenedRef = useRef(false);

  const isLoginPage = pathname?.includes('/login');
  const isGamePage = pathname?.startsWith('/pair_game');

  useEffect(() => {
    if (!shouldShowGameStartModal) return;

    if (!hasOpenedRef.current) {
      openModal();
      hasOpenedRef.current = true;
    }
  }, [shouldShowGameStartModal, openModal]);

  if (isGamePage) {
    return <GameLayout>{children}</GameLayout>;
  }

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

      {!isAdminHost && shouldShowGameStartModal && (
        <GameStartModal
          isOpen={isOpen}
          onClose={closeModal}
          onGameStart={() => {
            closeModal();
            router.push('/pair_game');
          }}
        />
      )}
    </>
  );
}
