import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useLoginMutation } from '@/app/_api/mutations/login';

import { useCookie } from '../../../_api/useCookie';
import { ApiError } from '@/app/_api/fetcher';

export const useLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { mutateAsync: loginMutation } = useLoginMutation();
  const { setCookies } = useCookie();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleIdReset = () => {
    setId('');
  };

  const handlePasswordReset = () => {
    setPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !password) {
      return toast.error('아이디와 비밀번호를 모두 입력해주세요.');
    }
    const { role, token } = await loginMutation(
      { id, password },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error: Error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          } else {
            toast.error('로그인에 실패했습니다.');
          }
        },
      },
    );
    const authToken = token.split('Bearer ')[1];
    setCookies(authToken, role);
  };

  return {
    id,
    password,
    handleIdChange,
    handlePasswordChange,
    handleIdReset,
    handlePasswordReset,
    handleLogin,
  };
};
