import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import LeftArrow2 from '@/assets/leftArrow2.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { ROLE_TYPE } from '@/constants/text';
import { useFixInfo } from '@/hooks/api/fixzone/useFixInfo';
import { useUpdateComplete } from '@/hooks/api/fixzone/useUpdateComplete';
import useModal from '@/hooks/common/useModal';
import { sortByOrder } from '@/utils/change';
import CommentContainer from './comment/CommentContainer';
import FixItemInfo from './FixItemInfo';
import Heading from '../common/Heading';
import Modal from '../common/Modal';
import ConfirmModal from '../modal/ConfirmModal';

type Prop = {
  id: number;
};

export default function FixDetail({ id }: Prop) {
  const [{ role }] = useCookies(['role']);

  const [{ token }] = useCookies(['token']);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const { data } = useFixInfo({ token, id });
  const [presentIndex, setPresentIndex] = useState<number>(0);
  const mutation = useUpdateComplete();
  const [isCompleted, setIsCompleted] = useState<boolean>(
    data?.isCompleted ?? false,
  );
  if (!data) return <></>;
  const {
    requestedAt,
    images,
    comments,
    clubName,
    clubLocation,
    title,
    content,
  } = data;
  const sortedImages = sortByOrder(images);

  function handleCompleted() {
    setIsCompleted(true);
    mutation.mutate({ id, token });
  }

  return (
    <>
      <Heading>동아리방 시설보수 확인</Heading>
      <div className="mt-14 flex items-center">
        <Link href="/fix">
          <Image src={LeftArrow2} alt="back" width={25} height={25} />
        </Link>
        <h1 className="ml-2 text-xl font-semibold text-gray-600">{title}</h1>
      </div>

      <div className="mt-3 flex w-full flex-col gap-4 rounded-xl border border-gray-100 p-3 md:mt-7 md:flex-row md:p-6">
        {/* 정보 */}
        <div className=" w-full rounded-xl bg-white md:w-1/2 md:p-3">
          <FixItemInfo
            club={clubName}
            createdAt={requestedAt}
            location={clubLocation}
          />
          <div className="px-3 pt-8">
            {content === '' ? (
              <span className="text-gray-500">작성된 내용이 없습니다.</span>
            ) : (
              content
            )}
          </div>
        </div>
        {/* 내용 */}
        <div className="relative flex w-full items-center justify-center md:w-1/2 md:p-3">
          {sortedImages.length === 0 ? (
            <div className="flex min-h-40 w-full items-center justify-center rounded-lg border text-gray-500">
              등록된 사진이 없습니다.
            </div>
          ) : (
            <>
              <Image
                src={LeftArrow2}
                width={30}
                height={30}
                alt="leftButton"
                onClick={() => {
                  setPresentIndex(presentIndex - 1);
                }}
                className={`absolute left-2 z-10 mx-3 rounded-3xl bg-slate-100  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25
              ${presentIndex === 0 && 'hidden'}`}
              />
              <Image
                src={sortedImages[presentIndex].originUrl}
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
                  presentIndex === sortedImages.length - 1 && `hidden`
                }`}
              />
            </>
          )}
        </div>
      </div>
      <div
        className={`
          flex justify-center ${role === ROLE_TYPE.ROLE_CLUB && 'hidden'}
        `}
      >
        <button
          disabled={isCompleted}
          onClick={openModal}
          className={`
            mb-3 mt-7 rounded-xl px-10 py-2.5 text-base font-semibold md:mr-0.5 ${
              !isCompleted
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-500'
            }`}
        >
          {isCompleted ? '처리 완료' : '처리 마치기'}
        </button>
      </div>
      <div className="mt-16">
        <CommentContainer comments={comments} fixZoneId={id} />
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
