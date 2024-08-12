import React from 'react';
import Image from 'next/image';
import Cancel from '@/assets/cancel.svg';
import MiniLogo from '@/assets/miniLogo.svg';

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({ children, isOpen, setIsOpen }: DrawerProps) {
  return (
    <main
      className={
        ' fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out ' +
        (isOpen
          ? 'translate-x-0 opacity-100 transition-opacity duration-500'
          : 'translate-x-full opacity-0 delay-500')
      }
    >
      <section
        className={
          ' delay-400 absolute left-0 top-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className="relative flex h-16 w-full justify-between">
          <header className="flex w-full justify-between bg-blue-600 p-4 text-lg font-bold">
            <Image
              src={MiniLogo}
              width={1544}
              height={380}
              priority
              alt="ddingdong"
              className="w-34"
            />
            <button
              className=""
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Image
                src={Cancel}
                width={24}
                height={24}
                alt="cancel"
                className="h-5"
              />
            </button>
          </header>
        </article>
        {children}
      </section>
    </main>
  );
}