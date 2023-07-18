import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { StudentInfo } from '@/types';

type ParticipantsProps = {
  index: number;
  participant: StudentInfo;
  updateParticipant: (index: number, updatedParticipant: StudentInfo) => void;
};

export default function Participants({
  index,
  participant,
  updateParticipant,
}: ParticipantsProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedParticipant = {
      ...participant,
      [event.target.name]: event.target.value,
    };
    updateParticipant(index, updatedParticipant);
  };
  return (
    <form className="mt-2 grid w-full grid-flow-row grid-cols-3 gap-2">
      <input
        name="studentName"
        value={participant.studentName}
        onChange={handleChange}
        className="w-sm h-12 rounded-xl border-2 border-gray-200 p-3"
      />
      <input
        name="studentId"
        value={participant.studentId}
        onChange={handleChange}
        className="w-sm h-12 rounded-xl border-2 border-gray-200 p-3"
      />
      <input
        name="studentMajor"
        value={participant.studentMajor}
        onChange={handleChange}
        className="w-sm h-12 rounded-xl border-2 border-gray-200 p-3"
      />
    </form>
  );
}
