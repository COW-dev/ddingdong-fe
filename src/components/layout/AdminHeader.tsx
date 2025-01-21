import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken } from '@/apis';
import { useAuthStore } from '@/store/auth';
import { useClubStore } from '@/store/club';
import NewYear from '../common/NewYear';

export default function AdminHeader() {
  const router = useRouter();
  const { resetAuth } = useAuthStore();
  const { resetClub } = useClubStore();
  const curPath = router.pathname;
  const isLoginPage = curPath.endsWith('login');

  const handelLogout = () => {
    removeToken();
    resetAuth();
    resetClub();
    router.push('/login');
  };

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link
          href={isLoginPage ? '/login' : '/'}
          className="-ml-3 inline-block pb-2"
        >
          <Image
            src={'/new-year-logo.png'}
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
                  <NewYear />
                  <button
                    className="rounded-xl p-3 font-semibold text-gray-500 hover:text-blue-500"
                    onClick={handelLogout}
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
