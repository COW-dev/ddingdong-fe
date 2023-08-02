import { Dispatch, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { useAdminAllReports } from '@/hooks/api/club/useAdminAllReports';
type Props = {
  term: number;
  club: string;
  setClub: Dispatch<SetStateAction<string>>;
};
export default function ClubList({ setClub, club, term }: Props) {
  const [{ token }] = useCookies(['token']);
  const { data: allReports } = useAdminAllReports(token);
  console.log(allReports?.data);
  const submitClubNames = allReports?.data
    .filter((item) => item.term === term)
    .map((item) => item.name);

  // const submitClubNames = ['띵동', 'COW'];
  return (
    <>
      <div className="no-scrollbar mt-4 h-[70%] overflow-y-scroll ">
        <div className="my-2 text-gray-500">제출 동아리</div>
        {submitClubNames?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 hover:bg-gray-100"
            key={clubName}
            onClick={() => setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
        <div className="my-2 text-gray-500">미제출 동아리</div>
        {/* {clubList?.map((clubName) => ( */}
        {['명지서법', '너나들이']?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 text-gray-300 "
            key={clubName}
            onClick={() => setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
      </div>
    </>
  );
}
