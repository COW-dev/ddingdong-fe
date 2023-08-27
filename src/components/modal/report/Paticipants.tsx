import { Dispatch, SetStateAction, useState } from 'react';
import { useCookies } from 'react-cookie';
import SearchSelect from '@/components/SearchSelect';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { StudentInfo } from '@/types';
import { NewReport, ReportDetail } from '@/types/report';
const participant = {
  name: '',
  studentId: '',
  department: '',
};
type Props = {
  data: StudentInfo[];
  setData:
    | Dispatch<SetStateAction<ReportDetail>>
    | Dispatch<SetStateAction<NewReport>>
    | undefined;
  closeModal: () => void;
};
export default function Participants({ data, setData, closeModal }: Props) {
  const [{ token }] = useCookies(['token']);

  const {
    data: { data: clubData },
  } = useMyClub(token);

  const [participants, setParticipants] = useState<Array<StudentInfo>>(
    data ?? [participant, participant, participant, participant, participant],
  );

  function handleSubmit() {
    setParticipants(participants);
    setData && setData((prev: any) => ({ ...prev, participants }));
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
          <SearchSelect
            name={participant.name}
            setData={setParticipants}
            list={clubData?.clubMembers}
            id={index}
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
