import { Dispatch, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { useAdminAllReports } from '@/hooks/api/club/useAdminAllReports';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { Club } from '@/types';
type Props = {
  term: number;
  setClub: Dispatch<SetStateAction<string>>;
};
export default function ClubList({ setClub, term }: Props) {
  const { data: allClub } = useAllClubs();
  const clubList = allClub?.data
    .map((club: Club) => club.name)
    .sort((a, b) => a.localeCompare(b));
  const [{ token }] = useCookies(['token']);
  const { data: allReports } = useAdminAllReports(token);
  const submitClubNames = allReports?.data
    .filter((item) => item.term === String(term))
    .map((item) => item.name);

  const unSubmitClubNames = clubList?.filter(
    (club) => !submitClubNames?.includes(club),
  );

  return (
    <div className=" mt-4 h-[50vh] overflow-y-scroll">
      <div className="min-h-[10vh]">
        <div className="sticky top-0 my-2 text-gray-500 ">제출 동아리</div>
        {submitClubNames?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 hover:bg-gray-100"
            key={clubName}
            onClick={() => setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
      </div>
      <div className="min-h-[10vh]">
        <div className="sticky top-0 my-2 text-gray-500 ">미제출 동아리 </div>
        {unSubmitClubNames?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 text-gray-300 "
            key={clubName}
            onClick={() => setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
      </div>
    </div>
  );
}
