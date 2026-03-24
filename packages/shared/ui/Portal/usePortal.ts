import { useState } from 'react';

export const usePortal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return {
    isOpen,
    openModal: handleOpen,
    closeModal: handleClose,
  };
};
