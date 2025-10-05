import Image from 'next/image';
import Link from 'next/link';

import { usePortal, Icon, Drawer, Flex } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

import { NavigationItems } from './NavigationItems';

export function UserHeader() {
  const { isOpen, openModal, closeModal } = usePortal();

  const headerBase =
    'fixed w-full items-center justify-center border-b border-gray-200 bg-white';

  const headerDesktop = 'z-20 hidden h-16 md:flex md:h-18';
  const containerDesktop = 'max-w-6xl md:px-16';
  const logoDesktop = 'w-40 md:w-44';

  const headerMobile = 'flex h-16 md:hidden';
  const logoMobile = 'w-35 md:w-44';

  return (
    <>
      {/* 데스크탑 */}
      <header className={cn(headerBase, headerDesktop)}>
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="center"
          className={cn(containerDesktop, 'w-full')}
        >
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              width={1544}
              height={380}
              priority
              alt="ddingdong"
              className={logoDesktop}
            />
          </Link>
          <Flex
            dir="row"
            alignItems="center"
            justifyContent="between"
            className="h-full w-full pl-6"
          >
            <NavigationItems />
          </Flex>
        </Flex>
      </header>

      {/* 모바일 */}
      <header className={cn(headerBase, headerMobile)}>
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          className="w-full px-6"
        >
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              width={1544}
              height={380}
              priority
              alt="ddingdong"
              className={logoMobile}
            />
          </Link>
          <button onClick={openModal} aria-label="Open navigation drawer">
            <Icon name="list" />
          </button>

          <Drawer isOpen={isOpen} onClose={closeModal}>
            <div className="bg-primary-300 w-full min-w-[300px] px-6 py-4 pt-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/m_logo.png"
                  width={1544}
                  height={380}
                  priority
                  alt="ddingdong"
                  className="w-30 md:w-44"
                />
              </Link>
            </div>
            <NavigationItems onItemClick={closeModal} isMobile />
          </Drawer>
        </Flex>
      </header>
    </>
  );
}
