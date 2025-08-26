import { useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import ClubFeed from '@/components/feed/ClubFeed';
import Loading from '@/components/loading/Loading';
import { OBSERVER_OPTIONS } from '@/constants/observer';
import { useAllFeeds } from '@/hooks/api/feed/useAllFeeds';

export default function Index() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllFeeds();

  const feeds = data?.pages.flatMap((page) => page.data.newestFeeds) ?? [];
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, OBSERVER_OPTIONS);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

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
            <ClubFeed feeds={feeds} />
            <div ref={observerTarget} className="h-5 w-full bg-transparent" />
          </div>
        )}
      </div>
    </>
  );
}
