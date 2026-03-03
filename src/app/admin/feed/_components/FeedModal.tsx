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
import { FeedMedia } from '@/app/feeds/_components/FeedMedia';
import { FeedStats } from '@/app/feeds/_components/FeedStats';

import { AdminCommentList } from './AdminCommentList';

type FeedModalProps = {
  feedId: number;
  isOpen: boolean;
  closeModal: () => void;
};

export function FeedModal({ feedId, isOpen, closeModal }: FeedModalProps) {
  const { data: feed } = useSuspenseQuery(feedQueryOptions.detail(feedId));

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} className="z-100">
      <Flex
        gap={4}
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
            <Flex gap={2} dir="row" justifyContent="between" className="w-full">
              <Body2 weight="medium">{feed.activityContent}</Body2>
              <Caption1 weight="medium" className="text-gray-500">
                {feed.createdDate}
              </Caption1>
            </Flex>
            <FeedStats
              likeCount={feed.likeCount}
              commentCount={feed.commentCount}
              viewCount={feed.viewCount}
              size="sm"
            />
          </Flex>
          <Flex dir="col" className="flex-1 overflow-y-auto p-4">
            <AdminCommentList feedId={feedId} comments={feed.comments} />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
}
