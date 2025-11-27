'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { Header, NavigationItem } from 'ddingdong-design-system';

import logo from '@/../../public/logo.png';
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
    <Header className="px-6 md:px-2">
      <Link href={isLoginPage ? '/login' : '/'} className="inline-block">
        <OptimizedImage
          src={logo.src}
          width={1544}
          height={380}
          priority
          alt="ddingdong"
          className="w-36"
        />
      </Link>
      {!isLoginPage && (
        <div className="ml-auto">
          <NavigationItem href="/login" onClick={handleLogout}>
            로그아웃
          </NavigationItem>
        </div>
      )}
    </Header>
  );
}
