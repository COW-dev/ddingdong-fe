import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';
import { ClubDetailClientPage } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { render, testQueryClient } from '@/test/utils';
import { mockFetcher, mockToast } from '@/test/setup';
import { ApiError } from '@/app/_api/fetcher';

import { myClubMock } from './my-club.data';


describe('실패 케이스', () => {
  const mockOnChange = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    testQueryClient.setQueryData(['clubs', 'my'], myClubMock);
  });

  afterEach(() => {
    testQueryClient.clear();
  });

  it('빈 문자열로 데이터를 전달하면 텍스트는 표시되지 않는다.', () => {
    const emptyClubData: ClubDetail = {
      ...myClubMock,
      leader: '',
      regularMeeting: '',
    };

    render(
      <ClubInfoForm
        club={emptyClubData}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(screen.queryByText('김주장')).not.toBeInTheDocument();
    expect(screen.queryByText('2025.08.21~2025.09.04')).not.toBeInTheDocument();
  });

  it('편집 모드가 아닐 때 input 필드는 렌더링되지 않는다.', () => {
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  });

  it('편집 모드가 아닐 때 사용자는 입력이 불가능하다.', () => {
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('일부 필드만 빈 값일 경우 나머지 필드는 정상적으로 표시된다.', () => {
    const partialEmptyClubData: ClubDetail = {
      ...myClubMock,
      leader: '',
      location: '',
    };

    render(
      <ClubInfoForm
        club={partialEmptyClubData}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(screen.queryByText('김주장')).not.toBeInTheDocument();
    expect(screen.queryByText('S1234')).not.toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
    expect(screen.getByText('2025.08.21~2025.09.04')).toBeInTheDocument();
  });

  it('편집 모드에서 값을 변경하고 확인을 누르면 변경된 값이 유지된다.', async () => {
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

  it('동아리 정보 수정에 실패하면 에러 메시지가 토스트로 표시된다.', async () => {
    const user = userEvent.setup();
    const errorMessage = '동아리 정보 수정에 실패했습니다.';

    const apiError = new ApiError(400, errorMessage, new Date().toISOString());

    mockFetcher.patch.mockRejectedValueOnce(apiError);

    render(<ClubDetailClientPage />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');

    const submitButton = screen.getByRole('button', { name: '확인' });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockFetcher.patch).toHaveBeenCalled();
        expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
      }
    );

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '정보 수정하기' })).not.toBeInTheDocument();
  });
});
