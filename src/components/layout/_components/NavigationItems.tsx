import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { Accordion, AccordionItem as Item } from 'ddingdong-design-system';

import { navItems } from '@/constants/navItems';

type Props = {
  onItemClick?: () => void;
  isMobile?: boolean;
};

export function NavigationItems({ onItemClick, isMobile = false }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (category: string) => {
    if (category === '동아리피드') {
      window.location.href = navItems[category][0].href;
    } else {
      setOpenDropdown((prev) => (prev === category ? null : category));
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col items-start justify-center">
        {Object.keys(navItems).map((category, index) =>
          category === '동아리피드' ? (
            <div
              key={category}
              className="w-full border-b border-gray-200 px-2 py-4"
            >
              <Link
                href={navItems[category][0].href}
                className="w-full p-4 font-semibold"
                onClick={onItemClick}
              >
                {category}
              </Link>
            </div>
          ) : (
            <Accordion key={index} type="multiple" className="w-full">
              <Item
                value={`item-${index}`}
                trigger={<div className="w-full font-semibold">{category}</div>}
              >
                <ul className="flex list-none flex-col space-y-4">
                  {navItems[category]?.map((item) => (
                    <li key={item.id} className="flex-grow">
                      <Link
                        href={item.href}
                        onClick={onItemClick}
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </Item>
            </Accordion>
          ),
        )}
      </div>
    );
  }

  return (
    <ul className="ml-6 flex items-center space-x-8">
      {Object.keys(navItems).map((category, index) => (
        <li key={index} className="relative">
          {category === '동아리피드' ? (
            <Link
              href={navItems[category][0].href}
              className="inline-block p-3 font-semibold text-gray-500 transition-colors hover:text-blue-500 focus:outline-none"
            >
              {category}
            </Link>
          ) : (
            <div>
              <button
                onClick={() => handleDropdownToggle(category)}
                className="inline-block p-3 font-semibold text-gray-500 transition-colors hover:text-blue-500 focus:outline-none"
              >
                {category}
              </button>
              {openDropdown === category && (
                <ul className="absolute top-full left-1/2 z-50 mt-2 min-w-max -translate-x-1/2 transform rounded-lg bg-white p-3 shadow-lg">
                  {navItems[category]?.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        target={category === 'SNS' ? '_blank' : '_self'}
                        className="flex px-3 py-2 font-semibold text-gray-500 hover:rounded-lg hover:bg-gray-100"
                        onClick={() => setOpenDropdown(null)}
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
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
