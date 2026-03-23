'use client';

import { useCookies } from 'react-cookie';

export const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies([
    'token',
    'role',
    'access_token',
    'refresh_token',
  ]);

  const setCookies = (token: string, role: string) => {
    setCookie('token', token, { path: '/' });
    setCookie('role', role, { path: '/' });
  };

  const resetCookie = () => {
    removeCookie('token', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('refresh_token', { domain: '.mju.ac.kr', path: '/' });
    removeCookie('access_token', { domain: '.mju.ac.kr', path: '/' });
  };

  return {
    cookie,
    setCookies,
    resetCookie,
  };
};
