// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { ClubDetailType, ClubType, NoticeType } from './../types/index';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000,
});

export async function login(userId: string, password: string) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('password', password);

  return await api.post('/auth/sign-in', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function getAllClubs(): Promise<
  AxiosResponse<ClubType[], unknown>
> {
  return await api.get('/clubs');
}

export async function getClubInfo(
  id: number,
): Promise<AxiosResponse<ClubDetailType, unknown>> {
  return await api.get(`/clubs/${id}`);
}

export async function getAllNotices(): Promise<
  AxiosResponse<NoticeType[], unknown>
> {
  return await api.get('/notices');
}
