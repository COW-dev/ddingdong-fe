import { Drawer } from 'ddingdong-design-system';

import { Logo } from './Logo';
import { NavigationItems } from './NavigationItems';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="bg-primary-300 w-full min-w-[300px] px-6 py-4">
        <Logo className="w-32" color="white" />
      </div>
      <NavigationItems onItemClick={onClose} isMobile={true} />
    </Drawer>
  );
}
