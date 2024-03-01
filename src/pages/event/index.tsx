import { useEffect, useState } from 'react';
import Image from 'next/image';
import Event from '@/assets/event.svg';
import Map from '@/assets/map.svg';
import LgEvent from '@/assets/md_event.svg';
import BoothPlace from '@/components/event/BoothPlace';
import StampBoard from '@/components/event/StampBoard';
import { useMyCollects } from '@/hooks/api/event/useMyCollects';
import { useMyQrCode } from '@/hooks/api/event/useMyQrCode';
import { Colletions } from '@/types/event';

export default function Index() {
  const local =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const [user, setUser] = useState(local && JSON.parse(local));
  const [place, setPlace] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);
  const [stampBoard, setStampBoard] = useState<Colletions>({
    completed: false,
    collections: [
      {
        stamp: '',
        collectedAt: '',
      },
    ],
  });
  const qrCode = useMyQrCode(user?.studentName, user?.studentNumber).data;
  const myCollects = useMyCollects(user?.studentName, user?.studentNumber).data;

  function openQrCode() {
    const qrCodeUri = qrCode?.data?.uri;
    window.open(qrCodeUri, 'qr', qrCodeUri);
  }
  useEffect(() => {
    if (local) {
      const init = local
        ? JSON.parse(local)
        : { studentNumber: 0, studentName: '' };
      setUser(init);
    }
  }, []);
  useEffect(() => {
    if (myCollects) {
      setStampBoard(myCollects.data);
    }
  }, [myCollects]);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

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
      <div className="flex w-full flex-col justify-between md:flex-row md:items-end">
        <div className="my-5 w-full text-xl font-bold leading-tight md:mt-10 md:text-3xl">
          <span className="md:mr-1.5">안녕하세요,</span>
          <span className="text-pink-400">{user?.studentName}</span>
          <span className="ml-1 md:ml-1.5">님</span>
          <div
            className={`float-right mt-0.5 flex items-center text-[85%] font-semibold  text-pink-400  ${
              place ? 'w-20' : 'w-34'
            }`}
          >
            {place ? (
              <div
                className=" float-left md:text-base"
                onClick={() => setPlace(false)}
              >
                돌아가기
              </div>
            ) : (
              <>
                <Image src={Map} height={18} width={18} alt="map" />
                <span
                  onClick={() => setPlace(true)}
                  className="ml-2 md:text-base"
                >
                  동아리부스 지도
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {place ? (
        <BoothPlace />
      ) : (
        <>
          <div className="flex flex-col text-center sm:mt-2 md:my-3">
            <span className="text-gray-500 sm:hidden">
              하단의 버튼을 눌러 QR코드를 생성해주세요.
            </span>
            <button
              onClick={openQrCode}
              className="sm:text-md mx-auto mt-2 h-10 w-34 rounded-lg bg-pink-400 font-bold text-white transition-colors hover:opacity-80 md:mt-4 md:h-12 md:w-40 "
            >
              이벤트 QR 생성
            </button>
          </div>
          <StampBoard
            completed={stampBoard?.completed}
            collections={stampBoard?.collections}
          />
        </>
      )}
    </>
  );
}
