'use client';

import { useState } from 'react';

import { Flex } from 'ddingdong-design-system';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import VideoPlayer from './VideoPlayer';

type FeedMediaProps = {
  feedType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  className?: string;
};

export function FeedMedia({ feedType, mediaUrl, className }: FeedMediaProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Flex className={`bg-black ${className}`}>
      {feedType === 'VIDEO' ? (
        <VideoPlayer videoUrl={mediaUrl} />
      ) : (
        <OptimizedImage
          isSkeleton={!loaded}
          width={800}
          height={800}
          src={mediaUrl}
          alt="동아리 피드"
          className="h-full w-full object-contain"
          onLoad={() => setLoaded(true)}
        />
      )}
    </Flex>
  );
}
