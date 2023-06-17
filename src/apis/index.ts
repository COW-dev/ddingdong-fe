// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';
import { ClubType } from './../types/index';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 1000,
});

export async function login(id: string, pw: string) {
  const formData = new FormData();
  formData.append('userId', id);
  formData.append('password', pw);

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
