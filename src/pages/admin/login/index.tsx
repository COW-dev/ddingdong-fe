import Head from 'next/head';
import Input from '@/components/admin-login/Input';
import Heading from '@/components/common/Heading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 관리자 로그인</title>
      </Head>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="mt-10 w-[88%] sm:max-w-md md:w-full">
          <Heading>관리자 로그인</Heading>
          <form className="mt-12 flex flex-col sm:mt-16">
            <Input label="아이디" id="id" type="text" />
            <Input label="비밀번호" id="pw" type="password" />
            <button className="mt-12 w-full rounded-xl bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600 sm:py-4 sm:text-lg md:mt-16">
              로그인하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
