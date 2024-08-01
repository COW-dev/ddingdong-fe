import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InstaImage from '@/assets/InstaImage.svg';
import KaKaoImage from '@/assets/kakaoImage.svg';

const navItems: {
  [key: string]: {
    id: number;
    href: string;
    image?: string;
    content?: string;
  }[];
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

  // '동아리 홍보': [
  //   {
  //     id: 5,
  //     href: '/clubs',
  //   },
  // ],
  SNS: [
    {
      id: 6,
      href: 'https://pf.kakao.com/_ExmtkG',
      image: KaKaoImage,
      content: '카카오톡',
    },
    {
      id: 7,
      href: 'https://www.instagram.com/mju_u.th/',
      image: InstaImage,
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
                          <a
                            href={item.href}
                            target={category === 'SNS' ? '_blank' : '_self'}
                            rel={
                              category === 'SNS'
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className={`flex px-3 py-2 font-semibold text-gray-500 hover:rounded-lg hover:bg-gray-100 ${
                              category === '총동아리 연합회' && 'justify-center'
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
  );
}
