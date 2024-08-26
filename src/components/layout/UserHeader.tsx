import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuButton from '@/assets/smMenu.svg';
import Drawer from '@/components/common/Drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navItems } from '@/constants/navItems';

export default function UserHeader() {
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (category: string) => {
    setOpenDropdown((prev) => (prev === category ? null : category));
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  const element = () => {
    return (
      <div className="flex w-full items-center justify-between px-6">
        <Link href="/" className="inline-block p-3">
          <Image
            src={'/logo.png'}
            width={1544}
            height={380}
            priority
            alt="ddingdong"
            className="w-30 md:w-34"
          />
        </Link>
        <button className="p-3" onClick={() => handleOpenDrawer()}>
          <Image
            src={MenuButton}
            width={24}
            height={24}
            alt="menu"
            className="h-5"
          />
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="flex flex-col items-start justify-center p-3">
            {Object.entries(navItems).map(([category, items]) => (
              <Accordion
                key={category}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${category}`}>
                  <AccordionTrigger>
                    <span>{category}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex list-none flex-col space-y-2 pl-0">
                      {items.map((item) => (
                        <li key={item.id} className="flex-grow">
                          <a
                            href={item.href}
                            target={category === 'SNS' ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="text-md flex items-center font-semibold text-gray-500 hover:text-blue-500"
                          >
                            {item.image && (
                              <Image
                                src={item.image}
                                width={24}
                                height={24}
                                alt="icon"
                                className="mr-2"
                              />
                            )}
                            {item.content}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </Drawer>
      </div>
    );
  };
  return (
    <>
      {/* md */}
      <header className=" fixed z-20 hidden h-16 w-full items-center justify-center border-b bg-white md:flex md:h-18">
        <div className="flex w-full max-w-6xl items-center px-6 md:px-16">
          <Link href="/" className="-ml-3 inline-block p-3">
            <Image
              src={'/logo.png'}
              width={1544}
              height={380}
              priority
              alt="ddingdong"
              className="w-30 md:w-34"
            />
          </Link>
          <ul className="ml-6 flex space-x-8">
            {Object.keys(navItems).map((category) => (
              <li key={category} className="relative">
                {category === '동아리 홍보' ? (
                  <Link
                    href={navItems[category][0].href}
                    className="inline-block p-3 font-semibold text-gray-500 transition-colors hover:text-blue-500 focus:outline-none"
                  >
                    {category}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(category)}
                      className="inline-block p-3 font-semibold text-gray-500 transition-colors hover:text-blue-500 focus:outline-none"
                    >
                      {category}
                    </button>
                    {openDropdown === category && (
                      <ul className="absolute left-1/2 top-full mt-2 min-w-max -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                        {navItems[category]?.map((item) => (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              target={category === 'SNS' ? '_blank' : '_self'}
                              rel={
                                category === 'SNS'
                                  ? 'noopener noreferrer'
                                  : undefined
                              }
                              className={`flex px-3 py-2 font-semibold text-gray-500 hover:rounded-lg hover:bg-gray-100 ${
                                category === '총동아리 연합회' &&
                                'justify-center'
                              }`}
                              onClick={handleLinkClick}
                            >
                              {item.image && (
                                <Image
                                  src={item.image}
                                  width={24}
                                  height={24}
                                  alt="icon"
                                  className="mr-2 h-6 w-6"
                                />
                              )}
                              {item.content}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </header>
      {/* md 끗 */}

      {/* sm */}
      <header className="fixed z-20 flex h-16 w-full items-center justify-center border-b bg-white md:hidden">
        {element()}
      </header>
      {/* sm 끗 */}
    </>
  );
}
