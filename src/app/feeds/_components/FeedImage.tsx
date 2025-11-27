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
      className="relative aspect-square w-full cursor-pointer"
    >
      <OptimizedImage
        isSkeleton
        width={500}
        height={600}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className="object-cover"
      />
    </Flex>
  );
}
