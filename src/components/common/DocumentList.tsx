import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Bin from '@/assets/bin.svg';
import Download from '@/assets/download.svg';
import { useAllDocuments } from '@/hooks/api/document/useAllDocuments';
import { useDeleteDocument } from '@/hooks/api/document/useDeleteDocuments';
import useModal from '@/hooks/common/useModal';
import { Document } from '@/types/document';
import AlertDialog from './AlertDialog';
import Modal from './Modal';
import DocumentDownload from '../modal/documents/DocumentDownload';

export default function DocumentList() {
  const [documentId, setDocumentId] = useState<number>(0);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDeleteState, setIsDeleteState] = useState<boolean>(false);

  const [{ token }] = useCookies(['token']);
  const { openModal, visible, closeModal, modalRef } = useModal();
  const { data } = useAllDocuments();
  const deleteDocumentMutation = useDeleteDocument();

  const handleDownloadClick = (id: number) => {
    setIsDeleteState(false);
    setDocumentId(id);
    openModal();
  };

  const handleDelete = (id: number) => {
    setDocumentId(id);
    setIsDeleteState(true);
    openModal();
  };

  const handleDeleteConfirm = async () => {
    deleteDocumentMutation.mutate({ documentId, token });
    closeModal();
  };

  useEffect(() => {
    if (data) setDocuments(data?.data ?? []);
  }, [data]);

  return (
    <ul className="mt-14 w-full md:mt-16">
      {[...(documents ?? [])]?.reverse().map((document) => (
        <li key={document.id} className="mb-1 w-full cursor-pointer border-b">
          <div className="md:ph-5 grid w-full grid-cols-[auto_1fr] items-center pb-4 pt-3 transition-opacity md:pt-3.5">
            <div
              className="col-span-1 flex flex-col hover:opacity-50"
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
                  className=" mb-1 h-5 w-5 cursor-pointer hover:opacity-50 md:h-6 md:w-6"
                  src={Download}
                  alt={'다운로드 이미지'}
                  width={24}
                  height={24}
                  onClick={() => handleDownloadClick(document.id)}
                />
                <Image
                  className="h-5 w-5 cursor-pointer hover:opacity-50 md:h-6 md:w-6"
                  src={Bin}
                  alt={'휴지통 이미지'}
                  width={24}
                  height={24}
                  onClick={() => handleDelete(document.id)}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={
          isDeleteState == false && (
            <span className="text-black">자료실 다운로드</span>
          )
        }
        closeModal={closeModal}
      >
        {isDeleteState ? (
          <AlertDialog onConfirm={handleDeleteConfirm} onCancle={closeModal} />
        ) : (
          <DocumentDownload documentId={documentId} />
        )}
      </Modal>
    </ul>
  );
}
