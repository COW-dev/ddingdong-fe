
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { Header, NavigationItem } from 'ddingdong-design-system';

import { useCookie } from '@/app/_api/useCookie';
import { useClubStore } from '@/store/club';

import { OptimizedImage } from '../common/OptimizedImage';

export function AdminHeader() {
  const router = useRouter();

  const { resetClub } = useClubStore();
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith('/login');
  const { resetCookie } = useCookie();

  const handleLogout = () => {
    resetClub();
    resetCookie();
    router.push('/login');
  };

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link href={isLoginPage ? '/login' : '/'} className="-ml-3">
          <OptimizedImage
            src="/logo.png"
            width={1544}
            height={380}
            priority
            alt="ddingdong"
            className="w-36"
          />
        </Link>
        {!isLoginPage && (
          <nav className="-mr-4 md:block">
            <ul className="flex">
              <li>
                <div className="flex w-full items-end">
                  <button
                    className="rounded-xl p-3 font-semibold text-gray-500 hover:text-blue-500"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
