'use client';
import { PropsWithChildren } from 'react';

import { Body1, Flex, usePortal } from 'ddingdong-design-system';

import { ClubHeading } from '@/app/club/[id]/_components/header/ClubHeading';
import { useClubStore } from '@/store/club';

import { ActionButton } from '../_components/ActionButton';
import { ClubFeed } from '../_components/ClubFeed';
import { DeleteModal } from '../_components/DeleteModal';
import { RankContainer } from '../_components/RankContainer';
import { useFeedAdmin } from '../_hooks/useFeedAdmin';

export function FeedAdminClientPage() {
  const { isOpen, openModal, closeModal } = usePortal();
  const club = useClubStore((state) => state.club);

  const {
    feeds,
    observerTarget,
    editMode,
    selectedFeed,
    handleRadioChange,
    handleEditModeChange,
    handleDelete,
  } = useFeedAdmin();

  return (
    <>
      <Flex justifyContent="between" alignItems="center" className="mt-2">
        <ClubHeading
          name={club?.name ?? ''}
          tag={club?.tag ?? ''}
          category={club?.category ?? ''}
          profileImage={club?.profileImage ?? { originUrl: '', cdnUrl: '' }}
        />
        <ActionButton
          editMode={editMode}
          selectedFeed={selectedFeed}
          onEditModeChange={handleEditModeChange}
          onDeleteClick={openModal}
        />
      </Flex>

      <Flex dir="col" className="my-5">
        <RankContainer />
      </Flex>
      <Flex className="mt-3 w-full">
        {feeds.length === 0 ? (
          <Flex justifyContent="center" alignItems="center" className="h-96">
            <Body1 className="text-gray-500">등록된 게시물이 없습니다.</Body1>
          </Flex>
        ) : (
          <FeedAdminContainer>
            <ClubFeed
              feeds={feeds}
              editMode={editMode}
              selectedFeedId={selectedFeed}
              onFeedSelect={handleRadioChange}
            />
            <div ref={observerTarget} className="h-5 w-full bg-transparent" />
          </FeedAdminContainer>
        )}
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onDelete={() => handleDelete(closeModal)}
        description={`선택한 ${selectedFeed}`}
      />
    </>
  );
}
export function FeedAdminContainer({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-3 gap-0.5 md:grid-cols-4">{children}</div>
  );
}
