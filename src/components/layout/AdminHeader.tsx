import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken } from '@/apis';
import SnowMan from '@/assets/snowman.svg';
import Tree from '@/assets/tree.svg';
import { useAuthStore } from '@/store/auth';

export default function AdminHeader() {
  const router = useRouter();
  const { resetAuth } = useAuthStore();
  const curPath = router.pathname;
  const isLoginPage = curPath.endsWith('login');

  return (
    <header className="fixed z-40 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link
          href={isLoginPage ? '/login' : '/'}
          className="-ml-3 inline-block pb-2"
        >
          <Image
            src={'/christmas_logo.png'}
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
                  <Image
                    src={'/snowman.png'}
                    width={450}
                    height={450}
                    priority
                    className="w-8"
                    alt="snowman"
                  />
                  <Image
                    src={'/tree.png'}
                    width={450}
                    height={450}
                    priority
                    className="w-12 md:w-14"
                    alt="tree"
                  />
                  <button
                    className="rounded-xl p-3 font-semibold text-gray-500 hover:text-blue-500"
                    onClick={() => {
                      removeToken();
                      resetAuth();
                      router.push('/login');
                    }}
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
