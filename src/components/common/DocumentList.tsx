import { useState } from 'react';
import Image from 'next/image';
import Bin from '@/assets/bin.svg';
import Download from '@/assets/download.svg';
import { useAllDocuments } from '@/hooks/api/document/useAllDocuments';
import useModal from '@/hooks/common/useModal';
import Modal from './Modal';
import DocumentDownload from '../modal/documents/DocumentDownload';

export default function DocumentList() {
  const [documentId, setDocumentId] = useState<number>(0);

  const { openModal, visible, closeModal, modalRef } = useModal();
  const { data } = useAllDocuments();
  const documents = data?.data;

  const handleDownloadClick = (id: number) => {
    setDocumentId(id);
    openModal();
  };

  return (
    <ul className="mt-14 w-full md:mt-16">
      {[...(documents ?? [])]?.reverse().map((document) => (
        <li key={document.id} className="mb-1 w-full cursor-pointer border-b">
          <div className="md:ph-5 grid w-full grid-cols-[auto_1fr] items-center pb-4 pt-3 transition-opacity hover:opacity-50 md:pt-3.5">
            <div
              className="col-span-1 flex flex-col"
              onClick={() => handleDownloadClick(document.id)}
            >
              <div className="block text-base font-semibold sm:hidden">
                {document.title && document.title.length < 25
                  ? document.title
                  : document.title?.substring(0, 25) + '..'}
              </div>
              <div className="hidden text-xl font-semibold sm:block">
                {document.title}
              </div>
              <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                {new Date(document.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className=" mr-5 flex justify-self-end md:w-16">
              <div className="flex w-full justify-between gap-7">
                <Image
                  className=" mb-1 h-5 w-5 cursor-pointer md:h-6 md:w-6"
                  src={Download}
                  alt={'다운로드 이미지'}
                  width={24}
                  height={24}
                  onClick={() => handleDownloadClick(document.id)}
                />

                <Image
                  className="h-5 w-5 cursor-pointer md:h-6 md:w-6"
                  src={Bin}
                  alt={'휴지통 이미지'}
                  width={24}
                  height={24}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={<span className="text-black">자료실 다운로드</span>}
        closeModal={closeModal}
      >
        <DocumentDownload documentId={documentId} />
      </Modal>
    </ul>
  );
}
