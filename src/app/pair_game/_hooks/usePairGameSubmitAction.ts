import { useCallback } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useCreatePairGameApplier } from '@/app/_api/mutations/pair_game';
import type { PairGameSubmitFormValues } from '@/app/_api/types/pair_game';

import { useGameFunnel } from '../_contexts/GameFunnelContext';
import { PAIR_GAME_PATH } from '../_utils/gameImages';
import { validatePairGameSubmitData } from '../_utils/validatePairGameSubmitData';

export function usePairGameSubmitAction() {
  const { setStep } = useGameFunnel();
  const { mutate: createApplier, isPending } = useCreatePairGameApplier();

  const submit = useCallback(
    (formData: PairGameSubmitFormValues, receiptFile: File | null) => {
      if (!validatePairGameSubmitData({ formData, receiptFile })) {
        return;
      }

      createApplier(
        {
          request: {
            name: formData.name,
            studentNumber: formData.studentNumber,
            department: formData.department,
            phoneNumber: formData.phoneNumber,
          },
          file: receiptFile as File,
        },
        {
          onSuccess: () => {
            window.sessionStorage.removeItem('pairGameCanSubmit');
            setStep('completed');
            window.history.replaceState(null, '', PAIR_GAME_PATH);
          },
          onError: (error) => {
            if (error instanceof ApiError) {
              toast.error(error.message);
              return;
            }
            toast.error('응모 제출에 실패했어요. 다시 시도해주세요.');
          },
        },
      );
    },
    [createApplier, setStep],
  );

  return { submit, isPending };
}
