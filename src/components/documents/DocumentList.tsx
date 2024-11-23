import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Bin from '@/assets/bin-red.svg';
import Download from '@/assets/download.svg';
import { ROLE_TYPE } from '@/constants/text';
import { useAllDocuments } from '@/hooks/api/document/useAllDocuments';
import { useDeleteDocument } from '@/hooks/api/document/useDeleteDocuments';
import { useDocumentInfo } from '@/hooks/api/document/useDocumentInfo';
import useModal from '@/hooks/common/useModal';
import { DocumentDetail } from '@/types/document';
import AlertDialog from '../common/AlertDialog';
import Modal from '../common/Modal';
import PagiNation from '../common/PagiNation';
import DocumentDownload from '../modal/documents/DocumentDownload';

export default function DocumentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [documentId, setDocumentId] = useState<number>(0);
  const [documentData, setDocumentData] = useState<DocumentDetail>();
  const [isDeleteState, setIsDeleteState] = useState<boolean>(false);
  const [{ token, role }] = useCookies(['token', 'role']);

  const { openModal, visible, closeModal, modalRef } = useModal();
  const { data } = useAllDocuments(currentPage);
  const { data: selectedDocumentData } = useDocumentInfo(documentId);

  const documents = data?.data?.documents || [];
  const totalPages = data?.data?.totalPageCount || 1;
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

  const handleDeleteConfirm = () => {
    deleteDocumentMutation.mutate({ documentId, token });
    closeModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedDocumentData) {
      setDocumentData(selectedDocumentData.data);
    }
  }, [selectedDocumentData]);

  return (
    <>
      <ul className="mt-14 w-full md:mt-16">
        {documents?.map((document) => (
          <li
            key={document.id}
            className="mb-1 flex w-full cursor-pointer flex-row items-center justify-between border-b "
          >
            <div className="grid w-full grid-cols-[auto_1fr] items-center p-3 transition-opacity md:p-3.5">
              <div
                className=" col-span-1 flex shrink-0 flex-col overflow-hidden text-ellipsis break-words hover:opacity-50"
                onClick={() => handleDownloadClick(document.id)}
              >
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold sm:hidden">
                  {document.title && document.title.length < 25
                    ? document.title
                    : document.title?.substring(0, 25) + '..'}
                </div>
                <div className="hidden overflow-hidden text-base font-semibold sm:block md:text-xl ">
                  {document.title}
                </div>
                <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                  {new Date(document.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className=" mr-5 flex shrink-0 justify-self-end md:w-16">
              <div
                className={`flex w-full justify-between ${
                  role === ROLE_TYPE.ROLE_ADMIN && 'gap-7'
                }`}
              >
                <Image
                  className="mb-1 h-5 w-5 cursor-pointer hover:opacity-50 md:h-6 md:w-6 "
                  src={Download}
                  alt={'다운로드 이미지'}
                  width={24}
                  height={24}
                  onClick={() => handleDownloadClick(document.id)}
                />
                {role === ROLE_TYPE.ROLE_ADMIN && (
                  <Image
                    className="h-5 w-5 cursor-pointer hover:opacity-50 md:h-6 md:w-6"
                    src={Bin}
                    alt={'휴지통 이미지'}
                    width={24}
                    height={24}
                    onClick={() => handleDelete(document.id)}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
        {documents?.length === 0 && (
          <li className="mb-2 flex h-20 w-full flex-col items-center justify-center rounded-xl border border-gray-100 pl-4 pt-2 shadow-sm">
            <div className=" text-sm text-gray-500 ">
              자료실 데이터가 존재하지 않습니다.
            </div>
          </li>
        )}
        {selectedDocumentData && (
          <Modal
            visible={visible}
            modalRef={modalRef}
            title={
              isDeleteState == false && (
                <span className="text-black">자료실 다운로드</span>
              )
            }
            closeButton={false}
            closeModal={closeModal}
          >
            {isDeleteState ? (
              <AlertDialog
                onConfirm={handleDeleteConfirm}
                onCancel={closeModal}
              />
            ) : (
              <DocumentDownload documentData={documentData} />
            )}
          </Modal>
        )}
      </ul>
      <PagiNation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
