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
  viewMode?: 'ADMIN' | 'TOTAL';
  editMode?: boolean;
  selectedFeedId?: number;
  onFeedSelect?: (id: number) => void;
};

export default function ClubFeed({
  feeds,
  viewMode = 'TOTAL',
  editMode = false,
  selectedFeedId,
  onFeedSelect,
}: ClubFeedProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [feedId, setFeedId] = useState<number>(0);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const handleClick = (id: number) => {
    if (!editMode) {
      setFeedId(id);
      openModal();
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const isImageLoaded = (id: number) => loadedImages[id] || false;

  const handleCheckboxChange = (id: number) => {
    if (selectedFeedId === id) {
      onFeedSelect && onFeedSelect(0);
      return;
    }
    onFeedSelect && onFeedSelect(id);
  };

  const renderSkeleton = () => (
    <div className="absolute inset-0">
      <Skeleton />
    </div>
  );

  return (
    <div
      className={`grid gap-0.5 ${
        viewMode === 'ADMIN' ? 'grid-cols-4' : 'grid-cols-3'
      }`}
    >
      {feeds?.map((item, index) => (
        <div
          key={item.id}
          className="relative flex aspect-square w-full cursor-pointer"
          onClick={() =>
            editMode ? handleCheckboxChange(item.id) : handleClick(item.id)
          }
        >
          {!isImageLoaded(item.id) && renderSkeleton()}

          {editMode && (
            <Image
              width={30}
              height={30}
              src={selectedFeedId === item.id ? Check : EmptyCheck}
              alt={'삭제 버튼'}
              className="absolute left-2 top-2 md:h-8 md:w-8"
            />
          )}
          <Image
            width={350}
            height={350}
            src={item.thumbnailCdnUrl}
            alt={`image-${index + 1}`}
            priority={index < 10}
            style={{ objectFit: 'cover' }}
            onLoad={() => handleImageLoad(item.id)}
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
