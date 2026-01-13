import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { useClubEdit } from '@/app/admin/my-club/_hooks/useClubEdit';

const mockClub: ClubDetail = {
  name: '테스트 동아리',
  tag: '배드민턴',
  category: '체육',
  leader: '김주장',
  phoneNumber: '010-1234-5678',
  location: 's1234',
  regularMeeting: '2025.08.21~2025.09.04',
  introduction: '동아리 소개',
  activity: '주 1회 활동',
  ideal: '성실한 사람',
  profileImage: {
    originUrl: 'https://example.com/profile.jpg',
    cdnUrl: 'https://cdn.example.com/profile.jpg',
  },
  introductionImage: {
    originUrl: 'https://example.com/intro.jpg',
    cdnUrl: 'https://cdn.example.com/intro.jpg',
  },
};

const mockMutateAsync = vi.fn();
vi.mock('@/app/_api/mutations/club', () => ({
  useUpdateClub: () => ({ mutateAsync: mockMutateAsync }),
}));

describe('useClubEdit 테스트', () => {
  beforeEach(() => vi.clearAllMocks());

  it('초기 데이터를 목데이터로 설정한다.', () => {
    const { result } = renderHook(() => useClubEdit(mockClub));
    expect(result.current.club).toEqual(mockClub);
    expect(result.current.isEditing).toBe(false);
  });

  it('handleClickEdit으로 편집 모드로 전환한다.', () => {
    const { result } = renderHook(() => useClubEdit(mockClub));
    act(() => result.current.handleClickEdit());
    expect(result.current.isEditing).toBe(true);
  });

  it('handleChange로 값을 업데이트 한다.', () => {
    const { result } = renderHook(() => useClubEdit(mockClub));
    act(() =>
      result.current.handleChange({
        target: { name: 'leader', value: '박주장' },
      } as React.ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.club.leader).toBe('박주장');
  });

  it('handleClickCancel로 원래 값을 복원한다.', () => {
    const { result } = renderHook(() => useClubEdit(mockClub));
    act(() => {
      result.current.handleClickEdit();
      result.current.handleChange({
        target: { name: 'leader', value: '박주장' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleClickCancel();
    });
    expect(result.current.club.leader).toBe('김주장');
  });
});
