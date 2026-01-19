import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { ClubDetailClientPage } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { mockFetcher, mockToast } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

import { myClubMock } from './my-club.data';

describe('ClubDetailClientPage 편집 테스트', () => {
  beforeEach(() => {
    testQueryClient.setQueryData(['clubs', 'my'], myClubMock);
  });

  afterEach(() => {
    testQueryClient.clear();
  });

  it('정보 수정하기 버튼을 누르면 편집 모드로 전환되고 입력 필드가 활성화된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailClientPage />);

    const editButton = screen.getByRole('button', { name: '정보 수정하기' });
    await user.click(editButton);

    const tagInput = screen.getByDisplayValue('배드민턴');
    expect(tagInput).toBeInTheDocument();

    const leaderInput = screen.getByDisplayValue('김주장');
    expect(leaderInput).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('편집 모드에서 값을 변경하고 취소하면 원래 값으로 복구된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailClientPage />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');
    expect(leaderInput).toHaveValue('새로운주장');

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.getByText('김주장')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });



  it('정보 수정이 성공하면 토스트 메시지가 나타나고 편집 모드가 종료된다.', async () => {
    mockFetcher.get
      .mockResolvedValueOnce(myClubMock)
      .mockResolvedValueOnce({
        ...myClubMock,
        leader: '새로운주장',
      });

    const user = userEvent.setup();
    render(<ClubDetailClientPage />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');

    await user.click(screen.getByRole('button', { name: '확인' }));

    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('동아리 정보를 수정했어요.');
    });

    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });

});

