import type { StudentInfo } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type ParticipantsProps = {
    index: number;
    participant: StudentInfo;
    updateParticipant: (index: number, updatedParticipant: StudentInfo) => void;
};

export default function Participants({index,participant,updateParticipant}:ParticipantsProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const updatedParticipant = {
          ...participant,
          [event.target.name]: event.target.value,
        };
        updateParticipant(index, updatedParticipant);
    };
    return(
        <form className='w-full grid grid-flow-row grid-cols-3 mt-2 gap-2'>
            <input 
                name="studentName"
                value={participant.studentName}
                onChange={handleChange}
                className="w-sm h-12 p-3 border-2 border-gray-200 rounded-xl" />
            <input 
                name="studentId"
                value={participant.studentId}
                onChange={handleChange}
                className="w-sm h-12 p-3 border-2 border-gray-200 rounded-xl" />
            <input 
                 name="studentMajor"
                 value={participant.studentMajor}
                 onChange={handleChange}
                className="w-sm h-12 p-3 border-2 border-gray-200 rounded-xl" />
        </form>
    )

}