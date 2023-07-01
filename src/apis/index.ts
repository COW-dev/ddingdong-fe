// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import {
  ClubDetail,
  Club,
  NewNotice,
  NoticeDetail,
  Notice,
  UpdateClub,
  UpdateNotice,
  DeleteNotice,
} from '@/types';

const api = axios.create({
  baseURL: 'http://ddingdong-dev.ap-northeast-2.elasticbeanstalk.com/api/',
  timeout: 3000,
});

export async function login(userId: string, password: string) {
  return await api.post('/auth/sign-in', { userId, password });
}

export async function getAllClubs(): Promise<AxiosResponse<Club[], unknown>> {
  return await api.get('/clubs');
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

export async function getMyClub(
  token: string,
): Promise<AxiosResponse<ClubDetail, unknown>> {
  return await api.get('/club/my', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateMyClub({ token, ...clubData }: UpdateClub) {
  return await api.patch('/club/my', clubData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
