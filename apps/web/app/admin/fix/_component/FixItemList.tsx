'use client';
import Link from 'next/link';

import { Badge, Body1, Caption1 } from '@dds/shared';
import { useSuspenseQuery } from '@tanstack/react-query';

import { fixQueryOptions } from '@/_api/queries/fix';
import { Fix } from '@/_api/types/fix';
import { EmptyText } from '@/admin/fix/_component/EmptyText';

import {
  FixItemContainer,
  FixItemListContainer,
} from '../_container/FixItemListContainer';

export function FixItemList({
  queryOptions,
}: {
  queryOptions:
    | ReturnType<typeof fixQueryOptions.my>
    | ReturnType<typeof fixQueryOptions.all>;
}) {
  const { data: posts } = useSuspenseQuery(queryOptions);
  const sortedPosts = sortPosts(posts);

  if (posts.length === 0) return <EmptyText />;

  return (
    <FixItemListContainer>
      {sortedPosts.map((fix, index) => (
        <FixItem data={fix} key={index} />
      ))}
    </FixItemListContainer>
  );
}

function FixItem({ data }: { data: Fix }) {
  const { id, title, requestedAt, isCompleted, clubName } = data;
  const truncatedTitle =
    title && title.length > 15 ? `${title.slice(0, 15)}..` : title;
  const formattedDate = new Date(requestedAt).toLocaleDateString();

  return (
    <FixItemContainer>
      <Link href={`/fix/${id}`} className="w-full">
        <Body1>{truncatedTitle}</Body1>
        <Caption1 weight="normal" className="text-gray-400">
          {formattedDate} | {clubName}
        </Caption1>
      </Link>
      <Badge
        variant={isCompleted ? 'positive' : 'neutral'}
        text={isCompleted ? '처리 완료' : '처리중'}
      />
    </FixItemContainer>
  );
}

function sortPosts(posts: Fix[]): Fix[] {
  return [...posts].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return Number(a.isCompleted) - Number(b.isCompleted);
    }

    const dateA = new Date(a.requestedAt).getTime();
    const dateB = new Date(b.requestedAt).getTime();
    return dateB - dateA;
  });
}
