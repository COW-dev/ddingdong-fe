import Image from 'next/image';

import { useState } from 'react';

import { Skeleton } from 'ddingdong-design-system';

import { Feed } from '../../_api/types/feed';
type FeedImageProps = {
  feed: Feed;
  priority: boolean;
  onClick: () => void;
};

export function FeedImage({ feed, priority, onClick }: FeedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-square h-[350px] w-[350px]">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <Image
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        fill
        className={`cursor-pointer object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClick}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
