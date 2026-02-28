import { ApplicantStatus } from './apply';

export type ReSendEmailAPIRequest = {
  formId: number;
  target: Omit<ApplicantStatus, 'SUBMITTED'>;
};

export type EmailStatusOverviewAPIResponse = {
  emailSendStatusOverviewInfoResponses: EmailStatus[];
};

export type EmailStatus = {
  formApplicationStatus: Omit<ApplicantStatus, 'SUBMITTED'>;
  lastSentAt?: string;
  successCount: number;
  failCount: number;
};

export type EmailSendAPIResponse = {
  formEmailSendHistoryId: number;
};

export type EmailProgressAPIResponse = {
  totalCount: number;
  successCount: number;
  failCount: number;
};

export type EmailSendStatus =
  | 'IN_PROGRESS'
  | 'SUCCESS'
  | 'PERMANENT_FAILURE'
  | 'TEMPORARY_FAILURE';

export type EmailDeliveryStatus = {
  name: string;
  studentNumber: string;
  sendAt: string | null;
  emailSendStatus: EmailSendStatus;
  formApplicationStatus: Omit<ApplicantStatus, 'SUBMITTED'>;
};

export type EmailDeliveryStatusAPIResponse = {
  emailSendStatusInfoResponses: EmailDeliveryStatus[];
};
