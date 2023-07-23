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
import { StudentInfo, Report } from '@/types';
type ReportProps = {
  date: DateValueType;
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
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;
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
      console.log(reader);
    }
  }
  function handleImageReset() {
    setValue((prev) => ({
      ...prev,
      image: '',
    }));
  }
  return (
    <div className="flex flex-col items-center justify-between md:m-3 md:flex-row">
      <div className="flex w-full flex-col md:w-2/3">
        <div className="mb-5 flex flex-col items-center md:flex-row">
          <Datepicker
            value={date}
            datepicker-format="yyyy/mm/dd"
            useRange={false}
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            onChange={handleDateChange}
            inputClassName="h-12 w-full px-4 py-3 text-sm border-[1.5px] border-gray-100 bg-gray-50 rounded-xl md:pb-3 md:text-sm placeholder:text-sm  outline-none"
          />
          <input
            name="place"
            placeholder="활동 장소"
            onChange={handleChange}
            className="mt-3 h-12 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none placeholder:font-semibold md:ml-3 md:mt-0 md:text-base"
          />
        </div>
        <div>
          <p className=" text-md my-3 font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          <input
            name="participants"
            onChange={handleChange}
            className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-3 text-base outline-none md:pb-3"
          />
        </div>
        <div>
          <p className="text-md my-3 font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          <textarea
            name="content"
            onChange={handleChange}
            className="md:text-md h-24 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 p-3 text-base outline-none md:pb-3"
          />
        </div>
      </div>
      <div className="flex w-full justify-center md:w-1/2 ">
        {image ? (
          <>
            <Image
              src={image}
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
            htmlFor="image"
            className=" text-md mt-3 flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-3 font-medium text-gray-300 outline-none md:h-80 md:w-2/3"
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
  );
}
