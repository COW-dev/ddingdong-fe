/* eslint-disable import/named */
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AxiosError, AxiosResponse } from 'axios';
import { login } from '@/apis';
import Input from '@/components/admin-login/Input';
import Heading from '@/components/common/Heading';
import { loginResponse } from '@/types';

export default function Index() {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(id, pw)
      .then((response: AxiosResponse<loginResponse, unknown>) => {
        const { role, token } = response.data;
        localStorage.setItem('role', role);
        localStorage.setItem('token', token.split('Bearer ')[1]);
        router.push('/');
      })
      .catch((error: AxiosError) => {
        console.log(error.response?.data);
      });
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 로그인</title>
      </Head>
      <div className="flex w-full flex-col items-center justify-start">
        <div className="mt-8 w-full px-2 sm:max-w-md md:px-0 ">
          <Heading>띵동 어드민 로그인</Heading>
          <form
            className="mt-12 flex flex-col sm:mt-14"
            onSubmit={handleSubmit}
          >
            <Input
              label="아이디"
              id="admin-id"
              type="text"
              value={id}
              setValue={setId}
            />
            <Input
              label="비밀번호"
              id="admin-pw"
              type="password"
              value={pw}
              setValue={setPw}
            />
            <button
              type="submit"
              className="mt-10 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:py-4 sm:text-lg md:mt-14"
            >
              로그인하기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
