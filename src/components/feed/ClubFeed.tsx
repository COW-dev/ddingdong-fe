import { useState } from 'react';
import Image from 'next/image';
import Check from '@/assets/check.svg';
import EmptyCheck from '@/assets/empty-check.svg';
import VideoPlayButton from '@/assets/videoplay.svg';
import useModal from '@/hooks/common/useModal';
import { Feed } from '@/types/feed';
import Modal from '../common/Modal';
import Skeleton from '../common/Skeleton';
import ClubFeedDetail from '../modal/feed/ClubFeedDetail';
type ClubFeedProps = {
  feeds: Feed[] | undefined;
  gridNum?: number;
  editMode?: boolean;
  selectedFeedId?: number;
  onFeedSelect?: (id: number) => void;
};

export default function ClubFeed({
  feeds,
  gridNum = 3,
  editMode = false,
  selectedFeedId,
  onFeedSelect,
}: ClubFeedProps) {
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

  const handleCheckboxChange = (id: number) => {
    if (onFeedSelect) {
      onFeedSelect(id);
    }
  };

  const renderSkeleton = () => (
    <div className="absolute inset-0">
      <Skeleton />
    </div>
  );

  return (
    <div className={`grid grid-cols-${gridNum} gap-0.5`}>
      {feeds?.map((item, index) => (
        <div
          key={item.id}
          className="relative flex aspect-square w-full cursor-pointer"
        >
          {!isImageLoaded(item.id) && renderSkeleton()}
          {editMode && (
            <Image
              width={20}
              height={20}
              src={selectedFeedId === item.id ? EmptyCheck : Check}
              alt={'삭제 버튼'}
              className="absolute right-0 top-0 shadow-md md:h-12 md:w-12"
              onClick={() => handleCheckboxChange(item.id)}
            />
          )}
          <Image
            width={500}
            height={500}
            src={item.thumbnailCdnUrl}
            alt={`image-${index + 1}`}
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
