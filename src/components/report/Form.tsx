import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { type StudentInfo, type Report } from '@/types';
import Participants from './Participants';

type ReportProps = {
  date: DateRangeType;
  image: string;
  place: string;
  content: string;
  participants: StudentInfo[];
  setValue: Dispatch<SetStateAction<Report>>;
};

export default function Form({
  date,
  image,
  place,
  content,
  participants,
  setValue,
}: ReportProps) {
  const [participant, setParticipant] = useState<StudentInfo[]>([
    { studentName: '', studentId: '', studentMajor: '' },
    { studentName: '', studentId: '', studentMajor: '' },
    { studentName: '', studentId: '', studentMajor: '' },
    { studentName: '', studentId: '', studentMajor: '' },
    { studentName: '', studentId: '', studentMajor: '' },
  ]);
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  function handleDateChange(selectedDate: DateRangeType) {
    setValue((prev) => ({
      ...prev,
      date: selectedDate,
    }));
    console.log(selectedDate);
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setValue((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function handleResetImage() {
    setValue((prev) => ({
      ...prev,
      image: '',
    }));
  }
  function handleParticipantChange(
    index: number,
    updatedParticipant: StudentInfo,
  ) {
    setValue((prev) => {
      const newParticipants = [...prev.participants];
      newParticipants[index] = updatedParticipant;
      return { ...prev, participants: newParticipants };
    });
  }
  return (
    <div className=" items-center justify-center">
      <form className="flex flex-col">
        <div className="my-4 text-lg font-semibold ">활동 날짜</div>
        <div className=" w-full">
          <Datepicker
            datepicker-format="yyyy/mm/dd"
            asSingle
            value={date}
            useRange={false}
            selected={date.startDate}
            onChange={handleDateChange}
            inputClassName="w-full h-12 p-3 text-base border-2 font-medium rounded-xl md:pb-3 md:text-md"
          />
        </div>
        <div className="my-4 text-lg font-semibold">사진</div>
        {image ? (
          <div className="flex h-12 max-w-full flex-row items-center rounded-xl border-2 border-gray-200 bg-white object-contain p-3 text-base font-medium hover:border-blue-700">
            {image}
            <div className="ml-auto">
              <button type="button" className="mr-3 text-base">
                미리보기
              </button>
              <button
                type="button"
                className="ml-auto "
                onClick={handleResetImage}
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="image"
            className="text-md flex h-12 items-center rounded-xl border-2 border-gray-200 bg-white p-3 font-medium text-gray-300 hover:border-blue-700"
          >
            Choose File
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
        <div className="my-5 text-lg font-semibold">활동 장소</div>
        <input
          name="place"
          value={place}
          spellCheck={false}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          className="h-12 rounded-xl border-2 border-gray-200 p-3 text-base font-medium placeholder:text-gray-300 md:pb-3 "
        />
        <div className="my-5 text-lg font-semibold">활동 내용</div>
        <textarea
          name="content"
          value={content}
          maxLength={200}
          spellCheck={false}
          onChange={handleChange}
          placeholder="내용을 입력하세요"
          className=" h-20 rounded-xl border-2 border-gray-200 p-3 text-base font-medium placeholder:text-gray-300 md:pb-3 "
        />
        <div className="my-5 text-lg font-semibold">참여 인원 명단</div>
        <div className="grid w-full grid-cols-3 gap-2 text-sm font-semibold">
          <span className="w-sm">이름</span>
          <span className="w-sm">학번</span>
          <span className="w-sm">학과</span>
        </div>
        <div className="my-10 mt-2 h-full w-full gap-2">
          {participant?.map((participant, index) => (
            <Participants
              key={index}
              index={index}
              participant={participant}
              updateParticipant={handleParticipantChange}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
