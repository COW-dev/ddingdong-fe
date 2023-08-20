import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

import Data from '@/assets/image1.jpeg';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useClubFixInfo } from '@/hooks/api/fixzone/useClubFixInfo';
import { FixClubDetailType } from '@/types/fixzone';
import ClearButton from './Clearbutton';
type Prop = {
  id: number;
};
const init = {
  id: 0,
  content: '',
  imageUrls: [''],
  isCompleted: false,
  title: '',
};

export default function FixClubDetail({ id }: Prop) {
  const [{ token }] = useCookies(['token']);
  const { data: response } = useClubFixInfo({ token, id });
  const [data, setData] = useState<FixClubDetailType>(init);

  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { content, imageUrls, isCompleted, title } = data;

  return (
    <div className="m-auto max-w-[650px] bg-gray-100 p-10">
      <div className="flex justify-between">
        <Link href="/fixzone">
          <Image src={LeftArrow} alt="back" width={25} height={25} />
        </Link>
        <div>동아리방 시설 보수</div>
        <div></div>
      </div>
      <div className="mt-10 flex justify-end text-sm font-semibold md:text-base">
        <ClearButton isCompleted={isCompleted} />
      </div>
      <div
        className={`flex justify-end font-medium ${
          isCompleted ? `text-green-500` : `text-gray-500`
        }`}
      ></div>
      {/* 내용 */}
      <div className="mb-7 mt-4 rounded-xl bg-white p-5 shadow-xl">
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
          className="absolute left-2 z-10 mx-2 rounded-3xl bg-slate-100  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
        />
        <Image
          src={Data}
          width={550}
          height={500}
          alt="fixImage"
          className=" overflow-hidden rounded-md"
        />
        <Image
          src={RightArrow}
          width={30}
          height={30}
          alt="leftButton"
          className="absolute right-2 z-10 mx-2  rounded-3xl bg-slate-100  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
        />
      </div>
    </div>
  );
}
