import { useEffect, useState } from 'react';

export default function Index() {
  const [user, setUser] = useState({
    studentNumber: '',
    studentName: 0,
  });

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setUser((prev) => ({
        ...prev,
        ...JSON.parse(data),
      }));
    }
  }, []);

  return (
    <>
      <div className="flex w-full items-end justify-between">
        <div className="mt-5 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
          <div className="md:mr-1.5">안녕하세요,</div>
          <span className="text-blue-500">{user.studentName}</span>
          <span className="ml-1 md:ml-1.5">님</span>
        </div>
        <button className="sm:text-md w-40 rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:py-3 md:mt-4">
          QR 생성하기
        </button>
      </div>
    </>
  );
}
