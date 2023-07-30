import { useEffect, useRef, useState } from 'react';

function useModal() {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [visible]);

  const toggleModal = () => {
    setVisible((prev) => !prev);
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handleOutsideClick = (e: Event) => {
    const current = modalRef.current;
    if (visible && current && !current.contains(e.target as Node))
      setVisible(false);
  };
  return { visible, modalRef, toggleModal, closeModal, openModal };
}
export default useModal;
