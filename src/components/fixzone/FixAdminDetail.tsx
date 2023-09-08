import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useAdminFixInfo } from '@/hooks/api/fixzone/useAdminFixInfo';
import { useUpdateComplete } from '@/hooks/api/fixzone/useUpdateComplete';
import useModal from '@/hooks/common/useModal';
import { FixAdminDetailType } from '@/types/fixzone';
import { parseImgUrl } from '@/utils/parse';
import FixItemInfo from './FixItemInfo';
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

  function handleCompleted() {
    setData((prev) => ({ ...prev, completed: true }));
    mutation.mutate({ id, completed: true, token });
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="m-auto max-w-[650px] bg-gray-100 p-10 ">
        <div className="flex justify-between">
          <Link href="/fixzone">
            <Image src={LeftArrow} alt="back" width={25} height={25} />
          </Link>
          <div className="text-lg font-bold">동아리방 시설 보수</div>
          <div></div>
        </div>
        <div className="flex justify-end">
          <button
            disabled={completed}
            onClick={openModal}
            className={`mb-3 mt-7 rounded-xl border border-gray-300 px-4 py-2  text-gray-500  ${
              !completed
                ? ` hover:border-green-300 hover:text-green-500`
                : `border-green-300 text-green-500`
            } md:mr-0.5`}
          >
            {completed ? `처리 완료` : `처리 마치기`}
          </button>
        </div>
        {/* 정보 */}
        <div className="mb-7 rounded-xl bg-white p-5 text-gray-500 shadow-xl">
          <div className="border-b py-2 text-xl font-bold ">{title}</div>
          <div className="py-2 pt-4 font-semibold">{content}</div>
        </div>
        <FixItemInfo club={club} createdAt={createdAt} location={location} />
        {/* 내용 */}
        <div className="relative my-7 flex items-center justify-center">
          <Image
            src={LeftArrow}
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
            className="h-[60vh] w-full overflow-hidden object-scale-down "
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
      </div>
    </div>
  );
}
