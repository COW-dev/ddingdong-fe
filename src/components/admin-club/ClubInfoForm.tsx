import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ClubDetailType } from '@/types';
import Toggle from 'react-toggle';

type ClubInfoFormProps = {
  leaderName: string;
  phoneNumber: string;
  location: string;
  recruitPeriod: string;
  regularMeeting: string;
  formUrl: string;
  setValue: Dispatch<SetStateAction<ClubDetailType>>;
  isEditing: boolean;
};

export default function ClubInfoForm({
  leaderName,
  phoneNumber,
  location,
  recruitPeriod,
  regularMeeting,
  formUrl,
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
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            회장
          </label>
          <input
            name="leaderName"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={leaderName}
            onChange={handleChange}
            disabled={!isEditing}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            모집기간
          </label>
          <input
            name="recruitPeriod"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={recruitPeriod}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-2 w-full md:mb-3 md:w-[50%]">
          <label className="inline-block w-20 font-semibold text-gray-500">
            지원링크
          </label>
          <input
            name="formUrl"
            type="text"
            spellCheck={false}
            className={`${
              !isEditing && 'opacity-60'
            } w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5`}
            value={formUrl}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="mb-2 w-full md:mb-3 md:w-[50%]">
        <label className="inline-block w-20 font-semibold text-gray-500">
          모집여부
        </label>
      </div>
    </div>
  );
}
