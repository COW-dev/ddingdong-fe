'use client';

import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Body2, Button, Flex, Title1, Title2 } from 'ddingdong-design-system';

import { noticeQueryOptions } from '@/app/_api/queries/notice';

import { NoticeDetailContent } from '../_components/NoticeDetailContent';
import { NoticeDetailFile } from '../_components/NoticeDetailFile';

export function NoticeDetailClientPage({ id }: { id: number }) {
  const router = useRouter();
  const { data: noticeDetail } = useSuspenseQuery(
    noticeQueryOptions.detail(id),
  );

  return (
    <>
      <Title1 as="h1" weight="bold" className="pt-7 md:pt-10">
        {noticeDetail.title}
      </Title1>
      <Body2 weight="medium" className="my-2 text-gray-300">
        {new Date(noticeDetail.createdAt ?? '').toLocaleString()}
      </Body2>
      <div className="border-b border-gray-200" />
      <NoticeDetailContent
        content={noticeDetail.content}
        images={noticeDetail.images}
      />
      <div className="border-b border-gray-200" />
      <NoticeDetailFile files={noticeDetail.files} />
      <Flex justifyContent="end">
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => router.push('/notice')}
        >
          <Body2>목록으로 돌아가기</Body2>
        </Button>
      </Flex>
    </>
  );
}
