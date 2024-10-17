import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker/dist/types';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import useModal from '@/hooks/common/useModal';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { EditReport } from '@/types/report';
import Modal from '../common/Modal';
import UploadImage from '../common/UploadImage';
import Participants from '../modal/report/Paticipants';

type ReportProps = {
  uploadFiles: File | null;
  report: EditReport;
  setValue: Dispatch<SetStateAction<EditReport>>;
  setImage: Dispatch<SetStateAction<File | null>>;
  setRemoveFile: Dispatch<SetStateAction<boolean>>;
  id: number;
};

export default function Form({
  uploadFiles,
  setValue,
  setImage,
  report,
  setRemoveFile,
  id,
}: ReportProps) {
  const [{ token }] = useCookies(['token']);
  const {
    data: { data },
  } = useMyClub(token);

  const { openModal, visible, closeModal, modalRef } = useModal();

  const {
    date,
    participants,
    place,
    content,
    startTime,
    endTime,
    imageUrl,
    term,
  } = report;

  const { getKey } = usePresignedUrl(`activity-report/${term}/${data.name}`);

  const fetchKey = async () => {
    if (!uploadFiles) return;
    const key = await getKey(uploadFiles);
    setValue((prev) => ({
      ...prev,
      key,
    }));
  };

  useEffect(() => {
    fetchKey();
  }, [uploadFiles]);

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleDateChange(selectedDate: DateValueType) {
    setValue((prev) => ({
      ...prev,
      date: selectedDate as DateRangeType,
    }));
  }

  function handleClickTimeReset() {
    setValue((prev) => ({
      ...prev,
      startTime: '',
      endTime: '',
    }));
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between md:m-3 md:flex-row">
        <div className="flex w-full flex-col md:w-2/3 ">
          <div className="mb-3 flex flex-col items-center md:flex-row">
            <Datepicker
              value={date}
              datepicker-format="yyyy/mm/dd"
              useRange={false}
              asSingle
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={handleDateChange}
              inputClassName="w-full h-12  px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 rounded-xl md:pb-3 placeholder:text-sm outline-none md:text-base"
            />
            <input
              name="place"
              type="text"
              placeholder="활동장소"
              value={place}
              onChange={(e) => handleChange(e)}
              className="md:text-md mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-base outline-none md:ml-3 md:mt-0 md:pb-3"
            />
          </div>
          <div className="mt-3 flex items-center justify-between md:my-2">
            <p className="text-md font-semibold text-blue-500 md:text-lg">
              활동 시간
            </p>
            <div
              role="button"
              onClick={handleClickTimeReset}
              className="flex h-fit flex-col justify-center rounded-xl bg-blue-100 px-2 py-1 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:py-2"
            >
              초기화
            </div>
          </div>
          <div className="mb-3 flex flex-col items-center md:flex-row">
            <input
              name="startTime"
              type="time"
              value={startTime}
              onChange={(e) => handleChange(e)}
              className="mt-3 h-12 w-full rounded-xl  border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:mt-0 md:text-base"
            />
            <input
              name="endTime"
              type="time"
              value={endTime}
              onChange={(e) => handleChange(e)}
              className=" mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:ml-3 md:mt-0 md:text-base"
            />
          </div>
          <div onClick={openModal}>
            <p className="text-md mb-3 font-semibold text-blue-500 md:my-2 md:text-lg">
              활동 참여 인원
            </p>
            <div
              className="min-h-[10vh] w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4
               py-3 text-base outline-none"
            >
              {participants.map((participant, index) => (
                <div
                  key={`participant-${index}`}
                  className={`${participant.name === `` && `hidden`} `}
                >
                  {participant.name}
                  <span className="px-1">|</span>
                  {participant.department}
                  <span className="px-1">|</span>
                  {participant.studentId}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-md my-3 font-semibold text-blue-500 md:text-lg">
              활동 내용
            </p>
            <textarea
              name="content"
              value={content}
              onChange={(e) => handleChange(e)}
              className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 p-3 text-base outline-none md:pb-3"
            />
          </div>
        </div>
        <div className="h-1/2 w-full md:ml-2 md:w-1/2">
          <UploadImage
            image={uploadFiles}
            setImage={setImage}
            imageUrls={[imageUrl.cdnUrl]}
            setRemoveFile={setRemoveFile}
            id={id}
          />
        </div>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'활동 명단 작성하기'}
        closeModal={closeModal}
      >
        <Participants
          data={participants}
          setData={setValue}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}
