import { ChangeEvent, useEffect, useState } from 'react';
import router from 'next/router';
import toast from 'react-hot-toast';

type Props = {
  closeModal: () => void;
};

export default function LocalUserForm({ closeModal }: Props) {
  const [user, setUser] = useState({
    studentNumber: '',
    studentName: '',
  });

  const handleSubmit = () => {
    localStorage.setItem(
      'date',
      JSON.stringify({
        studentName: user.studentName,
        studentNumber: user.studentNumber,
      }),
    );
    toast.success('도장을 받을 수 있습니다!');
    router.push('/event');
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  // useEffect(() => {
  //   const currentDate = new Date();
  //   const nextDate = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth(),
  //     currentDate.getDate() + 1,
  //   );
  //   const timeTillMidnight = nextDate.getTime() - currentDate.getTime();

  //   const timerId = setTimeout(() => {
  //     localStorage.removeItem('date');
  //   }, timeTillMidnight);

  //   return () => clearTimeout(timerId);
  // }, []);

  return (
    <div className="mt-3 flex w-full flex-col justify-center ">
      <div className="mb-3 flex w-full flex-row items-center ">
        <label className="inline-block w-20 font-semibold text-gray-500">
          이름
        </label>
        <input
          name="studentName"
          type="text"
          spellCheck={false}
          value={user.studentName}
          className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3 flex w-full flex-row items-center">
        <label className="inline-block w-20 font-semibold text-gray-500">
          학번
        </label>
        <input
          name="studentNumber"
          type="text"
          spellCheck={false}
          value={user.studentNumber}
          className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mt-5 flex flex-row justify-center">
        <button
          type="button"
          onClick={closeModal}
          className=" cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-500  transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="ml-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400 md:w-auto md:py-2.5 "
        >
          이벤트 참여하기
        </button>
      </div>
    </div>
  );
}
