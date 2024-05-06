import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import FixAdminList from '@/components/fix/FixAdminList';
import FixClubList from '@/components/fix/FixClubList';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [{ role }] = useCookies(['role']);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <Head>
        <title>띵동 어드민 - 동아리 관리</title>
      </Head>
      <div>
        <div className=" flex items-center justify-between text-2xl font-bold leading-tight md:flex md:text-3xl">
          <Heading>동아리방 시설보수 신청</Heading>
          {role === ROLE_TYPE.ROLE_CLUB && (
            <Link href="/fix/new">
              <button className=" mt-7 rounded-lg bg-blue-100 px-5 py-2 text-base font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto">
                신청하기
              </button>
            </Link>
          )}
        </div>
        {role === ROLE_TYPE.ROLE_CLUB ? <FixClubList /> : <FixAdminList />}
      </div>
    </>
  );
}
