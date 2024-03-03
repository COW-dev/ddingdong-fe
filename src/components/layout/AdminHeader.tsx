import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { removeToken } from '@/apis';
import { useAuthStore } from '@/store/auth';
import isNavActive from '@/utils/isNavActive';

const navItems = [
  {
    id: 1,
    href: '/',
    content: '홈',
  },
  {
    id: 2,
    href: '/event',
    content: '동아리박람회',
  },
];

export default function AdminHeader() {
  const router = useRouter();
  const { resetAuth } = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['token', 'role']);
  const curPath = router.pathname;
  const isLoginPage = curPath.endsWith('login');

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link
          href={isLoginPage ? '/login' : '/'}
          className="-ml-3 inline-block p-3"
        >
          <Image
            src={'/logo.png'}
            width={1544}
            height={380}
            priority
            alt="ddingdong"
            className="w-30 md:w-34"
          />
        </Link>
        {!isLoginPage && (
          <nav className="-mr-4 md:block">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={` mx-1 md:visible ${item.id === 1 && 'invisible'}`}
                >
                  <Link
                    href={item.href}
                    className={`font-semibold transition-colors hover:text-pink-300 md:inline-block md:p-3 ${
                      isNavActive(curPath, item.href)
                        ? 'text-pink-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.content}
                  </Link>
                </li>
              ))}
              <li className="mx-1">
                <button
                  className="rounded-xl p-3 font-semibold text-gray-500 hover:text-pink-300 "
                  onClick={() => {
                    removeToken();
                    resetAuth();
                    router.push('/login');
                  }}
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
