import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Create from '@/assets/create.svg';
import Minimenu from '@/assets/minimenu.svg';
import Banner from '@/components/common/Banner';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import CreateBanner from '@/components/modal/banner/CreateBanner';
import DeleteBanner from '@/components/modal/banner/DeleteBanner';
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';
import useModal from '@/hooks/common/useModal';
import { ModalType } from '@/types';
import { BannerType } from '@/types/banner';

export default function Index() {
  const { data: bannerData } = useAllBanners();
  const initialBanners: BannerType[] = bannerData?.data ?? [];
  const [banners, setBanners] = useState<BannerType[]>(initialBanners);
  const [hydrated, setHydrated] = useState(false);
  const { openModal, visible, closeModal, modalRef } = useModal();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [modal, setModal] = useState<ModalType>({
    title: <></>,
    content: <></>,
  });
  const [banner, setBanner] = useState<BannerType | undefined>();

  useEffect(() => {
    if (bannerData) setBanners(bannerData?.data);
  }, [bannerData]);

  function handleBannerClick(data: BannerType) {
    setBanner(data);
  }
  function handleModal(data: ModalType) {
    setModal(data);
    openModal();
  }

  if (!hydrated) return null;

  return (
    <div className="w-full">
      <Head>
        <title>띵동 어드민 - 배너관리</title>
      </Head>
      <div className="mb-14 flex flex-row items-end justify-between">
        <Heading>배너 관리</Heading>
        <div
          onClick={() =>
            handleModal({
              title: '배너 생성하기',
              content: <CreateBanner closeModal={closeModal} />,
            })
          }
        >
          <div className="-mr-3 inline-block p-2 opacity-40 transition-opacity hover:opacity-70 sm:hidden ">
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
          >
            배너 생성하기
          </div>
        </div>
      </div>
      {[...banners]?.reverse().map((data, index) => (
        <div key={`banner-${index}`} className="my-3">
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
                    className="block rounded-lg px-4 py-2 text-sm text-red-500 opacity-90 hover:bg-gray-50 hover:font-semibold hover:text-red-700"
                    onClick={() => {
                      if (banners.length === 1) {
                        setBanner(undefined);
                        return toast.error('배너는 한개 이상 존재해야해요.');
                      }
                      handleModal({
                        title: '배너 삭제하기',
                        content: (
                          <DeleteBanner id={data.id} closeModal={closeModal} />
                        ),
                      });
                    }}
                  >
                    삭제
                  </div>
                  <div
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 opacity-90 hover:bg-gray-50 hover:font-semibold hover:text-gray-700"
                    onClick={() => setBanner(undefined)}
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
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={modal.title}
        closeModal={closeModal}
      >
        {modal.content}
      </Modal>
    </div>
  );
}
