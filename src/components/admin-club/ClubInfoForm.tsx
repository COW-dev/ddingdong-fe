import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { ClubDetail } from '@/types/club';
import { validator } from '@/utils/validator';

type ClubInfoFormProps = {
  leader: string;
  phoneNumber: string;
  location: string;
  regularMeeting: string;
  setValue: Dispatch<SetStateAction<ClubDetail>>;
  isEditing: boolean;
};

export default function ClubInfoForm({
  leader,
  phoneNumber,
  location,
  regularMeeting,
  setValue,
  isEditing,
}: ClubInfoFormProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    setValue((prev) => ({
      ...prev,
    }));
  }, [setValue]);

  if (!hydrated) return null;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleValueValidate(object: { type: string; value: string }) {
    if (object.value && !validator(object)) {
      toast.error('형식에 맞춰 재입력해주세요.');
      setValue((prev) => ({
        ...prev,
        [object.type]: '',
      }));
    }
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
            disabled={!isEditing}
          />
        </div>
        <div
          className="mb-2 w-full md:mb-3 md:w-[50%]"
          onBlur={() =>
            handleValueValidate({ type: 'phoneNumber', value: phoneNumber })
          }
        >
          <label className="inline-block w-20 font-semibold text-gray-500">
            연락처
          </label>
          <input
            name="phoneNumber"
            placeholder="ex) 010-1234-1234"
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
        <div
          className="mb-2 w-full md:mb-3 md:w-[50%]"
          onBlur={() =>
            handleValueValidate({ type: 'location', value: location })
          }
        >
          <label className="inline-block w-20 font-semibold text-gray-500">
            동아리방
          </label>
          <input
            name="location"
            placeholder="ex) S0000"
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
    </div>
  );
}
