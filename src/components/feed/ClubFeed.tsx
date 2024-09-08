import { useEffect, useState } from 'react';
import Image from 'next/image';
import useModal from '@/hooks/common/useModal';
import { Feed } from '@/types/feed';
import Modal from '../common/Modal';
import Skeleton from '../common/Skeleton';
import ClubFeedDetail from '../modal/feed/ClubFeedDetail';

type ClubFeedProps = {
  feeds: Feed[] | null;
  size: 'medium' | 'large';
};

export default function ClubFeed({ feeds, size }: ClubFeedProps) {
  const [loading, setLoading] = useState(true);
  const [feedId, setFeedId] = useState<number>(0);
  const { openModal, visible, closeModal, modalRef } = useModal();

  useEffect(() => {
    if (feeds) {
      setLoading(false);
    }
  }, [feeds]);

  const handleClick = (id: number) => {
    setFeedId(id);
    openModal();
  };

  const renderSkeleton = () => (
    <>
      {Array(feeds?.length)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`h-30 w-full gap-1 ${
              size === 'medium' ? 'md:h-54' : 'md:h-60 lg:h-72'
            }`}
          >
            <Skeleton />
          </div>
        ))}
    </>
  );

  const renderFeeds = () => (
    <>
      {feeds?.map((item, index) => (
        <div key={item.id}>
          <Image
            src={item.thumbnailUrl}
            alt={`image-${index + 1}`}
            width={500}
            height={500}
            style={{ objectFit: 'contain' }}
            className={`h-30 w-full bg-black ${
              size === 'medium' ? 'md:h-54' : 'md:h-60 lg:h-72'
            }`}
            onClick={() => handleClick(item.id)}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="grid grid-cols-3 gap-1">
      {loading ? renderSkeleton() : renderFeeds()}
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
