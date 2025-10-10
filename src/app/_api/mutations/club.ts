import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { clubQueryKeys } from '../queries/club';

import type { AdminClub } from '../types/club';

const invalidateClubLists = (qc: QueryClient) => {
  qc.invalidateQueries({ queryKey: clubQueryKeys.all(), exact: false });
  qc.invalidateQueries({ queryKey: clubQueryKeys.admin(), exact: false });
};

export type CreateClubRequest = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  authId: string;
  password: string;
};

const addClub = (data: CreateClubRequest) =>
  fetcher.post<AdminClub>('admin/clubs', { json: data });

const removeClub = (id: number) => fetcher.delete<void>(`admin/clubs/${id}`);

export type UpdateClubScoreRequest = {
  id: number;
  score: number;
};

export const useAddClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClub,
    onSuccess: () => {
      invalidateClubLists(queryClient);
    },
  });
};

export const useDeleteClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeClub,
    onSuccess: () => {
      invalidateClubLists(queryClient);
    },
  });
};
