/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMyClub } from '@/apis';
import { ClubDetail } from '@/types';

const initialData = {
  id: 0,
  name: '',
  tag: '',
  category: '',
  leader: '',
  phoneNumber: '',
  location: '',
  isRecruit: false,
  recruitPeriod: { startDate: new Date(), endDate: new Date() },
  regularMeeting: '',
  introduction: '',
  activity: '',
  ideal: '',
  formUrl: '',
};

export function useMyClub(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ClubDetail, unknown>,
    [string]
  >({
    queryKey: ['my-club'],
    queryFn: () => getMyClub(token),
    initialData,
  });
}
