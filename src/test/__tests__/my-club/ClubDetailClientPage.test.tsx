import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { beforeEach, describe, it, vi, expect } from 'vitest';

import ClubDetailClientPage from '@/app/admin/my-club/_pages/ClubDetailClientPage';

const mockClub = {
  name: '테스트동아리',
  leader: '김주장',
  phoneNumber: '010-1234-5678',
  location: 'S1234',
  regularMeeting: '매주 수요일',
  profileImage: null,
};

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      data: mockClub,
      error: null,
      isError: false,
      status: 'success',
    })),
  };
});

function renderClientPage(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe('ClubDetailClientPage 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('클럽 정보가 제대로 렌더링 됐는지 확인한다.', () => {
    const { getByText } = renderClientPage(<ClubDetailClientPage />);

    expect(getByText('테스트동아리')).toBeInTheDocument();
    expect(getByText('김주장')).toBeInTheDocument();
    expect(getByText('S1234')).toBeInTheDocument();
    expect(getByText('010-1234-5678')).toBeInTheDocument();
  });
});
