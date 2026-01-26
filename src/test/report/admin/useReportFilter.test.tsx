import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Club } from '@/app/_api/types/club';
import { TermReport } from '@/app/_api/types/report';
import { useReportFilter } from '@/app/admin/report/admin/[term]/_hooks/useReportFilter';

describe('useReportFilter', () => {
  const createClub = (id: number, name: string, category: string): Club => ({
    id,
    name,
    category,
    tag: '학술',
    recruitStatus: '모집 중',
  });

  const createTermReport = (clubId: number, clubName: string): TermReport => ({
    club: { id: clubId, name: clubName },
    activityReports: [1, 2],
  });

  it('clubs를 category 기준으로 정렬한다', () => {
    const clubs: Club[] = [
      createClub(1, '콕콕콕', '체육'),
      createClub(2, '명지서법', '학술'),
      createClub(3, '너나들이', '봉사'),
    ];

    const { result } = renderHook(() => useReportFilter(clubs, []));
    const { filterOptions } = result.current;

    expect(filterOptions.all.map((c) => c.category)).toEqual([
      '봉사',
      '체육',
      '학술',
    ]);
  });

  it('제출한 동아리는 submit, 미제출은 unSubmit으로 분리된다', () => {
    const clubs: Club[] = [
      createClub(1, '명지서법', '학술'),
      createClub(2, '콕콕콕', '체육'),
      createClub(3, '너나들이', '봉사'),
    ];
    const termReports: TermReport[] = [createTermReport(1, '명지서법')];

    const { result } = renderHook(() => useReportFilter(clubs, termReports));
    const { filterOptions } = result.current;

    expect(filterOptions.submit).toHaveLength(1);
    expect(filterOptions.submit[0].name).toBe('명지서법');

    expect(filterOptions.unSubmit).toHaveLength(2);
    expect(filterOptions.unSubmit.map((c) => c.name)).toEqual([
      '너나들이',
      '콕콕콕',
    ]);
  });

  it('termReports가 비어 있으면 모든 동아리는 unSubmit이다', () => {
    const clubs: Club[] = [
      createClub(1, '명지서법', '학술'),
      createClub(2, '콕콕콕', '체육'),
    ];

    const { result } = renderHook(() => useReportFilter(clubs, []));
    const { filterOptions } = result.current;

    expect(filterOptions.submit).toHaveLength(0);
    expect(filterOptions.unSubmit).toHaveLength(2);
    expect(filterOptions.unSubmit.map((c) => c.name)).toEqual([
      '콕콕콕',
      '명지서법',
    ]);
  });

  it('초기 filteredClubs는 all과 동일하다', () => {
    const clubs: Club[] = [
      createClub(1, '명지서법', '학술'),
      createClub(2, '콕콕콕', '체육'),
    ];

    const { result } = renderHook(() => useReportFilter(clubs, []));
    const { filteredClubs, filterOptions } = result.current;

    expect(filteredClubs).toEqual(filterOptions.all);
    expect(filteredClubs).toHaveLength(2);
  });

  it('setFilteredClubs로 submit / unSubmit 필터링이 가능하다', () => {
    const clubs: Club[] = [
      createClub(1, '명지서법', '학술'),
      createClub(2, '콕콕콕', '체육'),
    ];
    const termReports: TermReport[] = [createTermReport(1, '명지서법')];

    const { result } = renderHook(() => useReportFilter(clubs, termReports));
    const { filterOptions, setFilteredClubs } = result.current;

    act(() => {
      setFilteredClubs(filterOptions.submit);
    });

    const { filteredClubs: submitFiltered } = result.current;
    expect(submitFiltered).toHaveLength(1);
    expect(submitFiltered[0].name).toBe('명지서법');

    act(() => {
      setFilteredClubs(filterOptions.unSubmit);
    });

    const { filteredClubs: unSubmitFiltered } = result.current;
    expect(unSubmitFiltered).toHaveLength(1);
    expect(unSubmitFiltered[0].name).toBe('콕콕콕');
  });
});
