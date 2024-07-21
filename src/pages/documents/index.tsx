import Head from 'next/head';
import DocumentList from '@/components/common/DocumentList';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import DocumentModal from '@/components/modal/DocumentModal';
import useModal from '@/hooks/common/useModal';

export default function Index() {
  const { openModal, visible, closeModal, modalRef } = useModal();

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
        <button
          className=" ] ml-3 h-10 cursor-pointer rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200"
          onClick={handleOpenModal}
        >
          업로드
        </button>
      </div>
      <DocumentList />
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
