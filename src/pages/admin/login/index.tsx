import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { login } from '@/apis';
import Input from '@/components/admin-login/Input';
import Heading from '@/components/common/Heading';
import { useAuthStore } from '@/store/auth';
import { LoginResponse } from '@/types';

export default function Index() {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cookie, setCookie, removeCookie] = useCookies([
    'token',
    'role',
    'access_token',
    'refresh_token',
  ]);
  const { setAuth } = useAuthStore();

  const removeTokens = () => {
    removeCookie('refresh_token', { domain: '.mju.ac.kr' });
    removeCookie('access_token', { domain: '.mju.ac.kr' });
  };

  useEffect(() => {
    if (cookie.refresh_token || cookie.access_token) {
      removeTokens();
    }
  }, [cookie.refresh_token, cookie.access_token]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(id, pw)
      .then((response: AxiosResponse<LoginResponse, unknown>) => {
        const { role, token } = response.data;
        const authToken = token.split('Bearer ')[1];
        setCookie('token', authToken);
        setCookie('role', role);
        setAuth({ role, token });
        return router.push('/');
      })
      .catch((error) => {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage ?? '잠시 후 다시 시도해주세요.');
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
