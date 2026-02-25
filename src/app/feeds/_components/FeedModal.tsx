import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Avatar,
  Body1,
  Body2,
  Caption1,
  Flex,
  Modal,
} from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';

import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import { FeedMedia } from './FeedMedia';
import { FeedStats } from './FeedStats';
import { useDebouncedLike } from '../_hooks/useDebouncedLike';

type FeedModalProps = {
  feedId: number;
  isOpen: boolean;
  closeModal: () => void;
};

export function FeedModal({ feedId, isOpen, closeModal }: FeedModalProps) {
  const { data: feed } = useSuspenseQuery(feedQueryOptions.detail(feedId));
  const { likeCount, handleLike } = useDebouncedLike({
    feedId,
    initialLikeCount: feed.likeCount,
  });

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} className="z-100">
      <Flex
        dir="col"
        className="h-[85vh] w-[90vw] max-w-[1000px] overflow-hidden bg-white md:h-[600px] md:flex-row"
      >
        <FeedMedia
          feedType={feed.feedType}
          mediaUrl={feed.fileUrls.cdnUrl}
          className="h-[40vh] w-full flex-shrink-0 md:h-full md:w-[50%]"
        />
        <Flex dir="col" className="flex-1 md:w-[50%]">
          <Flex gap={4} dir="col" alignItems="start" className="p-4">
            <Link
              href={`/club/${feed.clubProfile.id}`}
              className="flex items-center gap-2"
            >
              <Avatar
                src={feed.clubProfile.profileImageCdnUrl}
                alt={feed.clubProfile.name}
                size="sm"
                className="my-auto object-cover"
              />
              <Body1 weight="semibold">{feed.clubProfile.name}</Body1>
            </Link>
            <Flex dir="row" justifyContent="between" className="w-full">
              <Body2 weight="medium">{feed.activityContent}</Body2>
              <Caption1 weight="medium" className="text-gray-500">
                {feed.createdDate}
              </Caption1>
            </Flex>
            <FeedStats
              likeCount={likeCount}
              commentCount={feed.commentCount}
              viewCount={feed.viewCount}
              size="sm"
              onLike={handleLike}
            />
          </Flex>
          <Flex dir="col" className="flex-1 overflow-y-auto p-4">
            <CommentList comments={feed.comments} />
          </Flex>
          <CommentInput
            feedId={feedId}
            className="border-t border-gray-200 p-3"
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
