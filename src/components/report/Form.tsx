import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker/dist/types';
import useModal from '@/hooks/common/useModal';
import { NewReport, StudentInfo } from '@/types/report';
import Modal from '../common/Modal';
import Participants from '../modal/report/Paticipants';

type ReportProps = {
  date: DateRangeType;
  uploadFiles: File | null;
  place: string;
  content: string;
  startTime: string;
  endTime: string;
  participants: StudentInfo[];
  setValue: Dispatch<SetStateAction<NewReport>>;
  setImage: Dispatch<SetStateAction<File | null>>;
};

export default function Form({
  date,
  uploadFiles,
  participants,
  setValue,
  setImage,
}: ReportProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const { openModal, visible, closeModal, modalRef } = useModal();

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
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setValue((prev) => ({ ...prev, uploadFiles: file }));
      setImage(file);
    }
  }
  function handleImageReset() {
    setImage(null);
    setValue((prev: any) => ({
      ...prev,
      uploadFiles: null,
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
              onChange={(e) => handleChange(e)}
              className="mt-3 h-12 w-full rounded-xl  border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:mt-0 md:text-base"
            />
            <input
              name="endTime"
              type="time"
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
                  {participant.name} | {participant.department} |
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
              onChange={(e) => handleChange(e)}
              className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 p-3 text-base outline-none md:pb-3"
            />
          </div>
        </div>
        <div className="flex w-full justify-center md:w-1/2 ">
          {uploadFiles ? (
            <>
              <Image
                src={previewImageUrl || ''}
                className="m-auto object-scale-down"
                alt="이미지"
                width={200}
                height={200}
              />
              <div>
                <button type="button" onClick={handleImageReset}>
                  X
                </button>
              </div>
            </>
          ) : (
            <label
              htmlFor="uploadFiles"
              className=" text-md mt-3 flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-3 font-medium text-gray-300 outline-none md:h-80 md:w-2/3"
            >
              Choose File
              <input
                id="uploadFiles"
                name="uploadFiles"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
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
