import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { myClubMock as mockClub } from './my-clubMock';

import { render } from '@/test/utils';
import { ClubInfoForm } from '@/app/admin/my-club/_components/ClubInfoForm';

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
});
