import Image from 'next/image';

import { useState } from 'react';

import { Flex, Skeleton } from 'ddingdong-design-system';

import { Feed } from '../../_api/types/feed';
type FeedImageProps = {
  feed: Feed;
  priority: boolean;
  onClick: () => void;
};

export function FeedImage({ feed, priority, onClick }: FeedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Flex className="relative aspect-square w-full">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <Image
        width={500}
        height={600}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className={`cursor-pointer object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClick}
        onLoadingComplete={() => setLoaded(true)}
      />
    </Flex>
  );
}
