import { useEffect, useRef, useState } from 'react';

export const useTooltip = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  useEffect(() => {
    if (ref.current && open) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left + rect.width / 2 });
    }
  }, [open]);

  return {
    open,
    ref,
    show,
    hide,
    position,
  };
};
