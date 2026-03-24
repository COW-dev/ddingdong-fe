import { useMutation } from '@tanstack/react-query';

import { instance } from '../fetcher';
import { CreatePairGameApplierRequest } from '../types/pair_game';

const createPairGameApplier = (data: CreatePairGameApplierRequest) => {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify(data.request)], { type: 'application/json' }),
  );
  formData.append('file', data.file);

  return instance.post('pair-game/appliers', {
    body: formData,
    headers: {
      'Content-Type': undefined,
    },
  });
};

export const useCreatePairGameApplier = () =>
  useMutation({
    mutationFn: (data: CreatePairGameApplierRequest) =>
      createPairGameApplier(data),
  });
