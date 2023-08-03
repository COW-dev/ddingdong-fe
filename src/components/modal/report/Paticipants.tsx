import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { StudentInfo } from '@/types';
import { NewReport } from '@/types/report';

type Props = {
  data: StudentInfo[];
  setData: Dispatch<SetStateAction<NewReport>>;
  closeModal: () => void;
};
export default function Participants({ data, setData, closeModal }: Props) {
  const [participants, setParticipants] = useState<Array<StudentInfo>>(
    data ?? [
      {
        name: '',
        studentId: '60201111',
        department: '융합소프트웨어학부',
      },
      {
        name: '',
        studentId: '60201111',
        department: '철학과',
      },
      {
        name: '',
        studentId: '60201111',
        department: '융합소프트웨어학부',
      },
      {
        name: '',
        studentId: '60201111',
        department: '경영학과',
      },
      {
        name: '',
        studentId: '60201111',
        department: '중어중문학과',
      },
    ],
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = event.target;
    setParticipants((prev) => {
      const updatedParticipants = [...prev];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [name]: value,
      };
      return updatedParticipants;
    });
  }

  function handleSubmit() {
    setParticipants(participants);
    setData((prev) => ({ ...prev, participants }));
    closeModal();
  }

  return (
    <div>
      <div className="grid grid-cols-3  rounded-xl text-gray-500">
        <label className="inline-block px-4 pb-2 font-semibold">이름</label>
      </div>
      {participants.map((participant, index) => (
        <div
          key={`report-participants-${index}`}
          className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 "
        >
          <input
            name="name"
            type="text"
            value={participant.name}
            spellCheck={false}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
      >
        등록하기
      </button>
    </div>
  );
}
