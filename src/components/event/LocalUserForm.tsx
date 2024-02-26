import { ChangeEvent, useState } from 'react';
import router from 'next/router';
import toast from 'react-hot-toast';
import { isMissingData } from '@/utils/validator';

type Props = {
  closeModal: () => void;
};

export default function LocalUserForm({ closeModal }: Props) {
  const [user, setUser] = useState({
    studentNumber: '',
    studentMajor: '',
    studentName: '',
  });

  const handleSubmit = () => {
    if (isMissingData(user)) return toast.error('이름과 학번을 확인해주세요.');
    localStorage.setItem(
      'user',
      JSON.stringify({
        studentName: user.studentName,
        studentMajor: user.studentMajor,
        studentNumber: user.studentNumber,
      }),
    );
    toast.success('도장을 받을 수 있습니다!');
    router.push('/event');
    closeModal();
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

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
          className="w-full rounded-xl bg-pink-50 px-4 py-2.5 outline-none"
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
          className="w-full rounded-xl bg-pink-50 px-4 py-2.5 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3 flex w-full flex-row items-center">
        <label className="inline-block w-20 font-semibold text-gray-500">
          학과
        </label>
        <input
          name="studentMajor"
          type="text"
          spellCheck={false}
          value={user.studentMajor}
          className="w-full rounded-xl bg-pink-50 px-4 py-2.5 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mt-5 flex flex-row justify-center">
        <button
          type="button"
          onClick={closeModal}
          className=" cursor-pointer rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-500  transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="ml-2 cursor-pointer rounded-lg bg-pink-400 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-pink-200 md:w-auto md:py-2.5 "
        >
          이벤트 참여하기
        </button>
      </div>
    </div>
  );
}
