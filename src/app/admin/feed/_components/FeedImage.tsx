import { useState } from 'react';

import { Flex, Skeleton } from 'ddingdong-design-system';

import { Feed } from '@/app/_api/types/feed';
import { OptimizedImage } from '@/components/common/OptimizedImage';
type FeedImageProps = {
  feed: Feed;
  priority: boolean;
  onClick: () => void;
};

export function FeedImage({ feed, priority, onClick }: FeedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Flex
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {!loaded && <Skeleton className="absolute inset-0" />}
      <OptimizedImage
        isSkeleton={!loaded}
        width={500}
        height={600}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </Flex>
  );
}
