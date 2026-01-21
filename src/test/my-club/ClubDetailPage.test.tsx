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
    vi.clearAllMocks();
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
    const texts = [
      myClubMock.leader,
      myClubMock.phoneNumber,
      myClubMock.location,
      myClubMock.regularMeeting,
    ];
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('정보 수정하기 버튼을 누르면 편집 모드로 전환되고 입력 필드가 활성화된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailClientPage />);

    const editButton = screen.getByRole('button', { name: '정보 수정하기' });
    await user.click(editButton);

    const tagInput = screen.getByDisplayValue(myClubMock.tag);
    expect(tagInput).toBeInTheDocument();

    const leaderInput = screen.getByDisplayValue(myClubMock.leader);
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
      { placeholder: myClubMock.leader, newValue: '테스트' },
      { placeholder: myClubMock.phoneNumber, newValue: '010-9999-9999' },
      { placeholder: myClubMock.location, newValue: 'S5678' },
      {
        placeholder: myClubMock.regularMeeting,
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

    const leaderInput = screen.getByDisplayValue(myClubMock.leader);
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');
    expect(leaderInput).toHaveValue('새로운주장');

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.getByText(myClubMock.leader)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });

  it('편집 모드일 경우 값을 입력할 수 있는 INPUT 태그가 존재한다.', () => {
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

    const leaderInput = screen.getByDisplayValue(myClubMock.leader);
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
    vi.clearAllMocks();
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

    expect(screen.queryByText(myClubMock.leader)).not.toBeInTheDocument();
    expect(
      screen.queryByText(myClubMock.regularMeeting),
    ).not.toBeInTheDocument();
  });

  it('편집 모드가 아닐 때 input 필드는 보이지 않고 텍스트로만 정보가 표시된다.', () => {
    render(
      <ClubInfoForm
        club={myClubMock}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(
      screen.queryByDisplayValue(myClubMock.leader),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByDisplayValue(myClubMock.phoneNumber),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByDisplayValue(myClubMock.location),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByDisplayValue(myClubMock.regularMeeting),
    ).not.toBeInTheDocument();

    const texts = [
      myClubMock.leader,
      myClubMock.phoneNumber,
      myClubMock.location,
      myClubMock.regularMeeting,
    ];

    texts.forEach((text) => {
      const element = screen.getByText(text);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('DIV');
    });
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

    expect(screen.queryByText(myClubMock.leader)).not.toBeInTheDocument();
    expect(screen.queryByText(myClubMock.location)).not.toBeInTheDocument();
    expect(screen.getByText(myClubMock.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(myClubMock.regularMeeting)).toBeInTheDocument();
  });

  it('편집 모드에서 값을 변경하고 확인을 누르면 변경된 값이 유지된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailClientPage />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue(myClubMock.leader);
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');
    expect(leaderInput).toHaveValue('새로운주장');

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.getByText(myClubMock.leader)).toBeInTheDocument();
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

    const leaderInput = screen.getByDisplayValue(myClubMock.leader);
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
