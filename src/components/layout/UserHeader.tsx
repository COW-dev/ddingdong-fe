import Image from 'next/image';
import Link from 'next/link';

import { usePortal, Icon, Drawer, Flex } from 'ddingdong-design-system';

import { Header } from './Header';
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
            <Image
              src="/logo.png"
              width={1544}
              height={380}
              priority
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
      <Header className="z-0 flex md:hidden">
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          className="w-full"
        >
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              width={1544}
              height={380}
              priority
              alt="ddingdong"
              className="w-32"
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
            <div className="bg-primary-300 flex w-[380px] items-center justify-between px-6 py-4 pt-4 sm:w-[510px]">
              <Link href="/" className="inline-block">
                <Image
                  src="/m_logo.png"
                  width={1544}
                  height={380}
                  priority
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
            </div>
            <NavigationItems onItemClick={closeModal} isMobile />
          </Drawer>
        </Flex>
      </Header>
    </>
  );
}
