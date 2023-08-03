import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import SearchImg from '@/assets/search.svg';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { AdminClub } from '@/types/club';
import ClubList from './ClubList';
import TermList from './TermList';
import ModalPortal from '../../common/ModalPortal';

const REPORT_TYPE = {
  TERM: '주차별',
  CLUB: '동아리별',
};
type Props = {
  visible: boolean;
  club: string;
  term: number;
  setClub: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setTerm: Dispatch<SetStateAction<number>>;
};
const Category = ({ visible, setVisible }: Props) => {
  const [{ token }] = useCookies(['token']);
  const currentTerm = useCurrentReports(token).data?.data.term ?? 1;
  const [active, setActive] = useState<string>(REPORT_TYPE.CLUB);
  const [term, setTerm] = useState(currentTerm);
  const [club, setClub] = useState('COW'); //default
  const [clubList, setClubList] = useState<string[]>([]);
  const { data: clubs } = useAdminAllClubs(token);

  useEffect(() => {
    if (clubs) {
      const clubsData: AdminClub[] = clubs.data;
      const clubNames: string[] = clubsData.map((club: AdminClub) => club.name);
      setClubList(clubNames);
    }
  }, [clubs]);

  const element = () => {
    return (
      <>
        <div className="flex justify-between  overflow-y-scroll md:mt-8">
          <div
            className={`m-1 flex w-[50%] flex-col items-center rounded-xl p-3 ${
              active === REPORT_TYPE.TERM && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.TERM)}
          >
            동아리
            <div className="flex text-sm font-normal">
              <div className="max-w-[90%] truncate"> {club}</div>
              <Image
                src={SearchImg}
                width={15}
                height={15}
                alt="search"
                className=""
                // onClick={() => setTerm(term - 1)}
              />
            </div>
          </div>
          <div
            className={`m-1 w-[50%] rounded-xl p-3 text-center ${
              active === REPORT_TYPE.CLUB && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.CLUB)}
          >
            {term}회차
            <div className="flex justify-center text-sm font-normal">
              <div className="flex">
                <Image
                  src={LeftArrow}
                  width={10}
                  height={10}
                  alt="leftArrow"
                  onClick={() => {
                    if (Number(term) === 1)
                      return toast.error('이전 회차가 존재하지 않습니다.');
                    setTerm(term && term - 1);
                  }}
                />
                <div className="mx-2"> {term}회차</div>
                <Image
                  src={RightArrow}
                  width={10}
                  height={10}
                  alt="rightArrow"
                  onClick={() => {
                    if (Number(term) === Number(currentTerm))
                      return toast.error('다음 회차가 열리지 않습니다.');
                    setTerm(term && term + 1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="m-5">
          {active === REPORT_TYPE.CLUB ? (
            <ClubList term={term} club={club} setClub={setClub} />
          ) : (
            <TermList term={term} club={club} setTerm={setTerm} />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="hidden md:inline-block">
        {/* sm */}
        <div className=" md:hidden ">
          {!visible && (
            <ModalPortal>
              <div
                className={`fixed left-0 top-0 z-20 h-[100vh] w-screen 
                ${!visible && `bg-black bg-opacity-10 md:bg-opacity-0`}`}
                onClick={() => {
                  setVisible((visible: boolean) => !visible);
                }}
              >
                <div
                  className={`fixed bottom-0 h-[70%] w-full overflow-hidden rounded-2xl bg-white text-lg  font-semibold text-gray-400  md:hidden`}
                  onClick={() => {
                    setVisible((visible: boolean) => !visible);
                  }}
                >
                  {element()}
                </div>
              </div>
            </ModalPortal>
          )}
        </div>
        {/* sm 끗*/}
      </div>
      {/* md */}
      <div className="hidden h-[30%] w-56 text-lg font-semibold text-gray-400 sm:block lg:left-[5%]">
        {element()}
      </div>
      {/* md 끗*/}
    </>
  );
};
export default Category;
