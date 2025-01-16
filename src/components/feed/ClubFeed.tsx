import { useState } from 'react';
import Image from 'next/image';
import VideoPlayButton from '@/assets/videoplay.svg';
import useModal from '@/hooks/common/useModal';
import { Feed } from '@/types/feed';
import Modal from '../common/Modal';
import Skeleton from '../common/Skeleton';
import ClubFeedDetail from '../modal/feed/ClubFeedDetail';

type ClubFeedProps = {
  feeds: Feed[] | undefined;
};

export default function ClubFeed({ feeds }: ClubFeedProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [feedId, setFeedId] = useState<number>(0);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const handleClick = (id: number) => {
    setFeedId(id);
    openModal();
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const isImageLoaded = (id: number) => loadedImages[id] || false;

  const renderSkeleton = () => (
    <div className="absolute inset-0">
      <Skeleton />
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {feeds?.map((item, index) => (
        <div
          key={item.id}
          className="relative flex aspect-square w-full cursor-pointer"
        >
          {!isImageLoaded(item.id) && renderSkeleton()}

          <Image
            src={item.thumbnailCdnUrl}
            alt={`image-${index + 1}`}
            fill
            priority={index < 10}
            style={{ objectFit: 'cover' }}
            onLoad={() => handleImageLoad(item.id)}
            onClick={() => handleClick(item.id)}
          />
          {item.feedType == 'VIDEO' && (
            <Image
              width={20}
              height={20}
              src={VideoPlayButton}
              alt={'비디오 버튼'}
              className=" -translate-x-1/5 absolute bottom-1 right-0 shadow-md md:h-12 md:w-12"
            />
          )}
        </div>
      ))}
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeModal={closeModal}
        closeButton={false}
        feed={true}
      >
        <ClubFeedDetail feedId={feedId} />
      </Modal>
    </div>
  );
}
