import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Datepicker from 'react-tailwindcss-datepicker';

import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import Modal from '@/components/common/Modal';
import UploadImage from '@/components/common/UploadImage';
import Participants from '@/components/modal/report/Paticipants';
import ReportNoticeModal from '@/components/modal/reportNoticeModal';
import { ROLE_TYPE } from '@/constants/text';
import useModal from '@/hooks/common/useModal';
import { ReportDetail } from '@/types/report';
import { parseImgUrl } from '@/utils/parse';
import ActiveDate from './ActiveDate';
import Time from './Time';

type Props = {
  reportData: ReportDetail;
  isEditing?: boolean;
  setReportData?: Dispatch<SetStateAction<ReportDetail[]>>;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
};

export default function Index({
  image,
  setImage,
  reportData,
  isEditing,
  setReportData,
}: Props) {
  const {
    id,
    content,
    place,
    startDate,
    endDate,
    imageUrls,
    startTime,
    endTime,
    participants,
  } = reportData ?? {};

  const [data, setData] = useState(reportData);
  const [{ role }] = useCookies(['role']);

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
        console.log('updatedReportData', updatedReportData);
        return updatedReportData;
      });
  }
  function handleDateChange(startdate: string, key: string, id: number) {
    setReportData &&
      setReportData((prev) => {
        const updatedReportData = prev.map((report) =>
          report.id === id ? { ...report, [key]: startdate } : report,
        );
        return updatedReportData;
      });
    console.log(reportData);
  }

  return (
    <div className=" flex flex-col items-center md:m-3 md:flex-row md:justify-evenly lg:justify-between ">
      <div className="mb-2 flex flex-col">
        {/* sm */}
        <div className="mb-4 inline-block md:hidden">
          <div className="z-10 flex w-full flex-col items-center rounded-xl ">
            {isEditing ? (
              <>
                <div className="flex items-center md:flex-row">
                  <Datepicker
                    value={{ startDate: startDate, endDate: startDate }}
                    datepicker-format="yyyy/mm/dd"
                    useRange={false}
                    asSingle
                    minDate={new Date(new Date().getFullYear(), 0, 1)}
                    maxDate={new Date(new Date().getFullYear(), 11, 31)}
                    onChange={(e) =>
                      handleDateChange(String(e?.endDate), 'startDate', id)
                    }
                    inputClassName="w-full h-12 px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 rounded-xl md:pb-3 placeholder:text-sm outline-none md:text-base"
                  />
                  <input
                    name="place"
                    type="text"
                    placeholder="활동장소"
                    value={place}
                    onChange={(e) => handleChange(e, 'place', id)}
                    className="md:text-md ml-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-base outline-none md:ml-3 md:mt-0 md:pb-3"
                  />
                </div>
                <div className="my-3 flex w-full items-center md:flex-row">
                  <input
                    name="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => handleChange(e, 'startTime', id)}
                    className=" h-12 w-1/2 rounded-xl  border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:mt-0 md:text-base"
                  />
                  <input
                    name="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => handleChange(e, 'endTime', id)}
                    className=" ml-3 h-12 w-1/2 rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:ml-3 md:mt-0 md:text-base"
                  />
                </div>
                <div>
                  <UploadImage
                    image={image}
                    setImage={setImage}
                    imageUrls={imageUrls}
                  />
                </div>
              </>
            ) : (
              <div className="relative">
                <Image
                  src={parseImgUrl(imageUrls[0])}
                  className="bg-gray-50 object-cover"
                  alt="reportImage"
                  width={200}
                  height={200}
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
                    alt="show"
                    onClick={() => setInfo(!info)}
                  />
                </div>
                {info && (
                  <>
                    <div className="absolute top-0 z-20 flex w-full flex-1 justify-between bg-white bg-opacity-70 text-gray-500">
                      <div className="m-3">
                        <div className="text-xl font-semibold">1 회차</div>
                        <ActiveDate startDate={startDate} endDate={endDate} />
                      </div>
                      <Time place={place} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* sm끗 */}

        {/* md */}
        <div className="hidden md:inline-block">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            {isEditing ? (
              <div className="flex flex-col">
                <Datepicker
                  value={{ startDate: startDate, endDate: startDate }}
                  datepicker-format="yyyy/mm/dd"
                  useRange={false}
                  asSingle
                  minDate={new Date(new Date().getFullYear(), 0, 1)}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  onChange={(e) =>
                    handleDateChange(String(e?.endDate), 'startDate', id)
                  }
                  inputClassName="w-full h-12 px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 rounded-xl md:pb-3 placeholder:text-sm outline-none md:text-base"
                />
                <div className="mb-3 flex items-center md:flex-row">
                  <input
                    name="place"
                    type="text"
                    placeholder="활동장소"
                    value={place}
                    onChange={(e) => handleChange(e, 'place', id)}
                    className="md:text-md mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-base outline-none md:ml-3 md:mt-0 md:pb-3"
                  />
                </div>
                <div className="mb-3 flex w-full flex-col items-center md:flex-row">
                  <input
                    name="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => handleChange(e, 'startTime', id)}
                    className="mt-3 h-12 w-full rounded-xl  border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:mt-0 md:text-base"
                  />
                  <input
                    name="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => handleChange(e, 'endTime', id)}
                    className=" mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:ml-3 md:mt-0 md:text-base"
                  />
                </div>
              </div>
            ) : (
              <>
                <ActiveDate startDate={startDate} endDate={endDate} />
                <Time place={place} />
              </>
            )}
          </div>
        </div>
        {/* md끗 */}

        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          {isEditing ? (
            <div
              className="md:text-md min-h-[10vh] 
             w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4
             py-3 text-base outline-none md:pb-3"
            >
              {participants.map((participant, index) => (
                <div
                  onClick={openModal}
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
              className={`md:text-md grid w-full grid-cols-1 gap-1.5 text-base font-medium opacity-70 md:grid-cols-1 md:pb-3 ${
                role === ROLE_TYPE.ROLE_CLUB && `lg:grid-cols-2`
              }`}
            >
              {participants?.map((participant) => (
                <li key={participant.name}>
                  {participant.name} | {participant.studentId} |
                  {participant.department}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-3 md:p-0">
          <p className=" my-3 text-lg font-semibold text-blue-500 md:text-lg">
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
      <div className="hidden md:block">
        <UploadImage image={image} setImage={setImage} imageUrls={imageUrls} />
      </div>
      <ReportNoticeModal />
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'활동 명단 작성하기'}
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
