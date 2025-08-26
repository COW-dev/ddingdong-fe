'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

export default function ToasterWithMax() {
  const { toasts } = useToasterStore();
  const [toastLimit, setToastLimit] = useState<number>(2);

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= toastLimit)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts, toastLimit]);

  return (
    <>
      <Toaster
        containerStyle={{
          position: 'fixed',
          maxHeight: '0.5rem',
        }}
        toastOptions={{
          style: {
            fontWeight: 600,
            padding: '0.5rem',
          },
        }}
      />
    </>
  );
}
