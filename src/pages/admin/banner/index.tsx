import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Create from '@/assets/create.svg';
import Minimenu from '@/assets/minimenu.svg';
import Banner from '@/components/common/Banner';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import { MODAL_TYPE } from '@/components/modal';
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';

export type BannerType = {
  id?: number | string;
  colorCode: string;
  title: string;
  subTitle: string;
  imgUrl: string;
};

export type BannerTypeProps = {
  data: {
    id?: number | string;
    colorCode: string;
    title: string;
    subTitle: string;
    imgUrl: string;
  };
};

export const init: BannerType = {
  id: 0,
  title: '띵동이 탄생했어요!',
  subTitle: '명지대학교의 모든 동아리를 띵동에서 확인하세요!',
  colorCode: 'indigo',
  imgUrl:
    'https://.ddingdong-file.s3.ap-northeast-2.amazonaws.com/banner-image/241a5dd4-feab-4e45-b2b0-82bcdd1d8c3a.png',
};

export default function Index() {
  const { data: bannerData } = useAllBanners();
  const [banners, setBanners] = useState<BannerType[]>(bannerData?.data);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [modal, setModal] = useState(MODAL_TYPE.null);
  const [banner, setBanner] = useState<BannerType>(init);

  useEffect(() => {
    if (modal === MODAL_TYPE.null) setBanner(init);
  }, [modal]);

  useEffect(() => {
    if (banners) setBanners(bannerData?.data);
  }, [bannerData?.data]);

  const handleBannerClick = (data: BannerType) => {
    setBanner(data);
  };
  if (!hydrated) return null;
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
      {[...banners]?.reverse().map((data, index) => (
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
                    onClick={() => {
                      if (banners.length === 1) {
                        setBanner(init);
                        return toast.error('배너는 한개 이상 존재해야해요.');
                      }
                      setModal(MODAL_TYPE.deleteBanner);
                    }}
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
      <Toaster
        toastOptions={{
          style: {
            fontWeight: 600,
            padding: '0.75rem 1rem',
            marginTop: '0.5rem',
          },
        }}
      />
    </div>
  );
}
