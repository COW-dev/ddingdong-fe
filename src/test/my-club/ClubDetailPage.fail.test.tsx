import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';
import { render } from '@/test/utils';

import { myClubMock } from './my-club.data';

describe('실패 케이스', () => {
  const mockOnChange = vi.fn();
  const mockOnReset = vi.fn();

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
});
