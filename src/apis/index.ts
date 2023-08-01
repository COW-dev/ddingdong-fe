import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { BannerType, DeleteBanner } from '@/types/banner';
import {
  Club,
  AdminClub,
  ClubDetail,
  NewClub,
  DeleteClub,
  UpdateClub,
  UpdateMyClub,
} from '@/types/club';

import {
  Notice,
  NoticeDetail,
  UpdateNotice,
  DeleteNotice,
} from '@/types/notice';
import { ReportDetail, MyReportList, CurrentReport } from '@/types/report';

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

export async function createNotice(noticeData: FormData) {
  const token = noticeData.get('token');

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
  return await api.post('/admin/banners', formData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateNotice(noticeId: number, noticeData: FormData) {
  const token = noticeData.get('token');

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

export async function updateMyClub(clubData: FormData) {
  const token = clubData.get('token');
  return await api.patch('/club/my', clubData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
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
export async function createReport(
  reportData: FormData,
): Promise<AxiosResponse> {
  const token = reportData.get('token');

  return await api.post('/club/my/activity-reports', reportData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
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
export async function getMyReportLists(
  token: string,
): Promise<AxiosResponse<MyReportList[], unknown>> {
  return await api.get('/club/my/activity-reports', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getCurrentReports(
  token: string,
): Promise<AxiosResponse<CurrentReport, unknown>> {
  return await api.get('/club/activity-reports/current-term', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
