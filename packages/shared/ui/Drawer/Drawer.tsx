import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { Portal } from '../Portal';

export type Props = {
  /**
   * The open state of the drawer.
   */
  isOpen: boolean;
  /**
   * The function to call when the drawer is closed.
   */
  onClose: () => void;
} & PropsWithChildren;

const FADE_IN_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const SLIDE_IN_ANIMATION = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 30, stiffness: 260 },
} as const;

export function Drawer({ isOpen, onClose, children }: Props) {
  return (
    <Portal isOpen={isOpen}>
      <motion.div
        key="drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50"
        initial={FADE_IN_ANIMATION.initial}
        animate={FADE_IN_ANIMATION.animate}
        exit={FADE_IN_ANIMATION.exit}
      />
      <div className="fixed top-0 right-0 z-50 h-full">
        <motion.div
          key="drawer-panel"
          className="h-full bg-white shadow-lg"
          initial={SLIDE_IN_ANIMATION.initial}
          animate={SLIDE_IN_ANIMATION.animate}
          exit={SLIDE_IN_ANIMATION.exit}
          transition={SLIDE_IN_ANIMATION.transition}
        >
          {children}
        </motion.div>
      </div>
    </Portal>
  );
}
