import axios, { AxiosResponse } from 'axios';
import { Banner } from '@/components/home/Banner';
// eslint-disable-next-line import/named
// eslint-disable-next-line import/named
import {
  ClubDetail,
  Club,
  NewNotice,
  NoticeDetail,
  Notice,
  UpdateClub,
  UpdateMyClub,
  UpdateNotice,
  DeleteNotice,
  NewClub,
  AdminClub,
  DeleteClub,
  Report,
  ReportDetail,
  AllReport,
  NewBanner,
  BannerType,
  DeleteBanner,
} from '@/types';

const api = axios.create({
  baseURL: '/api/',
  timeout: 3000,
});

export async function login(userId: string, password: string) {
  return await api.post('/auth/sign-in', { userId, password });
}

export async function getAllClubs(): Promise<AxiosResponse<Club[], unknown>> {
  return await api.get('/clubs');
}

export async function getAllBanners(): Promise<
  AxiosResponse<BannerType[], unknown>
> {
  return await api.get('/banners');
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

export async function getClubInfo(
  clubId: number,
): Promise<AxiosResponse<ClubDetail, unknown>> {
  return await api.get(`/clubs/${clubId}`);
}

export async function getAllNotices(): Promise<
  AxiosResponse<Notice[], unknown>
> {
  return await api.get('/notices');
}

export async function getNoticeInfo(
  noticeId: number,
): Promise<AxiosResponse<NoticeDetail, unknown>> {
  return await api.get(`/notices/${noticeId}`);
}

export async function createNotice({ token, ...noticeData }: NewNotice) {
  return await api.post('/admin/notices', noticeData, {
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
export async function createBanner({ token, formData }: any) {
  console.log(formData.get('uploadFiles'));
  return await api.post('/admin/banners', formData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateNotice({
  noticeId,
  token,
  ...noticeData
}: UpdateNotice) {
  return await api.patch(`/admin/notices/${noticeId}`, noticeData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function deleteNotice({ noticeId, token }: DeleteNotice) {
  return await api.delete(`/admin/notices/${noticeId}`, {
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
export async function getMyClub(
  token: string,
): Promise<AxiosResponse<ClubDetail, unknown>> {
  return await api.get('/club/my', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateMyClub({ token, ...clubData }: UpdateMyClub) {
  return await api.patch('/club/my', clubData, {
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
export async function createReport({ token, ...reportData }: Report) {
  return await api.post('/club/my/activity-reports', reportData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getReportInfo(
  reportId: number,
  name: string,
): Promise<AxiosResponse<ReportDetail, unknown>> {
  return await api.get(
    `/club/activity-reports?term=${reportId}&club_name=${name}`,
  );
}
export async function getAllReports(
  token: string,
): Promise<AxiosResponse<AllReport[], unknown>> {
  return await api.get('/club/my/activity-reports', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
