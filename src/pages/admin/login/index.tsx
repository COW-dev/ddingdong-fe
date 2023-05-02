import { useState } from 'react';
import Head from 'next/head';
import Input from '@/components/admin-login/Input';
import Heading from '@/components/common/Heading';

export default function Index() {
  const [Id, setId] = useState<string>('');
  const [Pw, setPw] = useState<string>('');

  function handleSubmit() {
    return;
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 로그인</title>
      </Head>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="mt-10 w-full px-2 sm:max-w-md md:px-0 ">
          <Heading>띵동 어드민 로그인</Heading>
          <form
            className="mt-12 flex flex-col sm:mt-16"
            onSubmit={handleSubmit}
          >
            <Input
              label="아이디"
              id="admin-id"
              type="text"
              value={Id}
              setValue={setId}
            />
            <Input
              label="비밀번호"
              id="admin-pw"
              type="password"
              value={Pw}
              setValue={setPw}
            />
            <button className="mt-10 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:py-4 sm:text-lg md:mt-14">
              로그인하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
