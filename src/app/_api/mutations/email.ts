import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { EmailSendAPIResponse, ReSendEmailAPIRequest } from '../types/email';

import { emailQueryKeys } from '../queries/email';

const reSendEmail = ({ formId, target }: ReSendEmailAPIRequest) =>
  fetcher.post<EmailSendAPIResponse>(
    `central/my/forms/${formId}/results/email/resends`,
    {
      json: { target },
    },
  );

export const useReSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReSendEmailAPIRequest) => reSendEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...emailQueryKeys.all()],
      });
    },
  });
};
