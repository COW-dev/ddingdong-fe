import Link from 'next/link';

import {
  Card,
  Title3,
  Body1,
  Body2,
  Body3,
  Flex,
} from 'ddingdong-design-system';

import { NoticeTitle } from '@/app/_api/types/notice';

import { ROLE_DASHBOARD } from '../_constants/text';

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
        {noticeData
          .slice(0, 3)
          .splice(0)
          .map((notice) => (
            <NoticeWrapper key={notice.id}>
              <Link
                href={`/notice/${notice.id}`}
                className="inline-block w-full pt-3 pb-4 transition-opacity hover:opacity-50 md:pt-3.5 md:pb-4.5"
              >
                <Body1 className="block sm:hidden">
                  {notice.title?.length < 21
                    ? notice?.title
                    : notice.title?.substring(0, 21) + '..'}
                </Body1>
                <Body2 className="hidden sm:block">{notice.title}</Body2>
                <Body3 weight="medium" className="mt-0.5 mb-2 text-gray-400">
                  {new Date(notice.createdAt).toLocaleDateString()}
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
