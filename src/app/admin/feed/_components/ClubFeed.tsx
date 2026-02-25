import { useRouter } from 'next/navigation';

import { useState } from 'react';

import {
  Body2,
  Flex,
  Icon,
  Radio,
  RadioItem,
  usePortal,
} from 'ddingdong-design-system';
import { useMediaQuery } from 'usehooks-ts';

import { Feed } from '@/app/_api/types/feed';
import { OptimizedImage } from '@/components/common/OptimizedImage';

import { FeedModal } from './FeedModal';

export function ClubFeed({
  feeds,
  editMode,
  selectedFeedId,
  onFeedSelect,
}: {
  feeds: Feed[];
  editMode?: boolean;
  selectedFeedId?: number | null;
  onFeedSelect: (feedId: number) => void;
}) {
  const { isOpen, openModal, closeModal } = usePortal();
  const [selectedFeedIdForModal, setSelectedFeedIdForModal] =
    useState<number>(0);
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleFeedDetailOpen = (feedId: number) => {
    if (editMode) return;

    if (isDesktop) {
      setSelectedFeedIdForModal(feedId);
      openModal();
    } else {
      router.push(`/feed/${feedId}`);
    }
  };

  return (
    <>
      <Radio
        value={selectedFeedId?.toString() ?? ''}
        onValueChange={(value) => {
          const newValue = value === '' ? null : Number(value);
          if (editMode) {
            onFeedSelect(newValue ?? 0);
          }
        }}
        className="contents"
      >
        {feeds?.map((feed, index) => (
          <label
            key={feed.id}
            htmlFor={feed.id.toString()}
            className="relative"
          >
            {editMode && (
              <RadioItem
                value={feed.id.toString()}
                id={feed.id.toString()}
                className="absolute top-2 left-2 z-20"
              />
            )}
            <FeedImageWithRadio
              feed={feed}
              priority={index < 10}
              onClick={() => handleFeedDetailOpen(feed.id)}
            />
          </label>
        ))}
      </Radio>

      {isOpen && selectedFeedIdForModal > 0 && (
        <FeedModal
          feedId={selectedFeedIdForModal}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

type FeedImageWithRadioProps = {
  feed: Feed;
  priority: boolean;
  onClick: VoidFunction;
};

function FeedImageWithRadio({
  feed,
  priority,
  onClick,
}: FeedImageWithRadioProps) {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden"
    >
      <OptimizedImage
        isSkeleton
        width={500}
        height={600}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className="h-full w-full object-cover object-center"
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
        <div className="absolute right-2 bottom-2 z-20 flex items-center justify-center p-2">
          <Icon name="video" size={20} color="white" />
        </div>
      )}
    </div>
  );
}
