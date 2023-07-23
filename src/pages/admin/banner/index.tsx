import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Minimenu from '@/assets/minimenu.svg';
import Heading from '@/components/common/Heading';
import Banner from '@/components/home/Banner';
import { dummy } from './data';

export type BannerType = {
  id: number | boolean;
  color: string;
  title: string;
  subTitle: string;
  image: string;
};

export type BannerTypeProps = {
  data: {
    id: number | boolean;
    color: string;
    title: string;
    subTitle: string;
    image: string;
  };
};

export const init: BannerType = {
  id: 0,
  color: '#c4b5fd',
  title: '',
  subTitle: '',
  image: 'https://avatars.githubusercontent.com/u/106325839?v=4',
};

export default function Index() {
  const [editNum, setEditNum] = useState<number | boolean>(false);
  const [value, setValue] = useState<BannerType>(init);

  const handleBannerClick = (data: BannerType) => {
    setEditNum(data.id);
  };

  const handleCancelClick = () => {
    setValue(init);
    setEditNum(false);
  };

  useEffect(() => {
    const temp = dummy.find((item) => item.id === editNum);
    if (temp) setValue(temp);
  }, [editNum]);

  return (
    <div className="w-full">
      <Head>
        <title>띵동 어드민 - 배너관리</title>
      </Head>
      <div className="mb-14 flex flex-row items-end justify-between">
        <Heading>배너 관리하기</Heading>
        <div className="-mb-0.5 hidden rounded-xl bg-blue-100 px-4 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base ">
          배너 생성하기
        </div>
      </div>
      {dummy.map((data) => (
        <div key={data.id} className="m-3">
          <div className="group relative">
            <div className="editNum absolute right-5 inline-block w-12 p-2 font-semibold">
              <Image
                src={Minimenu}
                width={100}
                height={100}
                priority
                alt="menu"
                className="w-10"
                onClick={() => handleBannerClick(data)}
              />
            </div>

            <div
              className={`relative   ${
                editNum === data.id ? `block` : `hidden`
              }`}
            >
              <div className="absolute end-0 right-2 z-10 mt-2 w-24 rounded-md border border-gray-100 bg-white shadow-lg">
                <div className=" p-2">
                  <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    수정
                  </div>
                  <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    삭제
                  </div>
                  <div
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    onClick={handleCancelClick}
                  >
                    취소
                  </div>
                </div>
              </div>
            </div>
            <Banner data={data} />
          </div>
        </div>
      ))}
    </div>
  );
}
