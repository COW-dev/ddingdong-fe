import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { useCreateScore } from '@/app/_api/mutations/score';
import { ScoreDetail } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { mockFetcher } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

vi.mock('@/app/_api/mutations/score', () => ({
  useCreateScore: vi.fn(),
}));

describe('점수 추가 시 validation 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
  });

  it('사유가 없으면 점수 추가가 되지 않는다', async () => {
    const user = userEvent.setup();
    const mutateSpy = vi.fn();

    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    mockFetcher.get.mockResolvedValue(initialData);

    vi.mocked(useCreateScore).mockReturnValue({
      mutate: mutateSpy,
    } as unknown as ReturnType<typeof useCreateScore>);

    render(<ScoreClientPage id="1" />);

    await screen.findByText(new RegExp(`총점\\s*:\\s*100\\s*점`));

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mutateSpy).not.toHaveBeenCalled();
  });

  it('점수가 없으면 점수 추가가 되지 않는다', async () => {
    const user = userEvent.setup();
    const mutateSpy = vi.fn();

    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    mockFetcher.get.mockResolvedValue(initialData);

    vi.mocked(useCreateScore).mockReturnValue({
      mutate: mutateSpy,
    } as unknown as ReturnType<typeof useCreateScore>);

    render(<ScoreClientPage id="1" />);

    await screen.findByText(new RegExp(`총점\\s*:\\s*100\\s*점`));

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트 사유',
    );
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
