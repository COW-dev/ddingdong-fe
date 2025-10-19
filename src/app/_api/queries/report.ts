import { queryOptions } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import {
  CurrentTerm,
  Term,
  MyReport,
  ReportResponse,
  TermReport,
} from '../types/report';

export const reportQueryKeys = {
  all: () => ['reports'],
  currentTerm: () => ['currentTerm'],
  terms: () => ['terms'],
  my: () => [...reportQueryKeys.all(), 'my'],
  termReports: (term: number) => [...reportQueryKeys.all(), term],
  termReport: (term: number) => [...reportQueryKeys.my(), term],
  report: (term: number, clubId: number) => [
    ...reportQueryKeys.all(),
    term,
    clubId,
  ],
};

export const reportQueryOptions = {
  currentTerm: () =>
    queryOptions({
      queryKey: reportQueryKeys.currentTerm(),
      queryFn: () =>
        fetcher.get<CurrentTerm>('central/activity-reports/current-term'),
      staleTime: 60_000,
    }),
  terms: () =>
    queryOptions({
      queryKey: reportQueryKeys.terms(),
      queryFn: () => fetcher.get<Term[]>('central/activity-reports/term'),
      staleTime: 60_000,
    }),
  myReports: () =>
    queryOptions({
      queryKey: reportQueryKeys.my(),
      queryFn: () => fetcher.get<MyReport[]>('central/my/activity-reports'),
      staleTime: 60_000,
    }),
  termReport: (term: number) =>
    queryOptions({
      queryKey: reportQueryKeys.termReport(term),
      queryFn: () =>
        fetcher.get<ReportResponse[]>(`central/activity-reports?term=${term}`),
      staleTime: 60_000,
    }),

  termReports: (term: number) =>
    queryOptions({
      queryKey: reportQueryKeys.termReports(term),
      queryFn: () =>
        fetcher.get<TermReport[]>(`admin/activity-reports?term=${term}`),
      staleTime: 60_000,
    }),
  report: (term: number, clubId: number) =>
    queryOptions({
      queryKey: reportQueryKeys.report(term, clubId),
      queryFn: () =>
        fetcher.get<[ReportResponse, ReportResponse]>(
          `admin/activity-reports/clubs/${clubId}?term=${term}`,
        ),
      staleTime: 60_000,
    }),
};
