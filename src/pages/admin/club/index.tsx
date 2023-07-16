import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import CreateModal from '@/components/modal/CreateClub';
import ModifyModal from '@/components/modal/ModifyClub';
import { useAdminAllClubs } from '@/hooks/useAdminAllClubs';
import type { AdminClub } from '@/types';

export default function Index() {
  const [createModal, setCreateModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [score, setScore] = useState(0);
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
          onClick={() => setCreateModal(true)}
        >
          동아리 생성하기
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {clubs
            .sort((a, b) => b.score - a.score)
            .map((club) => (
              <>
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
                          setScore(club.score);
                          setModifyModal(true);
                        }}
                      >
                        수정
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </ul>
      </div>
      <Modal
        title="동아리 생성하기"
        show={createModal}
        setShowModal={setCreateModal}
      >
        <CreateModal setShowModal={setCreateModal} />
      </Modal>
      <Modal
        title="동아리 수정하기"
        show={modifyModal}
        setShowModal={setModifyModal}
      >
        <ModifyModal setShowModal={setModifyModal} score={score} />
      </Modal>
    </>
  );
}
