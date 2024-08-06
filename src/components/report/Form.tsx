import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker/dist/types';
import useModal from '@/hooks/common/useModal';
import { NewReport } from '@/types/report';
import Modal from '../common/Modal';
import UploadImage from '../common/UploadImage';
import Participants from '../modal/report/Paticipants';

type ReportProps = {
  uploadFiles: File | null;
  report: NewReport;
  setValue: Dispatch<SetStateAction<NewReport>>;
  setImage: Dispatch<SetStateAction<File | null>>;
};

export default function Form({
  uploadFiles,
  setValue,
  setImage,
  report,
}: ReportProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const { openModal, visible, closeModal, modalRef } = useModal();
  const { date, participants, place, content, startTime, endTime, imageUrls } =
    report;

  useEffect(() => {
    if (uploadFiles) {
      setImage(uploadFiles);
      const imageUrl = URL.createObjectURL(uploadFiles);
      setPreviewImageUrl(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else {
      setPreviewImageUrl(null);
    }
  }, [setImage, uploadFiles]);

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
              inputClassName=" w-full h-12  px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 rounded-xl md:pb-3 placeholder:text-sm outline-none md:text-base"
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
          <p className=" text-md mt-3 font-semibold text-blue-500 md:my-2 md:text-lg">
            활동 시간
          </p>
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
              className="md:text-md min-h-[10vh] 
               w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4
               py-3 text-base outline-none md:pb-3"
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
        <div className="h-1/2 w-full  md:ml-2 md:w-1/2">
          <UploadImage
            image={uploadFiles}
            setImage={setImage}
            imageUrls={imageUrls}
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
