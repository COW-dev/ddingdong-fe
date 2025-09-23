import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useLoginMutation } from '@/app/_api/mutations/login';
import { useAuthStore } from '@/store/auth';

import { useCookie } from '../../../_api/useCookie';

export const useLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { mutateAsync: loginMutation } = useLoginMutation();
  const { setCookies } = useCookie();

  const { setAuth } = useAuthStore();

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
    const { role, token } = await loginMutation({ id, password });
    const authToken = token.split('Bearer ')[1];
    setCookies(authToken, role);
    setAuth({ role, token: authToken });
    router.push('/');
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
