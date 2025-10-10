import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useClubStore } from '@/store/club';

export default function AdminHeader() {
  const router = useRouter();

  const { resetClub } = useClubStore();
  const curPath = router.pathname;
  const isLoginPage = curPath.endsWith('login');

  const handleLogout = () => {
    resetClub();
    router.push('/login');
  };

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link href={isLoginPage ? '/login' : '/'} className="-ml-3">
          <Image
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
