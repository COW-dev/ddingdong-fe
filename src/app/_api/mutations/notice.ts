import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { noticeQueryKeys } from '../queries/notice';
import { NewNoticeAPIRequest, UpdateNoticeAPIRequest } from '../types/notice';

const addNotice = async (noticeData: NewNoticeAPIRequest) =>
  fetcher.post(`admin/notices`, { json: noticeData });

const updateNotice = async (noticeData: UpdateNoticeAPIRequest) =>
  fetcher.patch(`admin/notices/${noticeData.noticeId}`, { json: noticeData });

const deleteNotice = async (noticeId: number) =>
  fetcher.delete(`admin/notices/${noticeId}`);

export const useAddNotice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noticeData: NewNoticeAPIRequest) => addNotice(noticeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...noticeQueryKeys.all(1)],
      });
    },
  });
};

export const useUpdateNotice = (noticeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noticeData: UpdateNoticeAPIRequest) =>
      updateNotice(noticeData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...noticeQueryKeys.detail(noticeId)],
      });
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: number) => deleteNotice(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...noticeQueryKeys.all(1)],
      });
    },
  });
};
