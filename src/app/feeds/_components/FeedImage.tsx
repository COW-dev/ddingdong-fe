import { Body2, Caption1, Flex, Icon } from 'ddingdong-design-system';

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
      className="group relative aspect-square w-full cursor-pointer overflow-hidden"
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
      <Flex
        gap={6}
        alignItems="center"
        justifyContent="center"
        className="absolute inset-0 z-10 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <Flex gap={1.5} alignItems="center">
          <Icon name="like" size={22} color="white" />
          <Body2 weight="semibold" className="text-white">
            {feed.likeCount}
          </Body2>
        </Flex>
        <Flex gap={1.5} alignItems="center">
          <Icon name="comment" size={22} color="white" />
          <Body2 weight="semibold" className="text-white">
            {feed.commentCount}
          </Body2>
        </Flex>
      </Flex>
      {feed.feedType === 'VIDEO' && (
        <div className="absolute right-2 bottom-2 z-20 flex items-center justify-center p-1 md:p-2">
          <Icon name="video" size={20} color="white" />
        </div>
      )}
      <Flex
        gap={1}
        alignItems="center"
        className="absolute bottom-2 left-2 z-20 md:hidden"
      >
        <Icon name="eye" size={16} color="white" />
        <Caption1 weight="semibold" className="text-white">
          {feed.viewCount}
        </Caption1>
      </Flex>
    </Flex>
  );
}
