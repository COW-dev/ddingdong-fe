import React, { useState } from 'react';
import Image from 'next/image';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import { cn } from '../ui/utils';

type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  visible?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
};

export default function Accordion({
  title,
  children,
  className,
  visible,
  onToggle,
}: AccordionProps) {
  const [open, setOpen] = useState<boolean>(visible ?? true);

  const handleOpen = () => {
    setOpen(!open);
    onToggle?.(!open);
  };
  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900"
      data-inactive-classes="text-gray-500 "
    >
      <h2 id="accordion-flush-heading-1" className="sticky top-0 bg-white p-4">
        <button
          type="button"
          data-te-collapse-init
          className={cn(
            `flex w-full items-center justify-between border-b border-gray-200 text-left font-medium text-gray-500 ${
              open ? 'active' : ''
            }`,
            className,
          )}
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="accordion-flush-body-1"
          onClick={handleOpen}
        >
          <span className="text-lg text-black">{title}</span>
          {open ? (
            <Image src={ArrowUp} alt="화살표" width={15} height={15} />
          ) : (
            <Image src={ArrowDown} alt="화살표" width={15} height={15} />
          )}
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`${open ? 'active' : 'hidden'}`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="mx-2 py-5">{children}</div>
      </div>
    </div>
  );
}
