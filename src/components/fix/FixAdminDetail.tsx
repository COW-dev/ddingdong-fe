import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import LeftArrow2 from '@/assets/leftArrow2.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useAdminFixInfo } from '@/hooks/api/fixzone/useAdminFixInfo';
import { useUpdateComplete } from '@/hooks/api/fixzone/useUpdateComplete';
import useModal from '@/hooks/common/useModal';
import { FixAdminDetailType } from '@/types/fix';
import { parseImgUrl } from '@/utils/parse';
import FixItemInfo from './FixItemInfo';
import Heading from '../common/Heading';
import Modal from '../common/Modal';
import ConfirmModal from '../modal/ConfirmModal';
type Prop = {
  id: number;
};
const init = {
  id: 0,
  club: '',
  content: '',
  createdAt: '',
  imageUrls: [''],
  completed: false,
  location: '',
  title: '',
};

export default function FixAdminDetail({ id }: Prop) {
  const [{ token }] = useCookies(['token']);
  const { openModal, visible, closeModal, modalRef } = useModal();
  const { data: response } = useAdminFixInfo({ token, id });
  const [data, setData] = useState<FixAdminDetailType>(init);
  const [presentIndex, setPresentIndex] = useState<number>(0);

  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { club, content, createdAt, imageUrls, completed, location, title } =
    data;
  const mutation = useUpdateComplete();
  console.log('data', data);
  function handleCompleted() {
    setData((prev) => ({ ...prev, completed: true }));
    mutation.mutate({ id, completed: true, token });
  }

  return (
    <>
      <Heading>동아리방 시설보수 확인</Heading>
      <div className="mt-14 flex items-center">
        <Link href="/fix">
          <Image src={LeftArrow2} alt="back" width={25} height={25} />
        </Link>
        <span className="ml-2 text-xl font-semibold text-gray-600">
          {title}
        </span>
      </div>

      <div className="mt-3 flex w-full flex-col rounded-xl border border-gray-100 p-6 md:mt-7 md:flex-row">
        {/* 정보 */}
        <div className=" w-full rounded-xl bg-white md:w-1/2 md:p-3">
          <FixItemInfo club={club} createdAt={createdAt} location={location} />
          <div className="mt-4 py-2 pt-4">{content}</div>
        </div>
        {/* 내용 */}
        <div className="relative flex w-full items-center justify-center md:w-1/2 md:p-3">
          <Image
            src={LeftArrow2}
            width={30}
            height={30}
            alt="leftButton"
            onClick={() => {
              setPresentIndex(presentIndex - 1);
            }}
            className={`absolute left-2 z-10 mx-3 rounded-3xl bg-slate-100  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 ${
              presentIndex === 0 && `hidden`
            }`}
          />
          <Image
            src={parseImgUrl(imageUrls[presentIndex])}
            width={550}
            height={500}
            priority
            alt="fixImage"
            className="overflow-hidden object-scale-down "
          />
          <Image
            src={RightArrow}
            width={30}
            height={30}
            alt="leftButton"
            onClick={() => {
              setPresentIndex(presentIndex + 1);
            }}
            className={`absolute right-2 z-10 mx-3 rounded-3xl bg-slate-100  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 ${
              presentIndex === imageUrls.length - 1 && `hidden`
            }`}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={completed}
          onClick={openModal}
          className={`mb-3 mt-7 rounded-xl border bg-blue-500 px-10 py-2.5 text-base font-semibold text-white  ${
            !completed ? `  hover:bg-blue-600` : ` bg-blue-500`
          } md:mr-0.5`}
        >
          {completed ? `처리 완료` : `처리 마치기`}
        </button>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'처리하시겠습니까?'}
        closeModal={closeModal}
      >
        <ConfirmModal
          title=""
          callback={handleCompleted}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}
