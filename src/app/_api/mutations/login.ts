import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { LoginAPIResponse } from '../types/token';

const login = async (id: string, password: string) => {
  return fetcher.post<LoginAPIResponse>('auth/sign-in', {
    json: { authId: id, password },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      login(id, password),
  });
};
