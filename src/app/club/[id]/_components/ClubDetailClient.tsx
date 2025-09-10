'use client';
import { useSuspenseQueries } from '@tanstack/react-query';

import { clubQueryOptions } from '@/app/_api/queries/club';
import { feedQueryOptions } from '@/app/_api/queries/feed';

import { ClubHeading } from './ClubHeading';
import { ClubInfo } from './ClubInfo';
import { ClubTabs } from './ClubTabs';

export const ClubDetailClient = ({ id }: { id: number }) => {
  const [{ data: clubData }, { data: feedData }] = useSuspenseQueries({
    queries: [clubQueryOptions.detail(id), feedQueryOptions.clubFeed(id)],
  });

  return (
    <>
      <ClubHeading
        name={clubData.name}
        category={clubData.category}
        tag={clubData.tag}
        profileImage={clubData.profileImage}
      />
      <ClubInfo
        leader={clubData.leader}
        phoneNumber={clubData.phoneNumber}
        location={clubData.location}
        regularMeeting={clubData.regularMeeting}
        startDate={clubData.startDate}
        endDate={clubData.endDate}
        formId={clubData.formId}
      />
      <ClubTabs clubData={clubData} feedData={feedData} />
    </>
  );
};
