import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isNavActive from '@/utils/isNavActive';
import { MenuBar } from '../common/MenuBar';

const navItems: {
  [key: string]: { id: number; href: string; content?: string }[];
} = {
  '총동아리 연합회': [
    {
      id: 2,
      href: '/notice',
      content: '공지사항',
    },
    {
      id: 3,
      href: '/documents',
      content: '자료실',
    },
    {
      id: 4,
      href: '/faq',
      content: 'FAQ',
    },
  ],

  '동아리 홍보': [
    {
      id: 5,
      href: '/clubs',
    },
  ],
  SNS: [
    {
      id: 6,
      href: '/sns',
      content: '카카오톡',
    },
    {
      id: 7,
      href: '/sns',
      content: '인스타그램',
    },
  ],
};

export default function UserHeader() {
  const [hydrated, setHydrated] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (category: string) => {
    setOpenDropdown((prev) => (prev === category ? null : category));
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <header className="fixed z-20 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
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
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-center text-gray-700 hover:rounded-lg hover:bg-gray-100"
                            onClick={handleLinkClick}
                          >
                            {item.content}
                          </Link>
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
  );
}
