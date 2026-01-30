import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { Form } from '@/app/_api/types/apply';
import { ApplyAdminClientPage } from '@/app/admin/apply/_pages/ApplyAdminClientPage';
import { mockPush } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

import { mockEmptyForms, mockForms, mockSingleForm } from './apply-admin.data';

describe('ApplyAdminClientPage 통합테스트', () => {
  beforeEach(() => {
    testQueryClient.setQueryData(['apply'], mockForms);
  });

  afterEach(() => {
    testQueryClient.clear();
    vi.clearAllMocks();
  });

  describe('렌더링 테스트', () => {
    it('지원서 생성하기 버튼이 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      expect(
        screen.getByRole('button', { name: '생성하기' }),
      ).toBeInTheDocument();
    });

    it('모든 필터 옵션이 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      expect(screen.getByText(/전체/)).toBeInTheDocument();
      expect(screen.getByText(/진행전/)).toBeInTheDocument();
      expect(screen.getByText(/진행중/)).toBeInTheDocument();
      expect(screen.getByText(/종료/)).toBeInTheDocument();
    });

    it('지원서 목록이 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      mockForms.forEach((form) => {
        expect(screen.getByText(form.title)).toBeInTheDocument();
      });
    });

    it('각 지원서에 기간이 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      mockForms.forEach((form) => {
        expect(
          screen.getByText(`${form.startDate} ~ ${form.endDate}`),
        ).toBeInTheDocument();
      });
    });

    it('각 지원서에 상태 배지가 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      expect(screen.getByText('진행 중')).toBeInTheDocument();
      expect(screen.getByText('마감')).toBeInTheDocument();
      expect(screen.getByText('진행 전')).toBeInTheDocument();
    });
  });

  describe('필터 기능 테스트', () => {
    it('전체 필터 클릭 시 모든 지원서가 표시된다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const allFilter = screen.getByRole('button', { name: /전체/ });
      await user.click(allFilter);

      mockForms.forEach((form) => {
        expect(screen.getByText(form.title)).toBeInTheDocument();
      });
    });

    it('"진행전" 필터 클릭 시 진행 전 상태의 지원서만 표시된다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const beforeFilter = screen.getByRole('button', { name: /진행전/ });
      await user.click(beforeFilter);

      expect(screen.getByText('2025년 하계 특별 모집')).toBeInTheDocument();
      expect(
        screen.queryByText('2025년 1학기 신입부원 모집'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('2024년 2학기 신입부원 모집'),
      ).not.toBeInTheDocument();
    });

    it('"진행중" 필터 클릭 시 진행 중 상태의 지원서만 표시된다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const inProgressFilter = screen.getByRole('button', { name: /진행중/ });
      await user.click(inProgressFilter);

      expect(
        screen.getByText('2025년 1학기 신입부원 모집'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('2024년 2학기 신입부원 모집'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('2025년 하계 특별 모집'),
      ).not.toBeInTheDocument();
    });

    it('"종료" 필터 클릭 시 마감 상태의 지원서만 표시된다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const closedFilter = screen.getByRole('button', { name: /종료/ });
      await user.click(closedFilter);

      expect(
        screen.getByText('2024년 2학기 신입부원 모집'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('2025년 1학기 신입부원 모집'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('2025년 하계 특별 모집'),
      ).not.toBeInTheDocument();
    });

    it('필터별 개수가 정확하게 표시된다.', () => {
      render(<ApplyAdminClientPage />);

      const getFilter = (label: RegExp) =>
        screen.getByRole('button', { name: label });

      expect(getFilter(/전체/)).toHaveTextContent('(3)');
      expect(getFilter(/진행전/)).toHaveTextContent('(1)');
      expect(getFilter(/진행 중/)).toHaveTextContent('(1)');
      expect(getFilter(/종료/)).toHaveTextContent('(1)');
    });
  });

  describe('네비게이션 테스트', () => {
    it('생성하기 버튼 클릭 시 지원서 생성 페이지로 이동한다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const createButton = screen.getByRole('button', { name: '생성하기' });
      await user.click(createButton);

      expect(mockPush).toHaveBeenCalledWith('/apply/new');
    });

    it('지원서 카드 클릭 시 해당 지원서 상세 페이지로 이동한다.', async () => {
      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const formCard = screen.getByText('2025년 1학기 신입부원 모집');
      await user.click(formCard);

      expect(mockPush).toHaveBeenCalledWith('/apply/1');
    });
  });

  describe('예외 케이스', () => {
    it('지원서가 없을 경우 안내 메시지 UI가 표시된다.', () => {
      testQueryClient.setQueryData(['apply'], mockEmptyForms);
      render(<ApplyAdminClientPage />);

      expect(screen.getByText('지원서 관리')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '생성하기' }),
      ).toBeInTheDocument();

      const emptyMessage = screen.getByText('생성된 지원서가 없습니다.');

      expect(emptyMessage).toBeInTheDocument();
      expect(emptyMessage.tagName).toBe('P');

      mockForms.forEach((form) => {
        expect(screen.queryByText(form.title)).not.toBeInTheDocument();
      });
    });

    it('지원서가 하나만 있을 경우에도 정상적으로 표시된다.', () => {
      testQueryClient.setQueryData(['apply'], mockSingleForm);
      render(<ApplyAdminClientPage />);

      expect(
        screen.getByText('2025년 1학기 신입부원 모집'),
      ).toBeInTheDocument();

      expect(screen.queryAllByText(mockForms[0].title)).toHaveLength(1);
    });

    it('필터링 결과가 없을 경우 "생성된 지원서가 없습니다." 안내 메시지가 표시된다.', async () => {
      testQueryClient.setQueryData<Form[]>(
        ['apply'],
        [
          {
            formId: 1,
            title: '진행 중인 지원서',
            startDate: '2025-03-01',
            endDate: '2025-03-15',
            formStatus: '진행 중',
          },
        ],
      );

      const user = userEvent.setup();
      render(<ApplyAdminClientPage />);

      const beforeFilter = screen.getByRole('button', { name: /진행전/ });
      await user.click(beforeFilter);

      expect(screen.getByText('생성된 지원서가 없습니다.')).toBeInTheDocument();
    });
  });
});
