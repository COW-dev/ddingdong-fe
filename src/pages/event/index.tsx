import { useEffect, useState } from 'react';
import Image from 'next/image';
import Event from '@/assets/event.svg';
import StampBoard from '@/components/event/StampBoard';
import { useMyCollects } from '@/hooks/api/event/useMyCollects';
import { useMyQrCode } from '@/hooks/api/event/useMyQrCode';
import { Colletions } from '@/types/event';

export default function Index() {
  const userInfo =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const init = userInfo
    ? JSON.parse(userInfo)
    : { studentNumber: 0, studentName: '' };
  const [user, setUser] = useState(init);
  const [stampBoard, setStampBoard] = useState<Colletions>({
    completed: false,
    collections: [
      {
        stamp: '',
        collectedAt: '',
      },
    ],
  });
  const qrCode = useMyQrCode(user.studentName, user.studentNumber).data;
  const myCollects = useMyCollects(user.studentName, user.studentNumber).data;
  console.log(user);
  function openQrCode() {
    const qrCodeUri = qrCode?.data?.uri;
    window.open(qrCodeUri, 'qr', qrCodeUri);
  }
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const init = userInfo ? JSON.parse(userInfo) : user;
    setUser(init);
  }, []);
  useEffect(() => {
    if (myCollects) {
      setStampBoard(myCollects.data);
    }
  }, [myCollects]);
  console.log(myCollects?.data);

  return (
    <>
      <Image
        src={Event}
        width={1544}
        height={380}
        alt="동아리 박람회"
        className="h-54 w-full"
      />
      <div className="flex w-full flex-col justify-between md:flex-row md:items-end">
        <div className="my-5 w-full text-xl font-bold leading-tight md:mt-10 md:w-1/3 md:text-3xl">
          <span className="md:mr-1.5">안녕하세요,</span>
          <span className="text-pink-400">{user.studentName}</span>
          <span className="ml-1 md:ml-1.5">님</span>
        </div>
        <div className="text-center sm:mt-2 md:my-3">
          <span className="text-sm text-gray-500 sm:hidden">
            하단의 버튼을 눌러 사용자의 QR코드를 생성해주세요.
          </span>
          <button
            onClick={openQrCode}
            className="mt-2 h-10 w-34 rounded-lg bg-pink-400 text-sm font-bold text-white transition-colors hover:opacity-80 md:mt-4 md:h-12 md:w-48 md:text-lg"
          >
            이벤트 QR 생성
          </button>
        </div>
      </div>
      <StampBoard
        completed={stampBoard.completed}
        collections={stampBoard.collections}
      />
    </>
  );
}
