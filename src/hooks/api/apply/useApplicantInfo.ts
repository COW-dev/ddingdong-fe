/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getApplicantInfo } from '@/apis';
import { ApplicantDetail } from '@/types/apply';

export function useApplicantInfo(
  formId: number,
  applicantId: number,
  token: string,
) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ApplicantDetail, unknown>,
    [string, number]
  >({
    queryKey: ['apply', applicantId],
    queryFn: () => getApplicantInfo(formId, applicantId, token),
  });
}
