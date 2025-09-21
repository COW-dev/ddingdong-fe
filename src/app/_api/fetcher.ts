import * as Sentry from '@sentry/nextjs';
import ky, { type Options, type ResponsePromise, HTTPError } from 'ky';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '@/store/auth';

type ErrorType = {
  status: number;
  message: string;
  timestamp: string;
};

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
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

const expirationToken = async (error: HTTPError) => {
  window.location.href = '/login';
  toast.error(`로그인 시간이 만료되었어요.`);
  return Promise.reject(error);
};

export const instance = ky.create({
  prefixUrl: API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = useAuthStore.getState().auth.token;

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
        if (error.name === 'TimeoutError') {
          toast.error('네트워크 환경을 확인해주세요.');
        }

        if (error instanceof HTTPError) {
          const errorData: ErrorType = await error.response.json();
          if (errorData.status === 401) {
            if (errorData?.message === '유효하지 않은 토큰입니다.') {
              return expirationToken(error);
            }
          }

          const apiError = new ApiError(
            errorData.status || error.response.status,
            errorData.message || '서버 오류가 발생했습니다.',
            errorData.timestamp || new Date().toISOString(),
          );
          Sentry.captureException(apiError);
          return Promise.reject(apiError);
        }

        return Promise.reject(error);
      },
    ],
  },
  ...defaultOption,
});

export async function parseResponse<T>(response: ResponsePromise): Promise<T> {
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
