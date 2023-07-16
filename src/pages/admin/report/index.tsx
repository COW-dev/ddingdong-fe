import Head from 'next/head';

import Heading from '@/components/common/Heading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 어드민 - 활동보고서 관리</title>
      </Head>
      <Heading>활동보고서 관리하기</Heading>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <div className="mb-1.5 text-sm font-semibold text-gray-500 md:mb-2 md:text-base">
          동아리 생성하기
        </div>

        <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
          <div className="flex h-full w-full justify-between p-5 md:p-6">
            <div>
              <div className="text-lg font-bold md:text-xl">동아리이름</div>
            </div>
            <div className="flex items-center">
              <div className="rounded-lg bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-500">
                수정하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
