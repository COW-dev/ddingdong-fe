import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useClubFixInfo } from '@/hooks/api/fixzone/useClubFixInfo';
import { FixClubDetailType } from '@/types/fixzone';
import { parseImgUrl } from '@/utils/parse';
import ClearButton from './Clearbutton';
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

  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { content, imageUrls, completed, title } = data;

  return (
    <div className="w-full bg-gray-100">
      <div className="m-auto max-w-[650px] bg-gray-100 p-10">
        <div className="flex justify-between">
          <Link href="/fixzone">
            <Image src={LeftArrow} alt="back" width={25} height={25} />
          </Link>
          <div className="text-lg font-bold">동아리방 시설 보수</div>
          <div></div>
        </div>
        <div className="mt-10 flex justify-end text-sm font-semibold md:text-base">
          <ClearButton completed={completed} />
        </div>
        <div
          className={`flex justify-end font-medium ${
            completed ? `text-green-500` : `text-gray-500`
          }`}
        ></div>
        {/* 내용 */}
        <div className="mb-7 mt-4 rounded-xl bg-white p-5 text-gray-500 shadow-xl">
          <div className="py-2 text-xl font-bold">{title}</div>
          <div className="font-semibold">{content}</div>
        </div>
        {/* 사진 */}
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
            className="h-[60vh] overflow-hidden object-scale-down"
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
    </div>
  );
}
