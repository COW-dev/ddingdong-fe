'use client';

import { Body2 } from 'ddingdong-design-system';

import { Feed } from '@/app/_api/types/feed';
import { ClubFeed } from '@/app/feeds/_components/ClubFeed';
import { FeedContainer } from '@/app/feeds/_containers/FeedContainer';

type ClubFeedTabClientProps = {
  feeds: Feed[];
};

export function ClubFeedTabClient({ feeds }: ClubFeedTabClientProps) {
  if (!feeds || feeds.length === 0) {
    return (
      <Body2 className="py-20 text-center text-gray-500">
        아직 등록된 피드가 없어요.
      </Body2>
    );
  }

  return (
    <FeedContainer>
      <ClubFeed feeds={feeds} />
    </FeedContainer>
  );
}
