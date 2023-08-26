import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { BannerType, DeleteBanner, NewBanner } from '@/types/banner';
import {
  Club,
  AdminClub,
  ClubDetail,
  NewClub,
  DeleteClub,
  UpdateClub,
  UpdateMembers,
} from '@/types/club';

import {
  Fix,
  FixAdminDetailType,
  FixClubDetailType,
  FixComplete,
  NewFix,
} from '@/types/fixzone';

import { Notice, NoticeDetail, DeleteNotice } from '@/types/notice';
import { ReportDetail, MyReportList, CurrentReport } from '@/types/report';
import { Score, ScoreDetail } from '@/types/score';

const api = axios.create({
  baseURL: '/api/',
  timeout: 3000,
});
export function removeToken() {
  const cookies = new Cookies();
  cookies.remove('token');
  cookies.remove('role');
}
export async function login(userId: string, password: string) {
  removeToken();
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
export async function getAdminAllFix(
  token: string,
): Promise<AxiosResponse<Fix[], unknown>> {
  return await api.get('/admin/fix', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getClubAllFix(
  token: string,
): Promise<AxiosResponse<Fix[], unknown>> {
  return await api.get('/club/fix', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getAdminFixInfo(
  token: string,
  id: number,
): Promise<AxiosResponse<FixAdminDetailType, unknown>> {
  return await api.get(`/admin/fix/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getClubFixInfo(
  token: string,
  id: number,
): Promise<AxiosResponse<FixClubDetailType, unknown>> {
  return await api.get(`/club/fix/${id}`, {
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
export async function createBanner({ token, formData }: NewBanner) {
  return await api.post('/admin/banners', formData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function createFix({ token, formData }: NewFix) {
  return await api.post('/club/fix', formData, {
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
export async function updateMembers({ members, token }: UpdateMembers) {
  return await api.put(
    `/club/my/club-members`,
    { clubMemberList: members },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
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
export async function updateFixComplete({
  id,
  isCompleted,
  token,
}: FixComplete) {
  return await api.patch(`/admin/fix/${id}`, isCompleted, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateBanner(BannerData: FormData) {
  const token = BannerData.get('token');
  return await api.patch('/club/my', BannerData, {
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
export async function createReport(formdata: FormData): Promise<AxiosResponse> {
  const token = formdata.get('token');
  return await api.post('/club/my/activity-reports', formdata, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function getReportInfo(
  term: number,
  name: string,
  token: string,
): Promise<AxiosResponse<ReportDetail[], unknown>> {
  return await api.get(
    `/club/activity-reports?term=${term}&club_name=${name}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
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
export async function updateReports(term: number, updateData: FormData) {
  const token = updateData.get('token');

  return await api.patch(`/club/my/activity-reports?term=${term}`, updateData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getAdminAllReports(
  token: string,
): Promise<AxiosResponse<any[], unknown>> {
  return await api.get('/admin/activity-reports', {
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
  return await api.get(`/club/my/score`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const cookies = new Cookies();
    cookies.getAll();
    if (
      err.response.data.code === 401 &&
      err.response.data.message == '유효하지 않은 토큰입니다.'
    ) {
      removeToken();
      window.location.href = '/login';
      return toast.error(err.response.status.message);
    }
    // if (err.response.data.code === 401) {
    //   removeToken();
    //   window.location.href = '/login';
    // }
    return Promise.reject(err);
  },
);
