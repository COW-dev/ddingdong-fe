import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useClubFixInfo } from '@/hooks/api/fixzone/useClubFixInfo';
import { FixClubDetailType } from '@/types/fix';
import { parseImgUrl } from '@/utils/parse';
import ClearButton from './Clearbutton';
import Heading from '../common/Heading';
import NeutralButton from '../common/NeutralButton';
type Prop = {
  id: number;
};
const init = {
  id: 0,
  content: '',
  imageUrls: [''],
  completed: false,
  title: '',
};

export default function FixClubDetail({ id }: Prop) {
  const [{ token }] = useCookies(['token']);
  const { data: response } = useClubFixInfo({ token, id });
  const [data, setData] = useState<FixClubDetailType>(init);
  const [presentIndex, setPresentIndex] = useState<number>(0);
  console.log('data', data);
  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { content, imageUrls, completed, title } = data;

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading>동아리방 시설보수 신청</Heading>
        <div className="mt-8">
          <NeutralButton href="/fix">목록으로 돌아가기</NeutralButton>
        </div>
      </div>
      <div className="mt-7 flex w-full flex-col rounded-xl border border-gray-100 p-6 md:mt-14 md:flex-row">
        {/* 내용 */}
        <div className="mb-5 w-full rounded-xl bg-white md:w-1/2 md:p-3 ">
          <div className=" py-2 text-xl font-bold md:text-2xl">{title}</div>
          <div>{content}</div>
        </div>
        {/* 사진 */}
        <div className="relative flex w-full items-center justify-center md:w-1/2">
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
            className=" overflow-hidden object-scale-down"
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
    </>
  );
}
