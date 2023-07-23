import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import New from '@/assets/new.svg';
import switchImg from '@/assets/switch.svg';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import { dummy } from '@/pages/admin/report/data';
import { AdminClub } from '@/types';

const REPORT_TYPE = {
  TERM: '주차별',
  CLUB: '동아리별',
};

export default function Category() {
  const currentTerm = 2;
  const [{ token }] = useCookies(['token']);
  const [active, setAvtice] = useState<string>(REPORT_TYPE.CLUB);

  //filter 기준
  const [term, setTerm] = useState<number>(1);
  const [club, setClub] = useState<string>('cow');

  //전체 data
  const [clubList, setClubList] = useState<Array<string>>();
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  const { data: clubs } = useAdminAllClubs(token);

  //제출 data
  const submitclub = dummy
    .filter((item) => Number(item.term) === term)
    .map((item) => item.name);
  const submitterm = dummy
    .filter((item) => item.name === club)
    .map((item) => item.term);

  useEffect(() => {
    if (clubs) {
      const clubsData: AdminClub[] = clubs.data;
      const clubNames: string[] = clubsData.map((club: AdminClub) => club.name);
      setClubList(clubNames);
    }
  }, [clubs]);

  const handleReportType = () => {
    setAvtice((prevActive) =>
      prevActive === REPORT_TYPE.TERM ? REPORT_TYPE.CLUB : REPORT_TYPE.TERM,
    );
  };

  return (
    <div className="fixed top-[30%] hidden h-[40%] w-56 text-lg font-semibold text-gray-400 sm:block lg:left-[5%]">
      <div className="mb-3">한 눈에 확인</div>
      <div className="mb-3 flex" onClick={handleReportType}>
        <Image
          src={switchImg}
          width={30}
          height={30}
          alt="bannerImg"
          className="mx-2 drop-shadow-sm"
        />
        <div className="text-blue-500">{active}</div>
      </div>
      <div className=" no-scrollbar h-[100%] overflow-y-scroll">
        {active === REPORT_TYPE.CLUB
          ? clubList?.map((item) => (
              <div className="mb-3" key={item}>
                {item}
              </div>
            ))
          : termList.map((item, index) => (
              <div className="flex" key={`category-item-${index}`}>
                <div
                  className={`mb-3 ${
                    (Number(item) > currentTerm ||
                      submitterm.find((fruit) => fruit === item)) &&
                    `cursor-not-allowed text-gray-200`
                  }`}
                  key={item}
                >
                  {item}회차
                </div>
                <Image
                  src={New}
                  width={20}
                  height={20}
                  alt="bannerImg"
                  className={`mx-2 mb-3 ${
                    Number(item) !== currentTerm && `hidden`
                  }`}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
