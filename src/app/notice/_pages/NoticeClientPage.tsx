'use client';

import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Pagination, Title1 } from 'ddingdong-design-system';

import { noticeQueryOptions } from '@/app/_api/queries/notice';

import { NoticeList } from '../_components/NoticeList';

export function NoticeClientPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: notices } = useSuspenseQuery(
    noticeQueryOptions.all(currentPage),
  );

  return (
    <>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        공지사항
      </Title1>
      <NoticeList notices={notices.notices} />
      <Pagination
        currentPage={currentPage}
        totalPages={notices.totalPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mt-10"
      />
    </>
  );
}
