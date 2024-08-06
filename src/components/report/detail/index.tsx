import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import Cry from '@/assets/cry.png';
import Modal from '@/components/common/Modal';
import Participants from '@/components/modal/report/Paticipants';
import { ROLE_TYPE } from '@/constants/text';
import useModal from '@/hooks/common/useModal';
import { ReportDetail } from '@/types/report';
import { parseImgUrl } from '@/utils/parse';
import ActiveDate from './ActiveDate';
import Place from './Place';

type Props = {
  reportData: ReportDetail;
  isEditing?: boolean;
  setReportData?: Dispatch<SetStateAction<ReportDetail[]>>;
  image?: File | null;
  setImage?: Dispatch<SetStateAction<File | null>>;
};

export default function Index({ reportData, isEditing, setReportData }: Props) {
  const { id, content, place, startDate, endDate, imageUrls, participants } =
    reportData ?? {};

  const [data, setData] = useState(reportData);
  const [{ role }] = useCookies(['role']);
  const showImage = imageUrls && imageUrls[0] ? parseImgUrl(imageUrls[0]) : Cry;
  useEffect(() => {
    setData(data);
  }, [imageUrls, data]);

  const [info, setInfo] = useState<boolean>(true);
  const { openModal, visible, closeModal, modalRef } = useModal();

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
    key: string,
    id: number,
  ) {
    setReportData &&
      setReportData((prev) => {
        const updatedReportData = prev.map((report) =>
          report.id === id ? { ...report, [key]: event.target.value } : report,
        );
        return updatedReportData;
      });
  }

  return (
    <div className="flex flex-col items-center md:m-3 md:flex-row md:justify-evenly lg:justify-between">
      <div className="mb-2 flex flex-col">
        {/* sm */}
        <div className="mb-4 inline-block md:hidden">
          <div className="z-10 flex w-full flex-col items-center rounded-xl ">
            <div className="relative">
              <Image
                src={showImage}
                priority
                className="bg-gray-50 object-cover"
                alt="reportImage"
                width={500}
                height={500}
              />
              <div
                className={`absolute right-2 ${
                  info ? `top-[11vh]` : `top-[1vh]`
                } z-30`}
              >
                <Image
                  src={info ? ArrowUp : ArrowDown}
                  width={20}
                  height={20}
                  className={`${
                    !info && `w-10 rounded-full bg-white p-2 opacity-70`
                  }`}
                  alt="show"
                  onClick={() => setInfo(!info)}
                />
              </div>
              {info && (
                <div className="absolute top-0 z-20 flex w-full flex-1 justify-between bg-white bg-opacity-70 text-gray-500">
                  <div className="m-3">
                    <div className="text-xl font-semibold">1 회차</div>
                    <ActiveDate startDate={startDate} endDate={endDate} />
                  </div>
                  <Place place={place} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* sm끗 */}
        {/* md */}
        <div className="hidden md:inline-block">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <ActiveDate startDate={startDate} endDate={endDate} />
            <Place place={place} />
          </div>
        </div>
        {/* md끗 */}

        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          {isEditing ? (
            <div
              onClick={openModal}
              className="md:text-md min-h-[10vh] 
             w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4
             py-3 text-base outline-none md:pb-3"
            >
              {participants.map((participant, index) => (
                <div
                  key={`participant-${index}`}
                  className={`${participant.name === `` && `hidden`} `}
                >
                  {participant.name} | {participant.department} |
                  {participant.studentId}
                </div>
              ))}
            </div>
          ) : (
            <ul
              className={`md:text-md grid  w-full grid-cols-1 gap-1.5 text-base font-medium opacity-70 md:grid-cols-1 md:pb-3 ${
                role === ROLE_TYPE.ROLE_CLUB && `lg:grid-cols-2`
              }`}
            >
              {participants?.map((participant, index) => (
                <li
                  key={`participant-${index}`}
                  className={`${participant.name === '' && `hidden`}`}
                >
                  {participant.name} | {participant.studentId} |
                  {participant.department}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          {isEditing ? (
            <textarea
              name="content"
              value={content}
              onChange={(e) => handleChange(e, 'content', id)}
              className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 p-3 text-base outline-none md:pb-3"
            />
          ) : (
            <span className="md:text-md h-24 w-full rounded-xl text-base font-medium opacity-70 md:pb-3">
              {content}
            </span>
          )}
        </div>
      </div>
      <div className={`hidden md:block`}>
        <Image
          src={showImage}
          className={`bg-gray-50 object-cover `}
          alt="reportImage"
          priority
          width={300}
          height={300}
        />
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title="활동 명단 작성하기"
        closeModal={closeModal}
      >
        <Participants
          data={participants}
          setData={setReportData}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}
