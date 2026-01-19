import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';
import { render } from '@/test/utils';

import { myClubMock as mockClub } from './my-club.data';

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

    const inputs = [
      { placeholder: '김주장', newValue: '테스트' },
      { placeholder: '010-1234-5678', newValue: '010-9999-9999' },
      { placeholder: 'S1234', newValue: 'S5678' },
      { placeholder: '2025.08.21~2025.09.04', newValue: '2025.09.01~2025.09.30' },
    ];

    for (const { placeholder, newValue } of inputs) {
      const input = screen.getByDisplayValue(placeholder);
      await user.clear(input);
      await user.type(input, newValue);
      expect(mockOnChange).toHaveBeenCalled();
      mockOnChange.mockClear();
    }
  });

  it('편집 모드일 경우 TEXTAREA 태그 대신 INPUT 태그가 존재한다.', () => {
    render(
      <ClubInfoForm
        club={mockClub}
        isEditing={true}
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input.tagName).toBe('INPUT');
    });

    const textareas = screen.queryAllByRole('textbox').filter(element => element.tagName === 'TEXTAREA');
    expect(textareas).toHaveLength(0);

    expect(inputs.length).toBeGreaterThan(0);
  });

  describe('실패 케이스', () => {
    it('빈 문자열로 데이터를 전달하면 텍스트는 표시되지 않는다.', () => {
      const emptyClubData: ClubDetail = {
        ...mockClub,
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
  })

});
