'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { usePortal } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';
import { Feed } from '@/app/_api/types/feed';

import { FeedImage } from './FeedImage';
import { FeedModal } from './FeedModal';

export function ClubFeed({ feeds }: { feeds: Feed[] }) {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = usePortal();
  const queryClient = useQueryClient();

  const handleFeedDetailOpen = async (feedId: number) => {
    setSelectedFeed(feedId);
    await queryClient.prefetchQuery(feedQueryOptions.detail(feedId));
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
