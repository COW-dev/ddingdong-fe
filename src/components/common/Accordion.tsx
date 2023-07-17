import React, { useState } from "react";
import Image from "next/image";
import arrowUp from '@/assets/arrowUp.svg';
import arrowDown from '@/assets/arrowDown.svg';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
  };

export default function Accordion({title, children} :AccordionProps ) {
    const [open, setOpen] = useState<boolean>(true);
  
    const handleOpen = () => {
      setOpen(!open);
    };
    return (
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes=" bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            data-te-collapse-init
            className={`flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400 ${
              open ? 'active' : ''
            }`}
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls="accordion-flush-body-1"
            onClick={handleOpen}
          >
            <span className="text-lg">{title}</span>
            {open ? <Image src={arrowUp} alt=''/> : <Image src={arrowDown} alt=''/> }
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          className={`${open ? 'active' : 'hidden'}`}
          aria-labelledby="accordion-flush-heading-1"
        >
          <div className="border-b border-gray-200 py-5 dark:border-gray-700">
            {children}
          </div>
        </div> 
      </div>
    );
  };