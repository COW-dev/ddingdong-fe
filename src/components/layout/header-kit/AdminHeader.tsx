import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { useCookie } from '@/app/_api/useCookie';
import { useAuthStore } from '@/store/auth';
import { useClubStore } from '@/store/club';

import { Header, NavigationItem } from '../Header';

export default function AdminHeader() {
  const router = useRouter();
  const { resetAuth } = useAuthStore();
  const { resetClub } = useClubStore();
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith('/login');
  const { resetCookie } = useCookie();

  const handleLogout = () => {
    resetAuth();
    resetClub();
    resetCookie();
    router.push('/login');
  };

  return (
    <Header>
      <Link href={isLoginPage ? '/login' : '/'} className="-ml-3">
        <Image
          src="/logo.png"
          width={1544}
          height={380}
          priority
          alt="ddingdong"
          className="w-36 px-4 md:px-0"
        />
      </Link>
      {!isLoginPage && (
        <div className="ml-auto">
          <NavigationItem onClick={handleLogout}>로그아웃</NavigationItem>
        </div>
      )}
    </Header>
  );
}
