'use client';
import Link from 'next/link';

import { usePortal, Icon, Drawer, Flex, Header } from 'ddingdong-design-system';

import { NavigationItems } from './NavigationItems';

export function UserHeader() {
  const { isOpen, openModal, closeModal } = usePortal();

  return (
    <>
      {/* 데스크탑 */}
      <Header className="hidden md:flex">
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="center"
          className="w-full"
        >
          <Link href="/" className="inline-block">
            <img
              src="/logo.png"
              width={1344}
              height={380}
              alt="ddingdong"
              className="w-40 md:w-44"
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
      </Header>

      {/* 모바일 */}
      <Header className="flex md:hidden">
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          className="w-full"
        >
          <Link href="/" className="inline-block">
            <img
              src="/logo.png"
              width={1344}
              height={380}
              alt="ddingdong"
              className="w-32 md:w-44"
            />
          </Link>
          <button
            onClick={openModal}
            type="button"
            aria-label="Open navigation drawer"
          >
            <Icon name="list" size={29} color="black" />
          </button>

          <Drawer isOpen={isOpen} onClose={closeModal}>
            <Flex
              dir="row"
              alignItems="center"
              justifyContent="between"
              className="bg-primary-300 w-[80vw] px-6 py-4 pt-4"
            >
              <Link href="/" className="inline-block">
                <img
                  src="/m_logo.png"
                  width={1344}
                  height={380}
                  alt="ddingdong"
                  className="w-30"
                />
              </Link>

              <Icon
                name="close"
                color="white"
                size={18}
                onClick={closeModal}
                className="cursor-pointer"
              />
            </Flex>

            <NavigationItems onItemClick={closeModal} isMobile />
          </Drawer>
        </Flex>
      </Header>
    </>
  );
}
