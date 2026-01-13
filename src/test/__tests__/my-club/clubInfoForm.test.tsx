import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';

const mockClub = {
  leader: '김주장',
  phoneNumber: '010-1234-5678',
  location: 'S1234',
  regularMeeting: '매주 수요일 18:00',
} as ClubDetail;

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

    expect(screen.getByText('김주장')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
  });

  it('입력값을 변경할 때 onChang가 호출된다', async () => {
    const user = userEvent.setup();

    render(
      <ClubInfoForm
        club={mockClub}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );
    const input = screen.getByDisplayValue('김주장');
    await user.clear(input);
    await user.type(input, '박띵동');

    expect(mockOnChange).toHaveBeenCalled();
  });
});
