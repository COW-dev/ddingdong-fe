import { useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useMemberFile } from '@/hooks/api/member/useMemberFile';
import useModal from '@/hooks/common/useModal';
import { downloadBlob } from '@/utils/file';
import Modal from './Modal';
import MemberUpload from '../member/MemberUpload';

export default function ExcelDropdown() {
  const [{ token }] = useCookies(['token']);
  const [isOpenMoal, setIsOpenModal] = useState<boolean>(false);
  const { data } = useMemberFile(token);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const handleClickExcel = () => {
    setIsOpenModal(!isOpenMoal);
  };

  const handleClickDownload = () => {
    if (!data?.data) return toast.error('명단을 다운로드 할 수 없습니다');

    const blob = new Blob([data.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    downloadBlob(blob, '동아리원 명단.xlsx');
  };

  return (
    <div>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="inline-flex w-24 items-center justify-center rounded-lg bg-green-100 py-2.5 text-center text-sm font-bold text-green-500 hover:bg-green-200 focus:outline-none md:w-32"
        type="button"
        onClick={handleClickExcel}
      >
        Excel
        <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpenMoal && (
        <div
          id="dropdownHover"
          className="relative z-20 m-auto min-w-fit divide-y divide-gray-100 rounded-lg bg-green-200 shadow"
        >
          <ul
            className="absolute right-0 z-10 mt-2 w-32 rounded-xl border-[1px] bg-white py-2 text-sm text-gray-700 shadow-lg"
            aria-labelledby="dropdownHoverButton"
          >
            <li
              onClick={handleClickDownload}
              className="block cursor-pointer px-3 py-2 font-semibold hover:bg-gray-100"
            >
              동아리원 다운받기
            </li>
            <li
              onClick={openModal}
              className="block cursor-pointer px-3 py-2 font-semibold hover:bg-gray-100"
            >
              동아리원 업로드
            </li>
          </ul>
        </div>
      )}
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'동아리원 엑셀 업로드'}
        closeModal={closeModal}
      >
        <MemberUpload closeModal={closeModal} />
      </Modal>
    </div>
  );
}
