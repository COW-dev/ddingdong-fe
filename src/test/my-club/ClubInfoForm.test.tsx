import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';
import { render } from '@/test/utils';

import { myClubMock as mockClub } from './my-clubMock';

describe('ClubInfoForm 테스트', () => {
  const mockOnChange = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('렌더링을 하면 동아리에 대한 정보를 표시한다.', () => {
    render(
      <ClubInfoForm
        club={mockClub}
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

  it('편집 모드일때 input 필드가 렌더링된다.', () => {
    render(
      <ClubInfoForm
        club={mockClub}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const leaderInput = screen.getByDisplayValue('김주장');
    const phoneInput = screen.getByDisplayValue('010-1234-5678');
    const locationInput = screen.getByDisplayValue('S1234');
    const regularMeetingInput = screen.getByDisplayValue(
      '2025.08.21~2025.09.04',
    );

    expect(leaderInput.tagName).toBe('INPUT');
    expect(phoneInput.tagName).toBe('INPUT');
    expect(locationInput.tagName).toBe('INPUT');
    expect(regularMeetingInput.tagName).toBe('INPUT');
  });

  it('편집 모드일때 값을 변경하면 사용자가 입력한 값으로 변경된다.', async () => {
    const user = userEvent.setup();
    render(
      <ClubInfoForm
        club={mockClub}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.type(leaderInput, '테스트');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('빈 문자열로 데이터를 전달하면 텍스트는 표시되지 않는다.', () => {
    const emptyClubData: ClubDetail = {
      ...mockClub,
      leader: '',
      phoneNumber: '',
      location: '',
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
    expect(screen.queryByText('010-1234-5678')).not.toBeInTheDocument();
    expect(screen.queryByText('S1234')).not.toBeInTheDocument();
    expect(screen.queryByText('2025.08.21~2025.09.04')).not.toBeInTheDocument();
  });

  it('편집 모드가 아닐 때 input 필드는 렌더링되지 않는다.', () => {
    render(
      <ClubInfoForm
        club={mockClub}
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
        club={mockClub}
        isEditing={false}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('일부 필드만 빈 값일 경우 나머지 필드는 정상적으로 표시된다.', () => {
    const partialEmptyClubData: ClubDetail = {
      ...mockClub,
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
});
