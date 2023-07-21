import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import Image from 'next/image';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import { StudentInfo, Report } from '@/types';
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
      console.log(reader);
    }
  }
  function handleImageReset() {
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
    <form className="md:m-3">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-2/3 flex-col">
          <div className="mb-5 flex flex-col items-center md:flex-row">
            <Datepicker
              datepicker-format="yyyy/mm/dd"
              useRange={false}
              selected={date.startDate}
              onChange={handleDateChange}
              inputClassName="h-12 w-full px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 font-medium rounded-xl md:pb-3 md:text-md"
            />
            <input
              name="place"
              placeholder="활동 장소"
              onChange={handleChange}
              className="mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold md:ml-3 md:mt-0 md:text-base"
            />
          </div>
          <div>
            <p className=" text-md my-3 font-semibold text-blue-500 md:text-lg">
              활동 참여 인원
            </p>
            <input
              name="participants"
              onChange={handleChange}
              className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-base font-medium md:pb-3"
            />
          </div>
          <div>
            <p className="text-md my-3 font-semibold text-blue-500 md:text-lg">
              활동 내용
            </p>
            <textarea
              name="content"
              onChange={handleChange}
              className='md:text-md" h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 p-3 text-base font-medium md:pb-3'
            />
          </div>
        </div>
        <div className="flex w-2/3 justify-center md:w-1/2 ">
          {image ? (
            <>
              <Image
                src={image}
                className="object-scale-down m-auto"
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
              htmlFor="image"
              className="text-md mt-3 flex w-full items-center  justify-center rounded-xl border-2 border-gray-200 bg-white p-3 font-medium text-gray-300 hover:border-blue-700 md:h-80 md:w-2/3"
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
        </div>
      </div>
    </form>
  );
}
