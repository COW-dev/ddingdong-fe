import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import LeftArrow from '@/assets/leftArrow.svg';

import New from '@/assets/new.svg';
import RightArrow from '@/assets/rightArrow.svg';
import Searchumg from '@/assets/Search.svg';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import Select from '@/hooks/common/useSelect';
import { dummy } from '@/pages/admin/report/data';
import { AdminClub } from '@/types/club';

const REPORT_TYPE = {
  TERM: '주차별',
  CLUB: '동아리별',
};

const Category = () => {
  const currentTerm = 2;
  const [{ token }] = useCookies(['token']);
  const [active, setActive] = useState(REPORT_TYPE.CLUB);

  const [term, setTerm] = useState(currentTerm);
  const [club, setClub] = useState('너나들이');
  const [clubList, setClubList] = useState<string[]>([]);
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  const currentTermList = Array.from(
    { length: currentTerm },
    (_, i) => `${i + 1}`,
  );
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
    if (term === 0) return toast.error('이전 회차가 존재하지 않습니다.');
    setActive((prevActive) =>
      prevActive === REPORT_TYPE.TERM ? REPORT_TYPE.CLUB : REPORT_TYPE.TERM,
    );
  };

  const renderClubList = () => {
    return (
      <>
        <div className="no-scrollbar mt-4 h-[70%] overflow-y-scroll ">
          <div className="my-2 text-gray-500">제출 동아리</div>
          {/* {submitClubNames?.map((clubName) => ( */}
          {['띵동', 'COW']?.map((clubName) => (
            <div
              className="rounded-xl px-5 py-1
            hover:bg-gray-100"
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
              className="rounded-xl px-5 py-1  text-gray-300 "
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
            className={`flex rounded-xl px-2 hover:bg-gray-100 ${
              (Number(item) > currentTerm || !submitTerms.includes(item)) &&
              'text-gray-200 hover:bg-opacity-0'
            }`}
            key={`category-item-${index}`}
          >
            <div
              className={`mb-3  pt-3 `}
              key={item}
              onClick={() => {
                if (Number(item) > currentTerm)
                  return toast.error('해당 회차의 열람기간이 아닙니다.');
                setTerm(item);
              }}
            >
              <div> {item}회차</div>
            </div>
            <Image
              src={New}
              width={20}
              height={20}
              alt="bannerImg"
              className={`mx-2 mb-3 ${
                Number(item) !== currentTerm && 'hidden'
              }`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="hidden h-[30%] w-56 text-lg font-semibold text-gray-400 sm:block lg:left-[5%]">
        <div className="flex justify-between">
          <div
            className={`flex w-[50%] flex-col items-center rounded-xl p-3 ${
              active === REPORT_TYPE.TERM && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.TERM)}
          >
            동아리
            <div className="flex text-sm font-normal">
              {club}
              <Image
                src={Searchumg}
                width={15}
                height={15}
                alt="leftArrow"
                className="ml-1"
                onClick={() => setTerm(term - 1)}
              />
            </div>
          </div>
          <div
            className={` w-[50%] rounded-xl p-3 text-center ${
              active === REPORT_TYPE.CLUB && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.CLUB)}
          >
            회차
            <div className="flex justify-center text-sm font-normal">
              <div className="flex">
                <Image
                  src={LeftArrow}
                  width={10}
                  height={10}
                  alt="leftArrow"
                  onClick={() => {
                    if (term === 1)
                      return toast.error('이전 회차가 존재하지 않습니다.');
                    setTerm(term - 1);
                  }}
                />
                <div className="mx-2"> {term}회차</div>
                <Image
                  src={RightArrow}
                  width={10}
                  height={10}
                  alt="rightArrow"
                  onClick={() => {
                    if (term === currentTerm)
                      return toast.error('다음 회차가 열리지 않습니다.');
                    setTerm(term + 1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {active === REPORT_TYPE.CLUB ? renderClubList() : renderTermList()}
      </div>
    </>
  );
};

export default Category;
