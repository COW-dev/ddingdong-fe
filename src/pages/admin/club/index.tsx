import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import Create from '@/assets/create.svg';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import CreateClub from '@/components/modal/club/CreateClub';
import ManageClub from '@/components/modal/club/ManageClub';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import useModal from '@/hooks/common/useModal';
import { ModalType } from '@/types';
import type { AdminClub } from '@/types/club';

export default function Index() {
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [modal, setModal] = useState<ModalType>({
    title: '',
    content: <></>,
  });
  const [, setClub] = useState({});
  const [cookies] = useCookies(['token']);
  const [clubs, setAdminClubs] = useState<AdminClub[]>([]);
  const { data } = useAdminAllClubs(cookies.token);
  useEffect(() => {
    setAdminClubs(data?.data ?? []);
  }, [data]);

  function handleModal(data: ModalType) {
    setModal(data);
    openModal();
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 동아리 관리</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>동아리 관리</Heading>
        <div
          onClick={() =>
            handleModal({
              title: '동아리 생성하기',
              content: <CreateClub closeModal={closeModal} />,
            })
          }
        >
          <div className=" items-end opacity-40 transition-opacity hover:opacity-70 sm:hidden ">
            <Image
              src={Create}
              width={100}
              height={100}
              alt="create"
              className="w-8"
            />
          </div>
          <div className="-mb-0.5 hidden rounded-xl bg-blue-100 px-4 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base">
            동아리 생성하기
          </div>
        </div>
      </div>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {clubs
            .sort((a, b) => b.score - a.score)
            .map((club: AdminClub) => (
              <div
                key={club.id}
                className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50"
                onClick={() => {
                  setClub(club);
                  handleModal({
                    title: '동아리 관리하기',
                    content: (
                      <ManageClub
                        id={club.id}
                        score={club.score}
                        name={club.name}
                        closeModal={closeModal}
                        handleModal={handleModal}
                      />
                    ),
                  });
                }}
              >
                <div className=" flex h-full w-full justify-around p-5 md:p-6">
                  <div className="h-20 w-20 overflow-hidden rounded-full border-[1.5px] border-gray-100 bg-gray-50">
                    <Image
                      src={club.profileImage[0].originUrl ?? Admin}
                      priority
                      width={80}
                      height={80}
                      alt="clubImage"
                    />
                  </div>
                  <div className="flex w-[60%] flex-col items-center justify-evenly">
                    <div className="text-lg font-bold md:text-xl">
                      {club.name}
                    </div>
                    <div className="mx-1 rounded-lg bg-indigo-100 p-2 px-4 text-sm font-semibold text-indigo-500">
                      {club.score}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={modal.title}
        closeModal={closeModal}
      >
        {modal.content}
      </Modal>
    </>
  );
}
