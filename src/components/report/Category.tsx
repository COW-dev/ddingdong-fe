import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import New from '@/assets/new.svg';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { dummy } from '@/pages/admin/report/data';
import { AdminClub } from '@/types/club';

const REPORT_TYPE = {
  TERM: '주차별',
  CLUB: '동아리별',
};

const Category = () => {
  const [{ token }] = useCookies(['token']);
  const currentTerm = useCurrentReports(token);

  const [active, setActive] = useState(REPORT_TYPE.CLUB);

  const [term, setTerm] = useState('1');
  const [club, setClub] = useState('너나들이');
  const [clubList, setClubList] = useState<string[]>([]);
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  const { data: clubs } = useAdminAllClubs(token);
  const submitClubNames = dummy
    .filter((item) => item.term === term)
    .map((item) => item.name);
  const submitTerms = dummy
    .filter((item) => item.name === club)
    .map((item) => item.term);
  console.log(submitClubNames);

  useEffect(() => {
    if (clubs) {
      const clubsData: AdminClub[] = clubs.data;
      const clubNames: string[] = clubsData.map((club: AdminClub) => club.name);
      setClubList(clubNames);
    }
  }, [clubs]);

  const handleReportType = () => {
    setActive((prevActive) =>
      prevActive === REPORT_TYPE.TERM ? REPORT_TYPE.CLUB : REPORT_TYPE.TERM,
    );
  };

  const renderClubList = () => {
    return (
      <>
        <div className="no-scrollbar mt-4 h-[70%] overflow-y-scroll ">
          <div className=" my-2">제출 동아리</div>
          {submitClubNames?.map((clubName) => (
            <div
              className="rounded-xl px-2  py-1 
            hover:bg-gray-100"
              key={clubName}
              onClick={() => setClub(clubName)}
            >
              {clubName}
            </div>
          ))}
          <div className=" my-2">미제출 동아리</div>
          {clubList?.map((clubName) => (
            <div
              className="rounded-xl px-2 py-1  text-gray-300 hover:bg-gray-100"
              key={clubName}
              onClick={() => setClub(clubName)}
            >
              {clubName}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTermList = () => {
    return (
      <div className="no-scrollbar mt-4 h-[100%] overflow-y-scroll">
        {termList.map((item, index) => (
          <div
            className="flex rounded-xl px-2 hover:bg-gray-100"
            key={`category-item-${index}`}
          >
            <div
              className={`mb-3  ${
                (Number(item) > Number(currentTerm) ||
                  !submitTerms.includes(item)) &&
                'text-gray-200'
              }`}
              key={item}
              onClick={() => {
                if (Number(item) > Number(currentTerm))
                  return toast.error('해당 회차의 열람기간이 아닙니다.');
                setTerm(item);
              }}
            >
              {item}회차
            </div>
            <Image
              src={New}
              width={20}
              height={20}
              alt="bannerImg"
              className={`mx-2 mb-3 ${
                Number(item) !== Number(currentTerm) && 'hidden'
              }`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className=" hidden h-[30%] w-56 text-lg font-semibold text-gray-400 sm:block lg:left-[5%]">
        <div className="flex justify-between">
          <div
            className={` w-[50%] rounded-xl p-3 text-center ${
              active === REPORT_TYPE.TERM && `bg-gray-100 text-gray-500`
            }`}
            onClick={handleReportType}
          >
            주차
            <div className="text-sm font-light">{term}주차</div>
          </div>
          <div
            className={` w-[50%] rounded-xl p-3 text-center ${
              active === REPORT_TYPE.CLUB && `bg-gray-100 text-gray-500`
            }`}
            onClick={handleReportType}
          >
            동아리
            <div className="text-sm font-light">{club}</div>
          </div>
        </div>
        {active === REPORT_TYPE.CLUB ? renderClubList() : renderTermList()}
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontWeight: 600,
            padding: '0.75rem 1rem',
            marginTop: '0.5rem',
          },
        }}
      />
    </>
  );
};

export default Category;
