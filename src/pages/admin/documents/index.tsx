import { useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import DocumentList from '@/components/common/DocumentList';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import DocumentModal from '@/components/modal/DocumentModal';
import { ROLE_TYPE } from '@/constants/text';
import useModal from '@/hooks/common/useModal';

export default function Index() {
  const { openModal, visible, closeModal, modalRef } = useModal();

  const [editable, setEditable] = useState<boolean>(false);
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;

  function handleOpenModal() {
    openModal();
  }

  return (
    <>
      <Head>
        <title>띵동 - 자료실</title>
      </Head>
      <div className=" flex items-end justify-between ">
        <Heading>자료실</Heading>
        <div>
          {editable ? (
            <>
              <button
                className={` ${
                  role === ROLE_TYPE.ROLE_CLUB && 'invisible'
                } ml-3 h-10 cursor-pointer rounded-lg bg-gray-100 px-4.5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200`}
                onClick={() => setEditable(false)}
              >
                취소
              </button>
              <button
                className={` ${
                  role === ROLE_TYPE.ROLE_CLUB && 'invisible'
                } ml-3 h-10 cursor-pointer rounded-lg bg-blue-500 px-4.5 py-2 text-sm font-bold text-white hover:bg-blue-600`}
                onClick={handleOpenModal}
              >
                완료
              </button>
            </>
          ) : (
            <>
              <button
                className={` ${
                  role === ROLE_TYPE.ROLE_CLUB && 'invisible'
                } ml-3 h-10 cursor-pointer rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200`}
                onClick={() => setEditable(true)}
              >
                수정
              </button>
              <button
                className={` ${
                  role === ROLE_TYPE.ROLE_CLUB && 'invisible'
                } ml-3 h-10 cursor-pointer rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200`}
                onClick={handleOpenModal}
              >
                업로드
              </button>
            </>
          )}
        </div>
      </div>
      <DocumentList editable={editable} />
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={<span className="text-black">자료실 업로드</span>}
        closeModal={closeModal}
      >
        <DocumentModal closeModal={closeModal} />
      </Modal>
    </>
  );
}
