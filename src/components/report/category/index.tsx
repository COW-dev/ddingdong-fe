import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import SearchImg from '@/assets/search.svg';
import Modal from '@/components/common/Modal';
import Club from '@/components/modal/report/Club';
import { useAdminAllClubs } from '@/hooks/api/club/useAdminAllClubs';
import useModal from '@/hooks/common/useModal';
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
const Category = ({
  term,
  setTerm,
  club,
  setClub,
  visible,
  setVisible,
}: Props) => {
  const [{ token }] = useCookies(['token']);

  const [active, setActive] = useState<string>(REPORT_TYPE.CLUB);
  const [clubList, setClubList] = useState<string[]>([]);
  const { data: clubs } = useAdminAllClubs(token);
  const [week, setWeek] = useState<number>(term);
  const { openModal, visible: modalVisible, closeModal, modalRef } = useModal();

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
        <div className="flex justify-between  overflow-y-scroll ">
          <div
            className={`m-1 flex w-[50%] flex-col items-center rounded-xl p-3 ${
              active === REPORT_TYPE.TERM && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.TERM)}
          >
            동아리
            <div className="flex text-sm font-normal" onClick={openModal}>
              <div className="max-w-[90%] truncate"> {club}</div>
              <Image src={SearchImg} width={15} height={15} alt="search" />
            </div>
          </div>
          <div
            className={`m-1 w-[50%] rounded-xl p-3 text-center ${
              active === REPORT_TYPE.CLUB && `bg-gray-100 text-gray-500`
            }`}
            onClick={() => setActive(REPORT_TYPE.CLUB)}
          >
            회차
            <div className="flex justify-evenly text-sm font-normal">
              <div className="flex">
                <div className="flex min-w-[10px] flex-col items-center justify-center">
                  <Image
                    src={LeftArrow}
                    width={10}
                    height={10}
                    alt="leftArrow"
                    className={`${Number(week) === 1 && `hidden`}`}
                    onClick={() => {
                      setWeek(week - 1);
                    }}
                  />
                </div>
                <div className="mx-2"> {week}회차</div>
                <div className="flex min-w-[10px] flex-col items-center justify-center">
                  <Image
                    src={RightArrow}
                    width={10}
                    height={10}
                    alt="rightArrow"
                    className={`${Number(term) === Number(week) && `hidden`}`}
                    onClick={() => {
                      setWeek(week + 1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5">
          {active === REPORT_TYPE.CLUB ? (
            <ClubList term={term} setClub={setClub} />
          ) : (
            <TermList club={club} setTerm={setTerm} />
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

      <Modal
        visible={modalVisible}
        modalRef={modalRef}
        title={'동아리 검색하기'}
        closeModal={closeModal}
      >
        <Club closeModal={closeModal} setClub={setClub} />
      </Modal>
    </>
  );
};
export default Category;
