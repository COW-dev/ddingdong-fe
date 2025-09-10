import { usePortal, Icon, Drawer } from 'ddingdong-design-system';

import { Logo } from './Logo';
import { NavigationItems } from './NavigationItems';

export function UserHeader() {
  const { isOpen, openModal, closeModal } = usePortal();

  return (
    <>
      <header className="fixed z-20 hidden h-16 w-full items-center justify-center border-b border-gray-200 bg-white md:flex md:h-18">
        <div className="flex w-full max-w-6xl items-center px-6 md:px-16">
          <Logo className="w-40 md:w-44" />
          <div className="flex h-full w-full justify-between pl-6">
            <NavigationItems />
          </div>
        </div>
      </header>

      <header className="fixed flex h-16 w-full items-center justify-center border-b border-gray-200 bg-white md:hidden">
        <div className="flex w-full items-center justify-between px-6">
          <Logo className="w-35 md:w-44" />
          <button onClick={openModal}>
            <Icon name="list" />
          </button>
          <Drawer isOpen={isOpen} onClose={closeModal}>
            <div className="bg-primary-300 w-full min-w-[300px] px-6 py-4 pt-6">
              <Logo className="w-30 md:w-44" color="white" />
            </div>
            <NavigationItems onItemClick={closeModal} isMobile={true} />
          </Drawer>
        </div>
      </header>
    </>
  );
}
