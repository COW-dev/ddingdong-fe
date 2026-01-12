import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';

const mockClub = {
  leader: '김띵동',
  phoneNumber: '010-1234-5678',
  location: 's1234',
  regularMeeting: '매주 수요일 18:00',
} as ClubDetail;

describe('ClubInfoForm', () => {
  it('렌더링을 하면 동아리에 대한 정보를 표시한다.', () => {
    const onChange = vi.fn();
    const onReset = vi.fn();

    render(
      <ClubInfoForm
        club={mockClub}
        isEditing={false}
        onChange={onChange}
        onReset={onReset}
      />,
    );

    expect(screen.getByText('김띵동')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
    expect(screen.getByText('')).toBeInTheDocument();
  });
});
