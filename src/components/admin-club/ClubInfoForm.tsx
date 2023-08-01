import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  DateValueType,
  DateRangeType,
} from 'react-tailwindcss-datepicker/dist/types';
import { ClubDetail, UpdateClub } from '@/types/club';

type ClubInfoFormProps = {
  leader: string;
  phoneNumber: string;
  location: string;
  regularMeeting: string;
  recruitPeriod: DateRangeType;
  formUrl: string;
  setValue: Dispatch<SetStateAction<ClubDetail>>;
  isEditing: boolean;
};

export default function ClubInfoForm({
  leader,
  phoneNumber,
  location,
  regularMeeting,
  recruitPeriod,
  formUrl,
  setValue,
  isEditing,
}: ClubInfoFormProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  function handleDateChange(event: DateValueType) {
    const { startDate, endDate } = event as DateRangeType;
    setValue((prev) => ({
      ...prev,
      recruitPeriod: { startDate, endDate },
    }));
  }

  return (
    <div className="text-base font-medium md:text-lg">
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            회장
          </label>
          <input
            name="leader"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={leader}
            onChange={(e) => handleChange(e)}
            disabled
          />
        </div>
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            연락처
          </label>
          <input
            name="phoneNumber"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={phoneNumber}
            onChange={(e) => handleChange(e)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            동아리방
          </label>
          <input
            name="location"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={location}
            onChange={(e) => handleChange(e)}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            정기모임
          </label>
          <input
            name="regularMeeting"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={regularMeeting}
            onChange={(e) => handleChange(e)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row ">
        <div className="mb-2 flex w-full items-center md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            모집기간
          </label>
          <div className="w-[75%]">
            <Datepicker
              value={recruitPeriod}
              useRange={false}
              disabled={!isEditing}
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={(e) => handleDateChange(e)}
              inputClassName={`${
                !isEditing && 'opacity-60'
              } w-full placeholder:text-sm md:placeholder:text-md rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md: md:px-5 `}
            />
          </div>
        </div>
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            지원링크
          </label>
          <input
            name="formUrl"
            type="text"
            value={formUrl}
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            // value={formUrl}
            onChange={(e) => handleChange(e)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
