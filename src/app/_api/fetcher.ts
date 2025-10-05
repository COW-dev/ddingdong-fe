import * as Sentry from '@sentry/nextjs';
import ky, { type Options, type ResponsePromise, HTTPError } from 'ky';
import { Cookies } from 'react-cookie';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '@/store/auth';

import { ErrorType } from './types/error';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public timestamp: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const defaultOption: Options = {
  retry: 0,
  timeout: 30_000,
  credentials: 'include',
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

const cookies = new Cookies();

export const resetCookie = () => {
  cookies.remove('token', { path: '/' });
  cookies.remove('role', { path: '/' });
  cookies.remove('refresh_token', { domain: '.mju.ac.kr', path: '/' });
  cookies.remove('access_token', { domain: '.mju.ac.kr', path: '/' });
};

const expirationToken = async () => {
  useAuthStore.getState().resetAuth();
  toast.error('로그인 시간이 만료되었어요.');
  resetCookie();
};

export const instance = ky.create({
  prefixUrl: API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = cookies.get('token');

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        return response;
      },
    ],
    beforeError: [
      async (error) => {
        if (error instanceof HTTPError) {
          const errorData: ErrorType = await error.response.json();

          const apiError = new ApiError(
            errorData.status || error.response.status,
            errorData.message || '서버 오류가 발생했습니다.',
            errorData.timestamp || new Date().toISOString(),
          );

          if (
            apiError.status === 401 &&
            apiError.message === '유효하지 않은 토큰입니다.'
          ) {
            await expirationToken();
            return error;
          }
          Sentry.captureException(apiError);
        }

        return error;
      },
    ],
  },
  ...defaultOption,
});

export async function parseResponse<T>(response: ResponsePromise) {
  try {
    return await response.json<T>();
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) =>
    parseResponse<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) =>
    parseResponse<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) =>
    parseResponse<T>(instance.put(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    parseResponse<T>(instance.delete(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    parseResponse<T>(instance.patch(pathname, options)),
};
