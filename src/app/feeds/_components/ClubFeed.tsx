import { useState } from 'react';

import { Feed } from '@/app/_api/types/feed';
import useModal from '@/hooks/common/useModal';

import { FeedImage } from './FeedImage';
import { FeedModal } from './FeedModal';

export function ClubFeed({ feeds }: { feeds: Feed[] }) {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);
  const { visible, openModal, closeModal } = useModal();

  const handleFeedDetailOpen = (feedId: number) => {
    setSelectedFeed(feedId);
    openModal();
  };

  return (
    <>
      {feeds?.map((feed, index) => (
        <FeedImage
          key={feed.id}
          feed={feed}
          priority={index < 10}
          onClick={() => handleFeedDetailOpen(feed.id)}
        />
      ))}
      {selectedFeed !== null && (
        <FeedModal
          feedId={selectedFeed}
          isOpen={visible}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
