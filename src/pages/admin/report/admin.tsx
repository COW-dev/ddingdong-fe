import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import Heading from '@/components/common/Heading';
import Category from '@/components/report/category';
import ReportItem from '@/components/report/ReportItem';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const [visible, setVisible] = useState<boolean>(true);
  const [club, setClub] = useState<string>('너나들이');
  const currentTerm = useCurrentReports(token).data?.data.term ?? 1;
  const [term, setTerm] = useState<number>(currentTerm);

  return (
    <>
      <Head>
        <title>띵동 총동연 - 활동보고서</title>
      </Head>
      <div className="flex">
        <Heading>활동 보고서 관리하기</Heading>
        <div className="ml-2 mt-7 flex flex-col items-center justify-center md:hidden">
          <Image
            src={visible ? ArrowDown : ArrowUp}
            width={20}
            height={20}
            alt={'option'}
            onClick={() => setVisible(!visible)}
          />
        </div>
      </div>
      <div className="flex gap-4 md:mt-18">
        <div className="hidden max-h-[70vh] md:flex">
          <Category
            visible={visible}
            setVisible={setVisible}
            club={club}
            setClub={setClub}
            term={term}
            setTerm={setTerm}
          />
        </div>

        <div className="max-h-[75vh] flex-1 overflow-scroll">
          <ReportItem term={term} name={club} />
        </div>
      </div>
    </>
  );
}
