import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { useCollectStamp } from '@/hooks/api/event/useCollectStamp';

type UserProps = {
  studentName: string;
  studentNumber: string;
};
export default function Index({ studentName, studentNumber }: UserProps) {
  const [name, setStudentName] = useState(studentName);
  const [number, setStudentNumber] = useState(studentNumber);
  const [code, setCode] = useState('');
  const mutation = useCollectStamp();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCode(event.target.value);
  }
  function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(name, number);
    mutation.mutate({
      studentName: name,
      studentNumber: number,
      clubCode: code,
    });
  }

  return (
    <>
      <form onSubmit={handelSubmit}>
        <h5>도장수집</h5>
        <span> {studentName}</span>
        <span> {studentNumber}</span>
        <div className="mb-3 flex w-full flex-row items-center">
          <label className="inline-block w-20 font-semibold text-gray-500">
            코드
          </label>
          <input
            name="code"
            type="text"
            spellCheck={false}
            value={code}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>보내기 버튼</button>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { studentName, studentNumber } = context.query;
  return {
    props: {
      studentNumber: studentNumber,
      studentName: studentName,
    },
  };
};
