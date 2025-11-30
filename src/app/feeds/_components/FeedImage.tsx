import { Flex } from 'ddingdong-design-system';

import { Feed } from '@/app/_api/types/feed';
import { OptimizedImage } from '@/components/common/OptimizedImage';

type FeedImageProps = {
  feed: Feed;
  priority: boolean;
  onClick: () => void;
};

export function FeedImage({ feed, priority, onClick }: FeedImageProps) {
  return (
    <Flex
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className="relative aspect-square w-full cursor-pointer overflow-hidden"
    >
      <OptimizedImage
        isSkeleton
        width={500}
        height={500}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className="h-full w-full object-cover"
      />
      {feed.feedType === 'VIDEO' && (
        <div className="absolute right-2 bottom-2 z-20 flex items-center justify-center rounded-full bg-black p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M8 5V19L19 12L8 5Z"
              fill="white"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      )}
    </Flex>
  );
}
