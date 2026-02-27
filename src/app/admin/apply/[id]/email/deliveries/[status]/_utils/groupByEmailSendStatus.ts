import { EmailDeliveryStatus, EmailSendStatus } from '@/app/_api/types/email';

export const groupByEmailSendStatus = (responses: EmailDeliveryStatus[]) => {
  return responses.reduce(
    (acc, item) => {
      acc[item.emailSendStatus]?.push(item);
      return acc;
    },
    {
      IN_PROGRESS: [],
      SUCCESS: [],
      TEMPORARY_FAILURE: [],
      PERMANENT_FAILURE: [],
    } as Record<EmailSendStatus, EmailDeliveryStatus[]>,
  );
};
