import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { memberQueryKeys } from '../queries/member';
import {
  AddMemberAPIRequest,
  DeleteMemberAPIRequest,
  UpdateMemberAPIRequest,
} from '../types/member';

const addMember = async (data: AddMemberAPIRequest) =>
  fetcher.post('club-members', { json: data.member });

const uploadMemberExcel = async (formData: FormData) =>
  fetcher.post('central/my/club-members', {
    body: formData,
  });

const updateMemberInfo = async (data: UpdateMemberAPIRequest) =>
  fetcher.patch(`central/my/club-members/${data.member.id}`, {
    json: data.member,
  });

const deleteMember = async (data: DeleteMemberAPIRequest) =>
  fetcher.delete(`club-members/${data.id}`);

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddMemberAPIRequest) => addMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...memberQueryKeys.all()],
      });
    },
  });
};

export const useUploadMemberExcel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadMemberExcel(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...memberQueryKeys.all()],
      });
    },
  });
};

export const useUpdateMemberInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemberAPIRequest) => updateMemberInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...memberQueryKeys.all()],
      });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteMemberAPIRequest) => deleteMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...memberQueryKeys.all()],
      });
    },
  });
};
