import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Event from '@/assets/event.svg';
import LgEvent from '@/assets/md_event.svg';
import EventCard from '@/components/event/EventCard';
import { useAllAppliers } from '@/hooks/api/event/useAllAppliers';
import { Applicant } from '@/types/event';

export default function Index() {
  const [applicant, setApplicant] = useState<Applicant[]>([]);
  const [cookies] = useCookies(['token']);
  const { data } = useAllAppliers(cookies.token);
  useEffect(() => {
    if (Array.isArray(data?.data)) {
      setApplicant(data?.data);
    } else {
      setApplicant([]);
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
      <div className="ml-1 mt-6 text-base font-bold md:text-xl lg:text-3xl">
        <span className="">QR 이벤트 응모내역 (총 응모자</span>
        <span className="ml-1 text-pink-400">{applicant?.length}명</span>
        <span>)</span>
      </div>
      <ul className=" mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:gap-5 lg:grid-cols-4 ">
        {applicant.map((apply) => (
          <EventCard
            key={apply.id}
            id={apply.id}
            studentName={apply.studentName}
            studentNumber={apply.studentNumber}
            department={apply.department}
          />
        ))}
      </ul>
    </>
  );
}
