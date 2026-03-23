import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { clubQueryKeys } from '../queries/club';
import { revalidateCache } from '../revalidate';
import { UpdateClubDetailAPIRequest } from '../types/club';
import { UrlType } from '../types/file';

export type AdminClub = {
  id: number;
  name: string;
  category: string;
  score: number;
  profileImage: UrlType;
};

export type CreateClubRequest = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  authId: string;
  password: string;
};

const updateClub = (club: UpdateClubDetailAPIRequest) =>
  fetcher.patch('central/my', {
    json: club,
  });

export const useUpdateClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClubDetailAPIRequest) => updateClub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.my()],
      });
    },
  });
};

const addClub = (data: CreateClubRequest) =>
  fetcher.post<AdminClub>('admin/clubs', { json: data });

export const useAddClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClub,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.all()],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.admin()],
        exact: false,
      });
      await revalidateCache('clubs');
    },
  });
};

const removeClub = (id: number) => fetcher.delete<void>(`admin/clubs/${id}`);

export const useDeleteClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeClub,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.all()],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.admin()],
        exact: false,
      });
      await revalidateCache('clubs');
    },
  });
};
