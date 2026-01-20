import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { ApiError } from '@/app/_api/fetcher';
import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';
import { ClubDetailClientPage } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { mockFetcher, mockToast } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

import { myClubMock } from './my-club.data';

describe('ClubDetailClientPage 통합 테스트', () => {
  const mockOnChange = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    testQueryClient.setQueryData(['clubs', 'my'], myClubMock);
  });

  afterEach(() => {
    testQueryClient.clear();
  });
  it('렌더링을 하면 동아리에 대한 정보를 표시한다.', () => {
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );
    const texts = ['김주장', '010-1234-5678', 'S1234', '2025.08.21~2025.09.04'];
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
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

  it('편집 모드일때 값을 변경하면 사용자가 입력한 값으로 변경된다.', async () => {
    const user = userEvent.setup();
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const inputs = [
      { placeholder: '김주장', newValue: '테스트' },
      { placeholder: '010-1234-5678', newValue: '010-9999-9999' },
      { placeholder: 'S1234', newValue: 'S5678' },
      {
        placeholder: '2025.08.21~2025.09.04',
        newValue: '2025.09.01~2025.09.30',
      },
    ];

    for (const { placeholder, newValue } of inputs) {
      const input = screen.getByDisplayValue(placeholder);
      await user.clear(input);
      await user.type(input, newValue);
      expect(mockOnChange).toHaveBeenCalled();
      mockOnChange.mockClear();
    }
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

  it('편집 모드일 경우 TEXTAREA 태그 대신 INPUT 태그가 존재한다.', () => {
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input.tagName).toBe('INPUT');
    });

    const textareas = screen
      .queryAllByRole('textbox')
      .filter((element) => element.tagName === 'TEXTAREA');
    expect(textareas).toHaveLength(0);

    expect(inputs.length).toBeGreaterThan(0);
  });

  it('동아리 회장 변경에 성공하면 토스트 메시지가 나타나고 편집 모드가 종료된다.', async () => {
    mockFetcher.get.mockResolvedValueOnce(myClubMock).mockResolvedValueOnce({
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
      expect(mockFetcher.patch).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith(
        '동아리 정보를 수정했어요.',
      );
    });

    expect(screen.getByText('새로운주장')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });
});

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

    await waitFor(() => {
      expect(mockFetcher.patch).toHaveBeenCalled();
      expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    });

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '정보 수정하기' }),
    ).not.toBeInTheDocument();
  });
});
