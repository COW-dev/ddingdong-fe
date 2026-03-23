import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  /**
   * Controls whether the portal is open or closed.
   */
  isOpen: boolean;
  /**
   * The content to render inside the portal.
   */
  children: React.ReactNode;
};
export function Portal({ isOpen, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(<AnimatePresence>{isOpen && children}</AnimatePresence>, document.body)
    : null;
}
