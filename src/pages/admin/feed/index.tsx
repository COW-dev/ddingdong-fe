import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import ClubSummary from '@/components/club/ClubSummary';
import AlertDialog from '@/components/common/AlertDialog';
import Modal from '@/components/common/Modal';
import ClubFeed from '@/components/feed/ClubFeed';
import Loading from '@/components/loading/Loading';
import { OBSERVER_OPTIONS } from '@/constants/observer';
import { useDeleteFeed } from '@/hooks/api/feed/useDeleteFeed';
import { useMyFeeds } from '@/hooks/api/feed/useMyFeeds';
import useModal from '@/hooks/common/useModal';
import { useClubStore } from '@/store/club';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedFeed, setSelectedFeed] = useState<number>(0);
  const { openModal, visible, closeModal, modalRef } = useModal();

  const club = useClubStore((state) => state.club);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyFeeds(token);

  const deleteMutation = useDeleteFeed();
  const feeds = data?.pages.flatMap((page) => page.data.clubFeeds) ?? [];

  const handleRadioChange = (id: number) => {
    setSelectedFeed(id);
  };

  const handleDelete = () => {
    if (editMode && selectedFeed) {
      deleteMutation.mutate({
        feedId: selectedFeed,
        token,
      });
    }
    closeModal();
  };
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

  if (!club) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-base font-medium text-gray-500">
          동아리 정보가 존재하지 않아요.
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>띵동 - 피드</title>
      </Head>
      <div className="mt-2 flex items-center justify-between">
        <ClubSummary
          name={club.name}
          tag={club.tag}
          category={club.category}
          profileImageUrl={club.profileImage?.cdnUrl ?? Admin.src}
        />
        <div className="flex gap-3">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(!editMode)}
                className="rounded-xl bg-gray-100 px-4 py-2.5 text-lg font-bold text-gray-500 transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
              >
                취소
              </button>
              <button
                onClick={openModal}
                disabled={!selectedFeed}
                className={`${
                  !selectedFeed && ' disabled:cursor-not-allowed'
                } rounded-xl bg-red-50 px-4 py-3 text-lg font-bold text-red-400 hover:bg-red-100`}
              >
                삭제 하기
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-md rounded-xl bg-red-50 px-2 py-2 font-bold text-red-400 hover:bg-red-100 md:px-4 md:py-3 md:text-lg"
              >
                선택 삭제
              </button>
              <Link
                href="/feed/new"
                className="text-md rounded-xl bg-blue-100 px-2 py-2 font-bold text-blue-500 hover:bg-blue-200 md:px-4 md:py-3 md:text-lg"
              >
                파일 업로드
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="mt-10 w-full">
        {feeds.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-base font-medium text-gray-500">
              등록된 게시물이 없습니다.
            </div>
          </div>
        ) : (
          <>
            <ClubFeed
              feeds={feeds}
              viewMode="ADMIN"
              editMode={editMode}
              selectedFeedId={selectedFeed}
              onFeedSelect={handleRadioChange}
            />
            <div ref={observerTarget} className="h-5 w-full bg-transparent" />
          </>
        )}
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeButton={false}
        closeModal={closeModal}
      >
        <AlertDialog onConfirm={() => handleDelete()} onCancel={closeModal} />
      </Modal>
    </>
  );
}
