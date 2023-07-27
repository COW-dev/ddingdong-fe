import { useState } from 'react';
import Head from 'next/head';
import Report from '@/components//report/[id]';
import Heading from '@/components/common/Heading';
import Category from '@/components/report/Category';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 총동연 - 활동보고서</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>활동 보고서 관리하기</Heading>
      </div>
      <div className="mt-14 flex gap-4">
        <div className="inline-block">
          <Category />
        </div>
        <div className="hidden min-w-[70%] md:inline-block">
          <Report reportId={1} name={'너나들이'} />
        </div>
      </div>
    </>
  );
}
