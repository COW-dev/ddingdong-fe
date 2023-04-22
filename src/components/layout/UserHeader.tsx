import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isNavActive from '@/utils/isNavActive';

const navItems = [
  {
    id: 1,
    href: '/',
    content: '홈',
  },
  {
    id: 2,
    href: '/notice',
    content: '공지사항',
  },
];

export default function UserHeader() {
  const router = useRouter();
  const curPath = router.pathname;

  return (
    <header className="fixed z-10 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
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
        <nav className="-mr-4">
          <ul className="flex">
            {navItems.map((item) => (
              <li key={item.id} className="mx-1">
                <Link
                  href={item.href}
                  className={`inline-block p-3 font-semibold transition-colors hover:text-blue-500 ${
                    isNavActive(curPath, item.href)
                      ? 'text-blue-500'
                      : 'text-gray-500'
                  }`}
                >
                  {item.content}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
