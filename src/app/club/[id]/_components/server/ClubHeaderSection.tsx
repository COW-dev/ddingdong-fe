import { fetcher } from '@/app/_api/fetcher';
import { ClubDetail } from '@/app/_api/types/club';

import { ClubHeading } from '../header/ClubHeading';
import { ClubInfo } from '../header/ClubInfo';

async function fetchClubDetail(id: number): Promise<ClubDetail> {
  return fetcher.get<ClubDetail>(`clubs/${id}`);
}

export async function ClubHeaderSection({ id }: { id: number }) {
  const clubData = await fetchClubDetail(id);

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
    </>
  );
}
