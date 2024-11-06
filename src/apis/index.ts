import * as Sentry from '@sentry/react';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import {
  BannerType,
  DeleteBanner,
  NewBanner,
  UpdateBanner,
} from '@/types/banner';
import {
  Club,
  AdminClub,
  ClubDetail,
  NewClub,
  DeleteClub,
  UpdateClub,
  UpdateMember,
  UpdateMyClub,
  Member,
} from '@/types/club';
import { DeleteDocument, Document, DocumentDetail } from '@/types/document';
import {
  Applicant,
  ApplicantDetail,
  CollectStamp,
  Colletions,
  User,
} from '@/types/event';

import { Feed, FeedDetail } from '@/types/feed';
import {
  DeleteFixComment,
  Fix,
  FixComplete,
  FixDetailInfo,
  NewFix,
  NewFixComment,
} from '@/types/fix';

import { Notice, NoticeDetail, DeleteNotice } from '@/types/notice';
import {
  ReportResponse,
  MyReportList,
  CurrentReport,
  DeleteReport,
  ActivityReportTerm,
} from '@/types/report';
import { Score, ScoreDetail } from '@/types/score';

export type ErrorType = {
  status: number;
  message: string;
  timestamp: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

export function removeToken() {
  const cookies = new Cookies();
  cookies.remove('token');
  cookies.remove('role');
}
export async function login(authId: string, password: string) {
  removeToken();
  return await api.post('/auth/sign-in', { authId, password });
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
  return await api.get('/admin/fix-zones', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getClubAllFix(
  token: string,
): Promise<AxiosResponse<Fix[], unknown>> {
  return await api.get('/club/fix-zones', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getFixInfo(
  token: string,
  id: number,
): Promise<FixDetailInfo> {
  const response = await api.get(`/club/fix-zones/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return await response.data;
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

export async function getAllDocuments(): Promise<
  AxiosResponse<Document[], unknown>
> {
  return await api.get('/documents');
}

export async function getDocumentInfo(
  documentId: number,
): Promise<AxiosResponse<DocumentDetail, unknown>> {
  return await api.get(`/documents/${documentId}`);
}

export async function getAllFeeds(): Promise<AxiosResponse<Feed[], unknown>> {
  return await api.get('/feeds');
}

export async function getClubFeed(
  clubId: number,
): Promise<AxiosResponse<Feed[], unknown>> {
  return await api.get(`/clubs/${clubId}/feeds`);
}

export async function getFeedDetail(
  feedId: number,
): Promise<AxiosResponse<FeedDetail, unknown>> {
  return await api.get(`/feeds/${feedId}`);
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
  return await api.post('/club/fix-zones', formData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function createDocument(documentData: FormData) {
  const token = documentData.get('token');

  return await api.post('/admin/documents', documentData, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function createFixComment({
  fixZoneId,
  token,
  content,
}: NewFixComment) {
  return await api.post(
    `/admin/fix-zones/${fixZoneId}/comments`,
    { content },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function updateNotice(noticeId: number, noticeData: FormData) {
  const token = noticeData.get('token');

  return await api.patch(`/admin/notices/${noticeId}`, noticeData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getClubMembers(
  token: string,
): Promise<AxiosResponse<Array<Member>>> {
  return await api.get(`/central/my/club-members`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function uploadMembers(formdata: FormData) {
  const token = formdata.get('token');
  return await api.post('/club/my/club-members', formdata, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateMembers({ member, id, token }: UpdateMember) {
  return await api.patch(`/club/my/club-members/${id}`, member, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getMemberFile(token: string) {
  return await api.get('/club/my/club-members/excel', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    responseType: 'blob',
  });
}

export async function deleteNotice({ noticeId, token }: DeleteNotice) {
  return await api.delete(`/admin/notices/${noticeId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function deleteDocument({ documentId, token }: DeleteDocument) {
  return await api.delete(`/admin/documents/${documentId}`, {
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
export async function deleteFixComment({
  fixZoneId,
  commentId,
  token,
}: DeleteFixComment) {
  return await api.delete(
    `/admin/fix-zones/${fixZoneId}/comments/${commentId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
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
  return await api.get('/central/my', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateMyClub({ token, ...clubData }: UpdateMyClub) {
  return await api.patch('/central/my', clubData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateFixComplete({ id, token }: FixComplete) {
  return await api.patch(`/admin/fix-zones/${id}?fixZoneId=${id}`, null, {
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
export async function createReport(formdata: FormData) {
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
): Promise<AxiosResponse<ReportResponse[], unknown>> {
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

export async function getReportTerms(
  token: string,
): Promise<AxiosResponse<ActivityReportTerm, unknown>> {
  return await api.get('/club/activity-reports/term', {
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
export async function deleteReport({ term, token }: DeleteReport) {
  return await api.delete(`/club/my/activity-reports?term=${term}`, {
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
  return await api.get('/club/my/score', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getMyCollects(
  studentName: string,
  studentNumber: number,
): Promise<AxiosResponse<Colletions, unknown>> {
  return await api.get(
    `/events/stamps?studentName=${studentName}&studentNumber=${studentNumber}`,
  );
}
export async function getMyQrCode(
  studentName: string,
  studentNumber: number,
): Promise<AxiosResponse<User, unknown>> {
  return await api.get(
    `events/qr/?studentName=${studentName}&studentNumber=${studentNumber}`,
  );
}
export async function collectStamp({
  studentName,
  studentNumber,
  department,
  clubCode,
}: CollectStamp) {
  return await api.post(
    `/events/stamps?studentName=${studentName}&studentNumber=${studentNumber}`,
    {
      studentName,
      studentNumber,
      department,
      clubCode,
    },
  );
}
export async function applyDraw(formdata: FormData) {
  return await api.patch('/events/apply', formdata);
}
export async function getAllAppliers(
  token: string,
): Promise<AxiosResponse<Applicant[], unknown>> {
  return await api.get('/admin/events/applied-users', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function getApplier(
  token: string,
  id: number,
): Promise<AxiosResponse<ApplicantDetail, unknown>> {
  return await api.get(`/admin/events/applied-users/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getPresignedUrl(fileName: string, token: string) {
  return await api.get(`/file/upload-url?fileName=${fileName}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function uploadPresignedUrl(
  file: File,
  uploadUrl: string,
  contentType: string,
) {
  return await api.put(uploadUrl, file, {
    headers: {
      'Content-Type': contentType,
    },
  });
}

//error handling
function expirationToken(error: AxiosError<ErrorType>) {
  removeToken();
  window.location.href = '/login';
  toast.error(error.response?.data?.message ?? `로그인 시간이 만료되었어요.`);
  return Promise.reject(error);
}

function fulfilledResponse(res: AxiosResponse) {
  return res;
}
function rejectedResponse(error: AxiosError<ErrorType>) {
  if (
    error.response?.data?.status === 401 &&
    error.response?.data?.message == '유효하지 않은 토큰입니다.'
  ) {
    return expirationToken(error);
  }
  if (error.code === 'ECONNABORTED') {
    toast.error('네트워크 환경을 확인해주세요.');
    return Promise.reject(error);
  }

  Sentry.captureException(error);
  return Promise.reject(error);
}

api.interceptors.response.use(fulfilledResponse, rejectedResponse);
