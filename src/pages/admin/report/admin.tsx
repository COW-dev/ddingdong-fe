import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import Report from '@/components//report/[id]/[name]';
import Heading from '@/components/common/Heading';
import Category from '@/components/report/category';
export default function Index() {
  const [visible, setVisible] = useState<boolean>(true);
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
      <div className="mt-14 flex gap-4">
        <Category visible={visible} setVisible={setVisible} />
        <div className="inline-block  w-full ">
          <Report reportId={1} name={'너나들이'} />
        </div>
      </div>
    </>
  );
}
