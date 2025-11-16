import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { applyQueryKeys } from '../queries/apply';
import {
  CreateResultEmailAPIRequest,
  UpdateApplicantNoteAPIRequest,
  UpdateApplicantStatusAPIRequest,
} from '../types/apply';

const createResultEmail = ({
  formId,
  title,
  target,
  message,
}: CreateResultEmailAPIRequest) =>
  fetcher.post(`central/my/forms/${formId}/results/email`, {
    json: { title, target, message },
  });

export const useCreateResultEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResultEmailAPIRequest) => createResultEmail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...applyQueryKeys.all()],
      });
    },
  });
};
const registerApplicants = (formId: number) =>
  fetcher.post(`central/my/forms/${formId}/members/register-applicants`);

export const useRegisterApplication = () => {
  return useMutation({
    mutationFn: (formId: number) => registerApplicants(formId),
  });
};

const updateApplicantStatus = ({
  formId,
  applicationIds,
  status,
}: UpdateApplicantStatusAPIRequest) =>
  fetcher.patch(`central/my/forms/${formId}/applications`, {
    json: {
      applicationIds,
      status,
    },
  });

export const useUpdateApplicantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateApplicantStatusAPIRequest) =>
      updateApplicantStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...applyQueryKeys.all()],
      });
    },
  });
};

const deleteApplication = (formId: number) =>
  fetcher.delete(`central/my/forms/${formId}`);

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formId: number) => deleteApplication(formId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...applyQueryKeys.all()],
      });
    },
  });
};

const updateApplicantNote = ({
  formId,
  applicationId,
  note,
}: UpdateApplicantNoteAPIRequest) =>
  fetcher.patch(`central/my/forms/${formId}/applications/${applicationId}`, {
    json: { note },
  });

export const useUpdateApplicantNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateApplicantNoteAPIRequest) =>
      updateApplicantNote(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: applyQueryKeys.applicants.detail(
          variables.formId,
          variables.applicationId,
        ),
      });
    },
  });
};
