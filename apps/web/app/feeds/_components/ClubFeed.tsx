'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { usePortal } from '@dds/shared';
import { useQueryClient } from '@tanstack/react-query';
import { useMediaQuery } from 'usehooks-ts';

import { feedQueryOptions } from '@/_api/queries/feed';
import { Feed } from '@/_api/types/feed';

import { FeedImage } from './FeedImage';
import { FeedModal } from './FeedModal';

export function ClubFeed({ feeds }: { feeds: Feed[] }) {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = usePortal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleFeedDetailOpen = async (feedId: number) => {
    if (isDesktop) {
      setSelectedFeed(feedId);
      await queryClient.prefetchQuery(feedQueryOptions.detail(feedId));
      openModal();
    } else {
      router.push(`/feeds/${feedId}`);
    }
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
          key={selectedFeed}
          feedId={selectedFeed}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
