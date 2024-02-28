import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Event from '@/assets/event.svg';
import LgEvent from '@/assets/md_event.svg';
import StampDetail from '@/components/event/StampDetail';
import { useApplier } from '@/hooks/api/event/useApplier';
import { ApplicantDetail } from '@/types/event';
import { parseImgUrl } from '@/utils/parse';

type Props = {
  eventId: number;
};
export default function Index({ eventId }: Props) {
  const [applier, setApplier] = useState<ApplicantDetail>({
    id: eventId,
    studentName: '',
    studentNumber: '',
    department: '',
    collections: [
      {
        stamp: '',
        collectedAt: '',
      },
    ],
    certificationImageUrl: '',
  });
  const [{ token }] = useCookies(['token']);
  const { data } = useApplier(token, eventId);
  useEffect(() => {
    if (data) {
      setApplier(data?.data);
    }
  }, [data]);
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
      <div className="ml-0.5 mt-6 text-base font-bold md:text-xl lg:text-3xl">
        QR 이벤트 응모내역
      </div>
      <div className=" my-4 flex flex-col text-[95%] md:text-base">
        <span>이름: {applier.studentName}님</span>
        <span>
          학과: {applier.department ? applier.department : '알 수 없음'}
        </span>
        <span>학번: {applier.studentNumber}</span>
      </div>
      <div className="flex flex-col rounded-xl border border-gray-100 p-4 text-lg font-semibold md:flex-row">
        <div className="mb-10 md:w-1/2 ">
          <h1 className=" mt-3 text-center md:mt-10 ">동아리 부스 체험</h1>
          {applier.collections && (
            <StampDetail collections={applier?.collections} />
          )}
        </div>
        <div className="mb-10 w-full md:w-1/2">
          <h1 className="mt-10 text-center ">학생회비 납부내역 확인서</h1>
          <Image
            src={parseImgUrl(applier.certificationImageUrl)}
            width={500}
            height={1000}
            priority
            className=" mt-5 object-cover"
            alt="certificationImage"
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      eventId: id,
    },
  };
};
