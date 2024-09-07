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
  const [feed, setFeed] = useState<number>(0);
  const { openModal, visible, closeModal, modalRef } = useModal();

  useEffect(() => {
    if (feeds) {
      setLoading(false);
    }
  }, [feeds]);

  const handleClick = (id: number) => {
    setFeed(id);
    openModal();
  };

  return (
    <div className="grid grid-cols-3">
      {loading
        ? Array(feeds?.length || 1)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="h-auto w-full gap-3">
                <Skeleton />
              </div>
            ))
        : feeds?.map((item, index) => (
            <div key={item.id} className="border">
              <Image
                src={item.thumbnailUrl}
                alt={`image-${index + 1}`}
                width={500}
                height={500}
                className={` h-42 w-full ${
                  size === 'medium' ? 'md:h-54' : ' md:h-60 lg:h-72'
                }`}
                onClick={() => handleClick(item.id)}
              />
            </div>
          ))}
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeModal={closeModal}
        closeButton={false}
        feed={true}
      >
        <ClubFeedDetail feedId={feed} closeModal={closeModal} />
      </Modal>
    </div>
  );
}
