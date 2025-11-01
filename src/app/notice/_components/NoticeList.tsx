import { PropsWithChildren } from 'react';

import { Body1 } from 'ddingdong-design-system';

import { NoticeTitle } from '@/app/_api/types/notice';

import { NoticeItem } from './NoticeItem';

export function NoticeList({ notices }: { notices: NoticeTitle[] }) {
  return (
    <>
      {notices.length === 0 ? (
        <Body1 className="text-gray-400">공지사항이 없습니다.</Body1>
      ) : (
        <NoticeContainer>
          {notices.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} />
          ))}
        </NoticeContainer>
      )}
    </>
  );
}

function NoticeContainer({ children }: PropsWithChildren) {
  return <ul className="mt-4 w-full">{children}</ul>;
}
