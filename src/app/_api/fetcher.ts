import * as Sentry from '@sentry/nextjs';
import ky, { type Options, type ResponsePromise, HTTPError } from 'ky';
import { toast } from 'react-hot-toast';

import { ErrorType } from '@/apis';

import { getAccessToken, removeToken } from './accessToken';

const defaultOption: Options = {
  retry: 0,
  timeout: 30_000,
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

const expirationToken = async (error: HTTPError) => {
  await removeToken();
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
        const accessToken = await getAccessToken();

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken.value}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          const errorData: ErrorType = await response.json();
          if (errorData?.message === '유효하지 않은 토큰입니다.') {
            const error = new HTTPError(response, _request, _options);
            return expirationToken(error);
          }
        }
        return response;
      },
    ],
    beforeError: [
      async (error) => {
        if (error.name === 'TimeoutError') {
          toast.error('네트워크 환경을 확인해주세요.');
          return Promise.reject(error);
        }

        Sentry.captureException(error);
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
    toast.error('응답 처리 중 오류가 발생했습니다.');
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
