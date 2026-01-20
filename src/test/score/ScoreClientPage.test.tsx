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
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    mockFetcher.post.mockReset();
    testQueryClient.clear();
    user = userEvent.setup();
  });

  it.each(Object.entries(CATEGORY).map(([key, value]) => [key, value.name]))(
    '%s 카테고리 점수 추가 시 즉시 리스트에 반영된다',
    async (_key, name) => {
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
      mockFetcher.post.mockResolvedValueOnce({
        success: true,
      });
      mockFetcher.get.mockResolvedValueOnce(updatedData);

      render(<ScoreClientPage id="1" />);

      await screen.findByRole('table');

      await user.click(screen.getByText(name));
      await user.type(
        screen.getByPlaceholderText('사유를 입력해주세요.'),
        '테스트 사유',
      );
      await user.type(
        screen.getByPlaceholderText('점수를 입력해주세요.'),
        '10',
      );

      await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith('점수를 추가했어요.');
      });

      const historyTable = await screen.findByRole('table');
      expect(await within(historyTable).findByText(name)).toBeInTheDocument();
      expect(within(historyTable).getByText('10점')).toBeInTheDocument();
    },
  );
  it('점수 추가 시 totalScore에 반영된다', async () => {
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
    mockFetcher.post.mockResolvedValueOnce({
      success: true,
    });
    mockFetcher.get.mockResolvedValueOnce(updatedData);

    render(<ScoreClientPage id="1" />);

    await screen.findByRole('table');

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트',
    );
    await user.type(
      screen.getByPlaceholderText('점수를 입력해주세요.'),
      String(newScore),
    );

    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('점수를 추가했어요.');
    });

    await screen.findByText('총점 : 110점');
  });

  it('존재하지 않는 카테고리(ex.가나다)로 데이터를 보내면 존재하지 않는 카테고리입니다. 텍스트와 400에러를 반환한다.', async () => {
    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    const apiError = new ApiError(
      400,
      '존재하지 않는 카테고리입니다.',
      new Date().toISOString(),
    );

    mockFetcher.get.mockResolvedValueOnce(initialData);
    mockFetcher.post.mockRejectedValueOnce(apiError);

    render(<ScoreClientPage id="1" />);

    await screen.findByRole('table');

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트 사유',
    );
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        '존재하지 않는 카테고리입니다.',
      );
    });
  });
});

describe('동아리 점수 추가 시 상세 내역 동기화 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
  });

  it('점수 데이터가 요약 영역과 히스토리 영역에 정상적으로 표시된다', async () => {
    const scoreHistories: ScoreHistory[] = [
      {
        scoreCategory: CATEGORY.CLEANING.name,
        reason: '10월 청소평가',
        amount: 11,
        createdAt: '2024-10-15T10:30:00.000Z',
      },
      {
        scoreCategory: CATEGORY.ACTIVITY_REPORT.name,
        reason: '10월 전동대회 참여',
        amount: 20,
        createdAt: '2024-10-16T14:20:00.000Z',
      },
    ];

    const totalScore = scoreHistories.reduce((acc, cur) => acc + cur.amount, 0);
    const initialData: ScoreDetail = { totalScore, scoreHistories };

    mockFetcher.get.mockResolvedValue(initialData);

    render(<ScoreClientPage id="1" />);

    await screen.findByRole('table');

    const historyTable = screen.getByRole('table');

    expect(
      within(historyTable).getByText(CATEGORY.CLEANING.name),
    ).toBeInTheDocument();
    expect(within(historyTable).getByText('11점')).toBeInTheDocument();
    expect(within(historyTable).getByText('2024-10-15')).toBeInTheDocument();

    expect(
      within(historyTable).getByText(CATEGORY.ACTIVITY_REPORT.name),
    ).toBeInTheDocument();
    expect(within(historyTable).getByText('20점')).toBeInTheDocument();
    expect(within(historyTable).getByText('2024-10-16')).toBeInTheDocument();
  });

  it.each(Object.entries(CATEGORY))(
    '%s 카테고리 클릭 시 해당 카테고리의 상세 내역만 표시된다',
    async (categoryKey, { name }) => {
      const user = userEvent.setup();

      const OTHER_CATEGORY_NAME = '다른 카테고리';

      const scoreHistories: ScoreHistory[] = [
        {
          scoreCategory: name,
          reason: `${name} 테스트 1`,
          amount: 10,
          createdAt: '2024-10-15T10:30:00.000Z',
        },
        {
          scoreCategory: name,
          reason: `${name} 테스트 2`,
          amount: 6,
          createdAt: '2024-10-16T14:20:00.000Z',
        },
        {
          scoreCategory: OTHER_CATEGORY_NAME,
          reason: `${OTHER_CATEGORY_NAME} 데이터`,
          amount: 20,
          createdAt: '2024-10-17T09:15:00.000Z',
        },
      ];

      const totalScore = scoreHistories.reduce(
        (acc, cur) => acc + cur.amount,
        0,
      );
      const initialData: ScoreDetail = { totalScore, scoreHistories };

      mockFetcher.get.mockResolvedValue(initialData);

      render(<ScoreClientPage id="1" />);

      await screen.findByRole('table');

      const categoryElements = screen.getAllByText(name);
      await user.click(categoryElements[categoryElements.length - 1]);

      expect(screen.getByText('상세내역')).toBeInTheDocument();
      expect(screen.getByText(`${name} 테스트 1`)).toBeInTheDocument();
      expect(screen.getByText(`${name} 테스트 2`)).toBeInTheDocument();
      expect(
        screen.queryByText(`다른 카테고리 데이터`),
      ).not.toBeInTheDocument();
    },
  );
});

describe('점수 추가 시 validation 테스트', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
    user = userEvent.setup();
  });

  it('사유가 없으면 점수 추가가 되지 않는다', async () => {
    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    mockFetcher.get.mockResolvedValue(initialData);

    render(<ScoreClientPage id="1" />);

    await screen.findByRole('table');

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mockToast.error).toHaveBeenCalledWith('사유를 입력해주세요.');
  });

  it('점수가 없으면 점수 추가가 되지 않는다', async () => {
    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    mockFetcher.get.mockResolvedValue(initialData);

    render(<ScoreClientPage id="1" />);

    await screen.findByRole('table');

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트 사유',
    );
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mockToast.error).toHaveBeenCalledWith('점수를 입력해주세요.');
  });
});
