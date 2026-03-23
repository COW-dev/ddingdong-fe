import Link from 'next/link';

import { Card, Title3, Body2, Body3, Flex } from '@dds/shared';

import { NoticeTitle } from '@/_api/types/notice';

import { ROLE_DASHBOARD } from '../_constants/dashboard';

type NoticeCardProps = {
  role: string;
  noticeData: NoticeTitle[];
};

export function NoticeCard({ role, noticeData }: NoticeCardProps) {
  return (
    <Card className="mt-4 hover:bg-transparent md:mt-8">
      <Flex justifyContent="between" alignItems="center">
        <Title3 as="h3" weight="bold">
          {ROLE_DASHBOARD[role].notice.title}
        </Title3>
        <Link
          href={ROLE_DASHBOARD[role].notice.route}
          className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 md:text-base"
        >
          더 보기
        </Link>
      </Flex>
      <NoticeContainer>
        {noticeData.slice(0, 3).map((notice) => (
          <NoticeWrapper key={notice.id}>
            <Link
              href={`/notice/${notice.id}`}
              className="md:pb-4.5 inline-block w-full pb-4 pt-3 transition-opacity hover:opacity-50 md:pt-3.5"
            >
              <Body2 className="line-clamp-1">{notice.title}</Body2>
              <Body3 weight="medium" className="mb-2 mt-0.5 text-gray-400">
                {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
              </Body3>
            </Link>
          </NoticeWrapper>
        ))}
      </NoticeContainer>
    </Card>
  );
}

const NoticeContainer = ({ children }: { children: React.ReactNode }) => {
  return <ul className="mt-8 w-full md:mt-10">{children}</ul>;
};

const NoticeWrapper = ({ children }: { children: React.ReactNode }) => {
  return <li className="mb-1 w-full border-b border-gray-200">{children}</li>;
};
