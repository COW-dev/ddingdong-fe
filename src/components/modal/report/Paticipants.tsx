import { ChangeEvent, useEffect, useState } from 'react';
import { StudentInfo } from '@/types';
type ParticipantsProps = {
  index: number;
  participant: StudentInfo;
};
export default function Participants({
  index,
  participant,
}: ParticipantsProps) {
  // useEffect(() => {
  //   if (clubData) setClubData(clubData);
  // }, [clubData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedParticipant = {
      ...participant,
      [event.target.name]: event.target.value,
    };
  };
  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   // mutation.mutate({ ...clubData, token: cookies.token });
  //   setModal(MODAL_TYPE.null);
  // }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-3  rounded-xl text-gray-500">
          <label className="inline-block px-4 pb-2 font-semibold">이름</label>
          <label className="inline-block px-4 pb-2 font-semibold">학번</label>
          <label className="inline-block px-4 pb-2 font-semibold">학과</label>
        </div>
        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="studentName"
            type="text"
            spellCheck={false}
            value={participant?.studentName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={handleChange}
          />
          <input
            name="studentId"
            type="text"
            spellCheck={false}
            value={participant?.studentId}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={handleChange}
          />
          <input
            name="studentMajor"
            type="text"
            spellCheck={false}
            value={participant?.studentMajor}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="studentName"
            type="text"
            spellCheck={false}
            value={participant?.studentName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentId"
            type="text"
            spellCheck={false}
            value={participant?.studentId}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentMajor"
            type="text"
            spellCheck={false}
            value={participant?.studentMajor}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="studentName"
            type="text"
            spellCheck={false}
            value={participant?.studentName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentId"
            type="text"
            spellCheck={false}
            value={participant?.studentId}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentMajor"
            type="text"
            spellCheck={false}
            value={participant?.studentMajor}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="studentName"
            type="text"
            spellCheck={false}
            value={participant?.studentName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentId"
            type="text"
            spellCheck={false}
            value={participant?.studentId}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentMajor"
            type="text"
            spellCheck={false}
            value={participant?.studentMajor}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="studentName"
            type="text"
            spellCheck={false}
            value={participant?.studentName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentId"
            type="text"
            spellCheck={false}
            value={participant?.studentId}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="studentMajor"
            type="text"
            spellCheck={false}
            value={participant?.studentMajor}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
        >
          등록하기
        </button>
      </div>
    </>
  );
}
