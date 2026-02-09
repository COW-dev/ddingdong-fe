'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useRef, useLayoutEffect } from 'react';

import { Flex, usePortal } from 'ddingdong-design-system';
import { Snowfall } from 'react-snowfall';

import { GameStartModal } from '@/app/pair_game/_components/ui';

import { AdminHeader } from './AdminHeader';
import Footer from './Footer';
import { UserHeader } from './UserHeader';

type LayoutClientProps = {
  children: React.ReactNode;
  isAdminHost: boolean;
};

export default function Layout({ children, isAdminHost }: LayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, openModal, closeModal } = usePortal();

  const shouldShowGameStartModal = pathname === '/' && !isAdminHost;
  const hasOpenedRef = useRef(false);

  const isLoginPage = pathname?.includes('/login');
  const isGamePage = pathname?.startsWith('/pair_game');
  const isGameSubmitStep = isGamePage && searchParams.get('step') === 'submit';

  useLayoutEffect(() => {
    if (!shouldShowGameStartModal) return;

    if (!hasOpenedRef.current) {
      openModal();
      hasOpenedRef.current = true;
    }
  }, [shouldShowGameStartModal, openModal]);

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
        className="min-h-screen w-full text-gray-800"
        style={{
          backgroundColor: isGameSubmitStep
            ? 'white'
            : isGamePage
              ? '#FEFCFD'
              : 'white',
        }}
      >
        <Flex
          dir="col"
          className="w-full max-w-6xl px-6 pt-22 md:px-16 md:pt-26"
        >
          {children}
        </Flex>
      </Flex>

      {!isLoginPage && !isGamePage && <Footer />}

      {!isAdminHost && (
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
