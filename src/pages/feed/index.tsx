import { useEffect, useState } from 'react';
import Head from 'next/head';
import ClubFeed from '@/components/feed/ClubFeed';
import { useAllFeeds } from '@/hooks/api/feed/useAllFeeds';
import { Feed } from '@/types/feed';

export default function Index() {
  const [feeds, setFeeds] = useState<Array<Feed>>([]);
  const { data } = useAllFeeds();

  useEffect(() => {
    if (data) {
      setFeeds(data.data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>띵동 - 동아리피드</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        {feeds.length === 0 ? (
          <div className="mt-40 text-base font-medium text-gray-500">
            등록된 게시물이 없습니다.
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-3">
              <ClubFeed feeds={feeds} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
