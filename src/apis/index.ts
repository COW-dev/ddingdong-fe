import * as Sentry from '@sentry/react';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { Cookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { PresignedUrlResponse } from '@/types';
import {
  ApplicantDetail,
  Application,
  DeleteApplication,
  NewEmail,
  RegisterApplicant,
  UpdateApplicantNote,
  UpdateApplicantStatus,
} from '@/types/apply';
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
  MemberInfo,
} from '@/types/club';
import {
  DeleteDocument,
  Document,
  DocumentDetail,
  NewDocument,
} from '@/types/document';

import { TotalFeed, FeedDetail, NewFeed, DeleteFeed } from '@/types/feed';

import {
  DeleteFixComment,
  Fix,
  FixComplete,
  FixDetailInfo,
  NewFix,
  NewFixComment,
} from '@/types/fix';

import {
  Notice,
  NoticeDetail,
  DeleteNotice,
  NewNotice,
  UpdateNotice,
} from '@/types/notice';
import {
  ReportResponse,
  MyReportList,
  CurrentReport,
  DeleteReport,
  ActivityReportTerm,
  SubmitReport,
} from '@/types/report';
import { Score, ScoreDetail } from '@/types/score';

export type ErrorType = {
  status: number;
  message: string;
  timestamp: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
  return await api.get('/central/fix-zones', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getFixInfo(
  token: string,
  id: number,
): Promise<FixDetailInfo> {
  const response = await api.get(`/central/fix-zones/${id}`, {
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

export async function getAllNotices(
  page: number,
): Promise<AxiosResponse<Notice, unknown>> {
  return await api.get(`/notices?page=${page}&limit=10`);
}

export async function getNoticeInfo(
  noticeId: number,
): Promise<AxiosResponse<NoticeDetail, unknown>> {
  return await api.get(`/notices/${noticeId}`);
}

export async function getAllDocuments(
  page: number,
): Promise<AxiosResponse<Document, unknown>> {
  return await api.get(`/documents?page=${page}&limit=10`);
}

export async function getDocumentInfo(
  documentId: number,
): Promise<AxiosResponse<DocumentDetail, unknown>> {
  return await api.get(`/documents/${documentId}`);
}

export async function createFeed({ token, ...feedData }: NewFeed) {
  return await api.post('/central/my/feeds', feedData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getAllFeeds(
  currentCursorId: number | -1,
): Promise<AxiosResponse<TotalFeed<'newestFeeds'>, unknown>> {
  return await api.get(
    `/feeds?currentCursorId=${currentCursorId ?? -1}&size=9`,
  );
}

export async function getMyFeeds(
  token: string,
  currentCursorId: number | -1,
): Promise<AxiosResponse<TotalFeed<'clubFeeds'>, unknown>> {
  return await api.get(
    `/central/my/feeds?currentCursorId=${currentCursorId ?? -1}&size=12`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function getClubFeed(
  clubId: number,
  currentCursorId: number,
): Promise<AxiosResponse<TotalFeed<'clubFeeds'>, unknown>> {
  return await api.get(
    `/clubs/${clubId}/feeds?currentCursorId=${currentCursorId ?? -1}&size=9`,
  );
}

export async function getFeedDetail(
  feedId: number,
): Promise<AxiosResponse<FeedDetail, unknown>> {
  return await api.get(`/feeds/${feedId}`);
}

export async function createNotice({ token, ...noticeData }: NewNotice) {
  return await api.post('/admin/notices', noticeData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function deleteFeed({ feedId, token }: DeleteFeed) {
  return await api.delete(`/central/my/feeds/${feedId}`, {
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

export async function createFix({ token, post }: NewFix) {
  return await api.post('/central/fix-zones', post, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}
export async function createDocument({ token, ...documentData }: NewDocument) {
  return await api.post('/admin/documents', documentData, {
    headers: {
      Authorization: 'Bearer ' + token,
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

export async function getClubMembers(
  token: string,
): Promise<AxiosResponse<MemberInfo, unknown>> {
  return await api.get('/central/my/club-members', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function uploadMembers(formdata: FormData) {
  const token = formdata.get('token');
  return await api.post('/central/my/club-members', formdata, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateMembers({ member, id, token }: UpdateMember) {
  return await api.patch(`/central/my/club-members/${id}`, member, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getMemberFile(token: string) {
  return await api.get('/central/my/club-members/excel', {
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
export async function createReport(
  activityReportRequests: [SubmitReport, SubmitReport],
  token: string,
) {
  return await api.post(
    '/central/my/activity-reports',
    { activityReportRequests },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function getReportInfo(
  term: number,
  name: string,
  token: string,
): Promise<AxiosResponse<ReportResponse[], unknown>> {
  return await api.get(
    `/central/activity-reports?term=${term}&club_name=${name}`,
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
  return await api.get('/central/my/activity-reports', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getReportTerms(
  token: string,
): Promise<AxiosResponse<ActivityReportTerm, unknown>> {
  return await api.get('/central/activity-reports/term', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getCurrentReports(
  token: string,
): Promise<AxiosResponse<CurrentReport, unknown>> {
  return await api.get('/central/activity-reports/current-term', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function updateReports(
  activityReportRequests: [SubmitReport, SubmitReport],
  token: string,
) {
  const { term } = activityReportRequests[0];
  return await api.patch(
    `/central/my/activity-reports?term=${term}`,
    { activityReportRequests },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
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
  return await api.delete(`/central/my/activity-reports?term=${term}`, {
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

export async function registerApplicants({ formId, token }: RegisterApplicant) {
  return await api.post(
    `/central/my/forms/${formId}/members/register-applicants`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function createResultEmail({
  formId,
  token,
  ...emailData
}: NewEmail) {
  return await api.post(
    `/central/my/forms/${formId}/results/email`,
    emailData,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function getAllApplication(
  formId: number,
  token: string,
): Promise<AxiosResponse<Application, unknown>> {
  return await api.get(`/central/my/forms/${formId}/applications`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getApplicantInfo(
  formId: number,
  applicantId: number,
  token: string,
): Promise<AxiosResponse<ApplicantDetail, unknown>> {
  return await api.get(
    `/central/my/forms/${formId}/applications/${applicantId}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function updateApplicantNote({
  formId,
  applicationId,
  token,
  note,
}: UpdateApplicantNote): Promise<AxiosResponse<ApplicantDetail, unknown>> {
  return await api.patch(
    `/central/my/forms/${formId}/applications/${applicationId}`,
    { note },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}
export async function updateApplicantStatus({
  formId,
  token,
  ...statusData
}: UpdateApplicantStatus): Promise<AxiosResponse<ApplicantDetail, unknown>> {
  return await api.patch(
    `/central/my/forms/${formId}/applications`,
    statusData,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
}

export async function deleteApplication({ formId, token }: DeleteApplication) {
  return await api.delete(`/central/my/forms/${formId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

export async function getPresignedUrl(
  fileName: string,
  token: string,
): Promise<AxiosResponse<PresignedUrlResponse>> {
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
