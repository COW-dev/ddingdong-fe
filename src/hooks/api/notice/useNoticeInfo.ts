import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getNoticeInfo } from '@/apis';
import { NoticeDetail } from '@/types/notice';

const initialData = {
  title: '',
  content: '',
  createdAt: '',
};

export function useNoticeInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<NoticeDetail, unknown>,
    [string, number]
  >({
    queryKey: ['notice', id],
    queryFn: () => getNoticeInfo(id),
    initialData,
  });
}
