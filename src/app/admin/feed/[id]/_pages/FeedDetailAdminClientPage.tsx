'use client';

import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Avatar, Body1, Body2, Caption1, Flex } from 'ddingdong-design-system';

import { AdminCommentList } from '@/app/admin/feed/_components/AdminCommentList';
import { feedQueryOptions } from '@/app/_api/queries/feed';
import { FeedMedia } from '@/app/feeds/_components/FeedMedia';
import { FeedStats } from '@/app/feeds/_components/FeedStats';

type FeedDetailAdminClientPageProps = {
  feedId: number;
};

export function FeedDetailAdminClientPage({
  feedId,
}: FeedDetailAdminClientPageProps) {
  const { data: feed } = useSuspenseQuery(feedQueryOptions.detail(feedId));

  return (
    <Flex dir="col" className="min-h-screen bg-white">
      <Flex
        alignItems="center"
        gap={3}
        className="border-b border-gray-200 p-4"
      >
        <Link
          href={`/club/${feed.clubProfile.id}`}
          className="flex items-center gap-3"
        >
          <Avatar
            src={feed.clubProfile.profileImageCdnUrl}
            alt={feed.clubProfile.name}
            size="md"
            className="object-cover"
          />
          <Flex dir="col">
            <Body1 weight="semibold">{feed.clubProfile.name}</Body1>
            <Caption1 className="text-gray-500">{feed.createdDate}</Caption1>
          </Flex>
        </Link>
      </Flex>

      <FeedMedia
        feedType={feed.feedType}
        mediaUrl={feed.fileUrls.cdnUrl}
        className="aspect-square w-full"
      />

      <Flex dir="col" className="p-4">
        <FeedStats
          likeCount={feed.likeCount}
          commentCount={feed.commentCount}
          viewCount={feed.viewCount}
        />
        <Body2 className="mt-3">{feed.activityContent}</Body2>
      </Flex>
      <Flex dir="col" className="border-t border-gray-200 p-4">
        <AdminCommentList feedId={feedId} comments={feed.comments} />
      </Flex>
    </Flex>
  );
}
