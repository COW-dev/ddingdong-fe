import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { ApiError } from '@/app/_api/fetcher';
import { ScoreHistory, ScoreDetail } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { mockFetcher, mockToast } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

describe('동아리 카테고리 별 점수 추가 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    mockFetcher.post.mockReset();
    testQueryClient.clear();
  });

  it.each(Object.entries(CATEGORY).map(([key, value]) => [key, value.name]))(
    '%s 카테고리 점수 추가 시 즉시 리스트에 반영된다',
    async (_key, name) => {
      const user = userEvent.setup();

      const newHistory: ScoreHistory = {
        scoreCategory: name,
        reason: '테스트 사유',
        amount: 10,
        createdAt: '2024-10-17T09:15:00.000Z',
      };

      const initialData: ScoreDetail = {
        totalScore: 100,
        scoreHistories: [],
      };

      const updatedData: ScoreDetail = {
        totalScore: initialData.totalScore + newHistory.amount,
        scoreHistories: [newHistory],
      };

      mockFetcher.get.mockResolvedValueOnce(initialData);

      render(<ScoreClientPage id="1" />);

      await screen.findByText(new RegExp(`총점\\s*:\\s*100\\s*점`));

      await user.click(screen.getByText(name));
      await user.type(
        screen.getByPlaceholderText('사유를 입력해주세요.'),
        '테스트 사유',
      );
      await user.type(
        screen.getByPlaceholderText('점수를 입력해주세요.'),
        '10',
      );
      mockFetcher.post.mockResolvedValueOnce({});
      mockFetcher.get.mockResolvedValueOnce(updatedData);

      await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));


      const historyTable = await screen.findByRole('table');
      await within(historyTable).findByText(name);
      expect(within(historyTable).getByText(/10\s*점/)).toBeInTheDocument();
    },
  );

  it('점수 추가 시 totalScore에 반영된다', async () => {
    const user = userEvent.setup();

    const newScore = 10;
    const newHistory: ScoreHistory = {
      scoreCategory: CATEGORY.CLEANING.name,
      reason: '테스트',
      amount: newScore,
      createdAt: '2024-10-17T09:15:00.000Z',
    };

    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    const updatedData: ScoreDetail = {
      totalScore: initialData.totalScore + newScore,
      scoreHistories: [newHistory],
    };

    mockFetcher.get.mockResolvedValueOnce(initialData);

    render(<ScoreClientPage id="1" />);

    await screen.findByText(new RegExp(`총점\\s*:\\s*100\\s*점`));

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트',
    );
    await user.type(
      screen.getByPlaceholderText('점수를 입력해주세요.'),
      String(newScore),
    );


    mockFetcher.post.mockResolvedValueOnce({});
    mockFetcher.get.mockResolvedValueOnce(updatedData);

    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

  
    await screen.findByText(new RegExp(`총점\\s*:\\s*110\\s*점`));
  });

  it('점수 등록 API가 "존재하지 않는 카테고리" 에러를 반환하면 에러 토스트를 노출한다', async () => {
    const user = userEvent.setup();

    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    const errorMessage = '존재하지 않는 카테고리입니다.';
    const apiError = new ApiError(400, errorMessage, new Date().toISOString());

    mockFetcher.get.mockResolvedValueOnce(initialData);

    mockFetcher.post.mockRejectedValueOnce(apiError);

    render(<ScoreClientPage id="1" />);

    await screen.findByText(new RegExp(`총점\\s*:\\s*100\\s*점`));

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트 사유',
    );
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
