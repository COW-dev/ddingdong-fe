import { cache } from 'react';

import { fetcher } from '@/app/_api/fetcher';
import { ClubDetail } from '@/app/_api/types/club';

import { ClubIntroduceTab } from '../ClubIntroduceTab';

const fetchClubDetail = cache(async (id: number): Promise<ClubDetail> => {
  return fetcher.get<ClubDetail>(`clubs/${id}`);
});

export async function ClubIntroTab({ id }: { id: number }) {
  const clubData = await fetchClubDetail(id);

  return (
    <ClubIntroduceTab
      introductionImage={clubData.introductionImage}
      introduction={clubData.introduction}
      activity={clubData.activity}
      ideal={clubData.ideal}
    />
  );
}
