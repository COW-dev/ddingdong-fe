import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ClubDetailType } from '@/types';

type ClubInfoFormProps = {
  leaderName: string;
  phoneNumber: string;
  location: string;
  recruitPeriod: string;
  regularMeeting: string;
  setValue: Dispatch<SetStateAction<ClubDetailType>>;
  isEditing: boolean;
};

export default function ClubInfoForm({
  leaderName,
  phoneNumber,
  location,
  recruitPeriod,
  regularMeeting,
  setValue,
  isEditing,
}: ClubInfoFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="text-base font-medium md:text-lg">
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:max-w-sm">
          <label className="inline-block w-[25%] font-semibold text-gray-500 md:mr-3 md:w-18">
            회장
          </label>
          <input
            name="leaderName"
            type="text"
            spellCheck={false}
            className={`${
              isEditing ? 'text-gray-800' : 'text-gray-500 opacity-80'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:w-[70%] md:px-5`}
            value={leaderName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-2 w-full md:mb-3 md:max-w-sm">
          <label className="inline-block w-[25%] font-semibold text-gray-500 md:mr-3 md:w-18">
            연락처
          </label>
          <input
            name="phoneNumber"
            type="text"
            spellCheck={false}
            className={`${
              isEditing ? 'text-gray-800' : 'text-gray-500 opacity-80'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:w-[70%] md:px-5`}
            value={phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:max-w-sm">
          <label className="inline-block w-[25%] font-semibold text-gray-500 md:mr-3 md:w-18">
            동아리방
          </label>
          <input
            name="location"
            type="text"
            spellCheck={false}
            className={`${
              isEditing ? 'text-gray-800' : 'text-gray-500 opacity-80'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:w-[70%] md:px-5`}
            value={location}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-2 w-full md:mb-3 md:max-w-sm">
          <label className="inline-block w-[25%] font-semibold text-gray-500 md:mr-3 md:w-18">
            정기모임
          </label>
          <input
            name="regularMeeting"
            type="text"
            spellCheck={false}
            className={`${
              isEditing ? 'text-gray-800' : 'text-gray-500 opacity-80'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:w-[70%] md:px-5`}
            value={regularMeeting}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:max-w-sm">
          <label className="inline-block w-[25%] font-semibold text-gray-500 md:mr-3 md:w-18">
            모집기간
          </label>
          <input
            name="recruitPeriod"
            type="text"
            spellCheck={false}
            className={`${
              isEditing ? 'text-gray-800' : 'text-gray-500 opacity-80'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:w-[70%] md:px-5 `}
            value={recruitPeriod}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
