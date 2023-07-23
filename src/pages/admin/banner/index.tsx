import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Create from '@/assets/create.svg';
import Minimenu from '@/assets/minimenu.svg';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import Banner from '@/components/home/Banner';
import { MODAL_TYPE } from '@/components/modal';
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
  const [modal, setModal] = useState(MODAL_TYPE.null);
  const [banner, setBanner] = useState<BannerType>(init);

  useEffect(() => {
    if (modal === MODAL_TYPE.null) setBanner(init);
  }, [modal]);

  const handleBannerClick = (data: BannerType) => {
    setBanner(data);
  };

  return (
    <div className="w-full">
      <Head>
        <title>띵동 어드민 - 배너관리</title>
      </Head>
      <div className="mb-14 flex flex-row items-end justify-between">
        <Heading>배너 관리하기</Heading>
        <div>
          <div
            className="-mr-3 inline-block p-2 opacity-40 transition-opacity hover:opacity-70 sm:hidden "
            onClick={() => setModal(MODAL_TYPE.createBanner)}
          >
            <Image
              src={Create}
              width={100}
              height={100}
              alt="create"
              className="w-8"
            />
          </div>
          <div
            className={`-mb-0.5 hidden rounded-xl bg-blue-100 px-4 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base`}
            onClick={() => setModal(MODAL_TYPE.createBanner)}
          >
            배너 생성하기
          </div>
        </div>
      </div>
      {dummy.map((data, index) => (
        <div key={`banner-${index}`} className="m-3">
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

            <div className={`relative ${banner === data ? `block` : `hidden`}`}>
              <div className="absolute end-0 right-2 z-10 mt-2 w-24 rounded-md border border-gray-100 bg-white  shadow-lg ">
                <div className=" p-2">
                  <div
                    className="block rounded-lg px-4 py-2 text-sm text-blue-500 opacity-90 hover:bg-gray-50 hover:font-semibold hover:text-blue-700"
                    onClick={() => setModal(MODAL_TYPE.participants)}
                  >
                    수정
                  </div>
                  <div
                    className="block rounded-lg px-4 py-2 text-sm text-red-500 opacity-90 hover:bg-gray-50 hover:font-semibold hover:text-red-700"
                    onClick={() => setModal(MODAL_TYPE.deleteBanner)}
                  >
                    삭제
                  </div>
                  <div
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 opacity-90 hover:bg-gray-50 hover:font-semibold hover:text-gray-700"
                    onClick={() => setBanner(init)}
                  >
                    취소
                  </div>
                </div>
              </div>
            </div>
            <Banner data={data} />
            <Modal modal={modal} data={banner} setModal={setModal} />
          </div>
        </div>
      ))}
    </div>
  );
}
