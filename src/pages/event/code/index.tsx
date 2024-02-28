import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { GetServerSideProps } from 'next/types';
import toast from 'react-hot-toast';
import Event from '@/assets/event.svg';
import LgEvent from '@/assets/md_event.svg';
import { useCollectStamp } from '@/hooks/api/event/useCollectStamp';
import { isMissingData } from '@/utils/validator';

const init = {
  studentNumber: '',
  studentName: '',
  studentMajor: '',
};
export default function Index() {
  const [user, setUser] = useState(init);
  const [code, setCode] = useState<string>('');
  const mutation = useCollectStamp();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCode(event.target.value);
  }
  function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (isMissingData({ code })) return toast.error('코드를 입력해주세요.');
    event.preventDefault();
    mutation.mutate({
      studentName: user.studentName,
      studentNumber: user.studentNumber,
      department: user.studentMajor,
      clubCode: code,
    });
  }
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const init = userInfo
        ? JSON.parse(userInfo)
        : { studentNumber: 0, studentName: '', studentMajor: '' };
      setUser(init);
    }
  }, []);

  return (
    <>
      <Image
        src={Event}
        width={1544}
        height={380}
        alt="동아리 박람회"
        className="h-54 w-full md:hidden"
      />
      <Image
        src={LgEvent}
        width={1440}
        height={235}
        alt="동아리 박람회"
        className="hidden md:block md:w-full"
      />
      <div className="mt-5 flex w-full flex-col items-center text-lg font-bold md:mt-20 md:flex-col md:justify-center md:text-2xl">
        <div>
          <span className=" mr-1 text-pink-400">{user.studentName}</span>
          <span className="mr-2">님</span>
        </div>
        <span>QR이벤트 인증 페이지입니다.</span>
        <div className="mt-4 text-base font-semibold md:text-lg">
          <div>
            <span className=" mr-1 text-pink-400">체험 부스 동아리 코드</span>
            <span className="mr-2">를 입력하고,</span>
            <div className="text-center">하단 인증 버튼을 눌러주세요.</div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handelSubmit}
        className="md:flex md:items-center md:justify-center"
      >
        <div className="my-5 flex w-full flex-col items-center md:w-2/3 md:flex-row">
          <input
            name="code"
            type="text"
            spellCheck={false}
            value={code}
            className="w-full rounded-xl bg-pink-50 px-6 py-2.5 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="submit"
            disabled={!code}
            className={` mt-6 cursor-pointer rounded-lg bg-pink-400 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-300 md:ml-2 md:mt-0 md:min-w-max md:px-10 md:py-3  ${
              !code && ' cursor-not-allowed bg-gray-50'
            }`}
          >
            체험 인증하기
          </button>
        </div>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { studentNumber, studentName } = context.query;
  return {
    props: {
      studentNumber: studentNumber,
      studentName: studentName,
    },
  };
};
