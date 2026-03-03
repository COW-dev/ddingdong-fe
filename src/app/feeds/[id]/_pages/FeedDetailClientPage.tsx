'use client';

import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Avatar, Body1, Body2, Caption1, Flex } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';

import { CommentInput } from '../../_components/CommentInput';
import { CommentList } from '../../_components/CommentList';
import { FeedMedia } from '../../_components/FeedMedia';
import { FeedStats } from '../../_components/FeedStats';
import { useDebouncedLike } from '../../_hooks/useDebouncedLike';

type FeedDetailClientPageProps = {
  feedId: number;
};

export function FeedDetailClientPage({ feedId }: FeedDetailClientPageProps) {
  const { data: feed } = useSuspenseQuery(feedQueryOptions.detail(feedId));
  const { likeCount, handleLike } = useDebouncedLike({
    feedId,
    initialLikeCount: feed.likeCount,
  });

  return (
    <Flex dir="col" className="min-h-screen bg-white pb-20">
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
          likeCount={likeCount}
          commentCount={feed.commentCount}
          viewCount={feed.viewCount}
          onLike={handleLike}
        />
        <Body2 className="mt-3">{feed.activityContent}</Body2>
      </Flex>

      <Flex dir="col" className="border-t border-gray-200 p-4">
        <CommentList feedId={feedId} comments={feed.comments} />
      </Flex>

      <CommentInput
        feedId={feedId}
        className="fixed right-0 bottom-0 left-0 z-100 border-t border-gray-200 bg-white p-3"
      />
    </Flex>
  );
}
