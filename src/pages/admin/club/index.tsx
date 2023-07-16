import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import { MODAL_TYPE } from '@/components/modal';

import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import type { AdminClub } from '@/types';

export default function Index() {
  const [modal, setModal] = useState(MODAL_TYPE.null);
  const [club, setClub] = useState({
    id: 0,
    name: '',
    category: '',
    score: 0,
  });
  const [cookies] = useCookies(['token']);
  const [clubs, setAdminClubs] = useState<Array<AdminClub>>([]);
  const { data } = useAdminAllClubs(cookies.token);

  useEffect(() => {
    setAdminClubs(data?.data ?? []);
  }, [data]);

  return (
    <>
      <Head>
        <title>띵동 어드민 - 동아리 관리</title>
      </Head>
      <Heading>동아리 관리하기</Heading>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <div
          className="mb-1.5 text-sm font-semibold text-gray-500 md:mb-2 md:text-base"
          onClick={() => setModal(MODAL_TYPE.create)}
        >
          동아리 생성하기
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {clubs
            .sort((a, b) => b.score - a.score)
            .map((club) => (
              <div key={club.id}>
                <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
                  <div className="flex h-full w-full justify-between p-5 md:p-6">
                    <div className="text-lg font-bold md:text-xl">
                      {club.name}
                    </div>
                    <div className="flex items-center">
                      <div className="mx-1 rounded-lg  bg-green-100 p-2 text-sm font-semibold text-green-500">
                        {club.score}
                      </div>
                      <div
                        className="mx-1 rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-500"
                        onClick={() => {
                          setClub({ ...club });
                          setModal(MODAL_TYPE.modify);
                        }}
                      >
                        수정
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <Modal modal={modal} data={club} setModal={setModal} />
      <Toaster
        toastOptions={{
          style: {
            fontWeight: 600,
            padding: '0.75rem 1rem',
            marginTop: '0.5rem',
          },
        }}
      />
    </>
  );
}
