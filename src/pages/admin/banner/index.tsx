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
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';
import useModal from '@/hooks/common/useModal';
import { ModalType } from '@/types';
import { BannerType } from '@/types/banner';

export default function Index() {
  const { data: bannerData } = useAllBanners();
  const [banners, setBanners] = useState<BannerType[]>(bannerData?.data ?? []);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const [modal, setModal] = useState<ModalType>({
    title: <></>,
    content: <></>,
  });

  useEffect(() => {
    if (bannerData) setBanners(bannerData?.data);
  }, [bannerData]);

  function handleModal(data: ModalType) {
    setModal(data);
    openModal();
  }

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
              title: '배너 업로드',
              content: <CreateBanner closeModal={closeModal} />,
            })
          }
        >
          <div className="-mr-3 p-1 opacity-40 transition-opacity hover:opacity-70 sm:hidden ">
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
      {banners?.map((data, index) => (
        <Banner data={data} showEdit={true} key={index} />
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
