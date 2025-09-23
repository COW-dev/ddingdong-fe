import { usePortal, Icon, Drawer } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

import { Logo } from './Logo';
import { NavigationItems } from './NavigationItems';

export function UserHeader() {
  const { isOpen, openModal, closeModal } = usePortal();

  const headerBase =
    'fixed w-full items-center justify-center border-b border-gray-200 bg-white';
  const containerBase = 'flex w-full items-center px-6';
  const logoBase = '';

  const headerDesktop = 'z-20 hidden h-16 md:flex md:h-18';
  const containerDesktop = 'max-w-6xl md:px-16';
  const logoDesktop = 'w-40 md:w-44';

  const headerMobile = 'flex h-16 md:hidden';
  const containerMobile = 'justify-between';
  const logoMobile = 'w-35 md:w-44';

  return (
    <>
      {/* 데스크탑 */}
      <header className={cn(headerBase, headerDesktop)}>
        <div
          className={cn(
            containerBase,
            containerDesktop,
            'w-full justify-center',
          )}
        >
          <Logo className={cn(logoBase, logoDesktop)} />
          <div className="flex h-full w-full justify-between pl-6">
            <NavigationItems />
          </div>
        </div>
      </header>

      {/* 모바일 */}
      <header className={cn(headerBase, headerMobile)}>
        <div className={cn(containerBase, containerMobile)}>
          <Logo className={cn(logoBase, logoMobile)} />
          <button onClick={openModal} aria-label="Open navigation drawer">
            <Icon name="list" />
          </button>

          <Drawer isOpen={isOpen} onClose={closeModal}>
            <div className="bg-primary-300 w-full min-w-[300px] px-6 py-4 pt-6">
              <Logo className="w-30 md:w-44" color="white" />
            </div>
            <NavigationItems onItemClick={closeModal} isMobile />
          </Drawer>
        </div>
      </header>
    </>
  );
}
