'use client';

import Link from 'next/link';

import { Flex, Body3, Body1 } from 'ddingdong-design-system';

import { NoticeTitle } from '@/app/_api/types/notice';

export function NoticeItem({ notice }: { notice: NoticeTitle }) {
  return (
    <Flex
      as="li"
      className="cursor-pointer border-b border-gray-200 p-3.5 hover:bg-gray-50 md:p-5"
    >
      <Link href={`/notice/${notice.id}`} className="w-full">
        <Body1 weight="semibold" className="line-clamp-1">
          {notice.title}
        </Body1>
        <Body3 weight="medium" className="text-gray-300">
          {new Date(notice.createdAt).toLocaleDateString()}
        </Body3>
      </Link>
    </Flex>
  );
}
