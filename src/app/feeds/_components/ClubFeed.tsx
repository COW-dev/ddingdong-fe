'use client';

import { useState } from 'react';

import { Feed } from '@/app/_api/types/feed';

import { FeedImage } from './FeedImage';
import { FeedModal } from './FeedModal';
import { usePortal } from 'ddingdong-design-system';

export function ClubFeed({ feeds }: { feeds: Feed[] }) {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = usePortal();

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
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
