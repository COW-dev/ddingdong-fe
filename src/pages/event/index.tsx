import { useEffect, useState } from 'react';
import { useMyCollects } from '@/hooks/api/event/useMyCollects';
import { useMyQrCode } from '@/hooks/api/event/useMyQrCode';
import { Colletions } from '@/types/event';

export default function Index() {
  const [user, setUser] = useState({
    studentNumber: 0,
    studentName: '',
  });
  const [collects, setCollects] = useState<Colletions>({
    isCompleted: false,
    collects: [
      {
        stamp: '',
        collectedAt: '',
      },
    ],
  });
  const qrCode = useMyQrCode(user.studentName, user.studentNumber).data;
  const myCollects = useMyCollects(user.studentName, user.studentNumber).data;

  function openQrCode() {
    const qrCodeUri = qrCode?.data?.uri;
    window.open(qrCodeUri, 'qr', qrCodeUri);
  }
  useEffect(() => {
    const data = localStorage.getItem('date');
    if (data) {
      setUser((prev) => ({
        ...prev,
        ...JSON.parse(data),
      }));
    }
    if (myCollects) {
      setCollects(myCollects.data);
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
        <button
          onClick={openQrCode}
          className="sm:text-md w-40 rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:py-3 md:mt-4"
        >
          QR 생성하기
        </button>
      </div>
      <div>
        {collects?.collects.length > 0 ? (
          collects.collects.map((item, index) => (
            <div key={index}>
              <span>{item.stamp}</span>
              <span>{item.collectedAt}</span>
            </div>
          ))
        ) : (
          <span> 스탬프를 모아보세요!</span>
        )}
      </div>
    </>
  );
}
