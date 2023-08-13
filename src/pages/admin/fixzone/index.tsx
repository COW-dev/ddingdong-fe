import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import FixAdminList from '@/components/fixzone/FixAdminList';
import FixClubList from '@/components/fixzone/FixClubList';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [{ role }] = useCookies(['role']);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  return (
    <div className="p-5">
      <div className="mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="md:mr-1.5">Fix:Zone 동아리방 시설보수</div>
        {role === ROLE_TYPE.ROLE_CLUB && (
          <button className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5">
            요청하기
          </button>
        )}
      </div>
      {role === ROLE_TYPE.ROLE_CLUB ? <FixClubList /> : <FixAdminList />}
    </div>
  );
}
