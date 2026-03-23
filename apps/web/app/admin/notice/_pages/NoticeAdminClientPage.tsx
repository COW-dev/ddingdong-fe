'use client';

import { useState } from 'react';

import { Flex, Pagination, Title1 } from '@dds/shared';
import { useSuspenseQuery } from '@tanstack/react-query';

import { noticeQueryOptions } from '@/_api/queries/notice';
import { ROLE_TYPE, RoleType } from '@/_constants/role';
import { NoticeList } from '@/notice/_components/NoticeList';

import { NewActionButton } from '../_components/NewActionButton';

export function NoticeAdminClientPage({ role }: { role: keyof RoleType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: notices } = useSuspenseQuery(
    noticeQueryOptions.all(currentPage),
  );

  return (
    <>
      <Flex
        justifyContent="between"
        alignItems="center"
        className="box-border w-full"
      >
        <Title1 weight="bold" className="py-7 md:py-10">
          공지사항
          <Title1
            as="span"
            weight="bold"
            className={role === ROLE_TYPE.ROLE_CLUB ? 'hidden' : 'ml-1'}
          >
            관리하기
          </Title1>
        </Title1>
        <NewActionButton role={role} />
      </Flex>
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
