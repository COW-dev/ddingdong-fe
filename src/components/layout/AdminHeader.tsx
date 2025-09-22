import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { removeToken } from '@/apis';
import { useAuthStore } from '@/store/auth';
import { useClubStore } from '@/store/club';

import { Header, NavigationItem } from './_components/Header';

export default function AdminHeader() {
  const router = useRouter();
  const { resetAuth } = useAuthStore();
  const { resetClub } = useClubStore();
  const curPath = router.pathname;
  const isLoginPage = curPath.endsWith('login');

  const handleLogout = () => {
    removeToken();
    resetAuth();
    resetClub();
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
          className="w-36"
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
