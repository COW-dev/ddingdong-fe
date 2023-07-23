import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import Admin from '@/assets/admin.jpg';
import Create from '@/assets/create.svg';
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

      <div className="flex flex-row items-end justify-between">
        <Heading>동아리 관리하기</Heading>
        <div
          className="-mr-3 inline-block p-2 opacity-40 transition-opacity hover:opacity-70 sm:hidden "
          onClick={() => setModal(MODAL_TYPE.createClub)}
        >
          <Image
            src={Create}
            width={100}
            height={100}
            alt="create"
            className="w-8"
          />
        </div>
        <div
          className={`-mb-0.5 hidden rounded-xl bg-blue-100 px-4 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base`}
          onClick={() => setModal(MODAL_TYPE.createClub)}
        >
          동아리 생성하기
        </div>
      </div>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {clubs
            .sort((a, b) => b.score - a.score)
            .map((club) => (
              <div key={club.id}>
                <div
                  className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50"
                  onClick={() => {
                    setClub({ ...club });
                    setModal(MODAL_TYPE.modifyClub);
                  }}
                >
                  <div className=" flex h-full w-full justify-around p-5 md:p-6">
                    <div className="h-20 w-20  overflow-hidden rounded-full border-[1.5px] border-gray-100">
                      <Image
                        src={Admin}
                        width={80}
                        height={80}
                        alt="admin"
                        className="opacity-50"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                      <div className="text-lg font-bold md:text-xl">
                        {club.name}
                      </div>
                      <div className="mx-1 rounded-lg bg-indigo-100 p-2 px-4 text-sm font-semibold text-indigo-500">
                        {club.score}
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
