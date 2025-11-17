import axios, { type AxiosResponse } from 'axios';

import { DeleteBanner, NewBanner, UpdateBanner } from '@/types/banner';
import { AdminClub, NewClub, DeleteClub, UpdateClub } from '@/types/club';
import { CreateFormData, ApplyData } from '@/types/form';
import { Score, ScoreDetail } from '@/types/score';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function getApplyStatistics(
  applyId: number,
  token: string,
): Promise<AxiosResponse<unknown>> {
  return await api.get(`/central/my/forms/${applyId}/statistics`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getMultipleAnswer(
  questionId: number,
  token: string,
): Promise<AxiosResponse<unknown>> {
  return await api.get(
    `/central/my/forms/statistics/multiple-choice?fieldId=${questionId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}
export async function getSingleAnswer(
  questionId: number,
  token: string,
): Promise<AxiosResponse<unknown>> {
  return await api.get(
    `/central/my/forms/statistics/text?fieldId=${questionId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function getAdminAllClubs(
  token: string,
): Promise<AxiosResponse<AdminClub[], unknown>> {
  return await api.get('/admin/clubs', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function createClub({ token, ...clubData }: NewClub) {
  return await api.post('/admin/clubs', clubData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function createBanner({ token, ...bannerData }: NewBanner) {
  return await api.post('/admin/banners', bannerData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function deleteClub({ clubId, token }: DeleteClub) {
  return await api.delete(`/admin/clubs/${clubId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function deleteBanner({ bannerId, token }: DeleteBanner) {
  return await api.delete(`/admin/banners/${bannerId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateBanner({ id, data, token }: UpdateBanner) {
  return await api.patch(`/admin/banners/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateClub({ id, score, token }: UpdateClub) {
  return await api.patch(`/admin/clubs/${id}/score?score=${score}`, score, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getNewScores(
  token: string,
  id: number,
): Promise<AxiosResponse<ScoreDetail, unknown>> {
  return await api.get(`/admin/${id}/score`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function createScore({ token, clubId, ...scoreData }: Score) {
  return await api.post(`/admin/${clubId}/score`, scoreData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getAllScores(
  token: string,
  clubId: number,
): Promise<AxiosResponse<ScoreDetail, unknown>> {
  return await api.get(`/admin/${clubId}/score`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getMyScore(
  token: string,
): Promise<AxiosResponse<ScoreDetail, unknown>> {
  return await api.get('/central/my/score', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function createForm(token: string, formData: CreateFormData) {
  return await api.post('/central/my/forms', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getForm(token: string, formId: number) {
  return await api.get(`/central/my/forms/${formId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateForm(
  token: string,
  formId: number,
  formData: CreateFormData,
) {
  return await api.put(`/central/my/forms/${formId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getSections(formId: number) {
  return await api.get(`/forms/${formId}/sections`);
}

export async function getFormDetail(formId: number, section: string) {
  return await api.get(`forms/${formId}?section=${section}`);
}

export async function submitApplicationForm(
  formId: number,
  formData: ApplyData,
) {
  return await api.post(`forms/${formId}/applications`, formData);
}
