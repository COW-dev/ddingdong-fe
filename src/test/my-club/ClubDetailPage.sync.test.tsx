import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { ClubDetailView } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { mockToast, mockFetcher } from '@/test/setup';
import { render } from '@/test/utils';

import { myClubMock } from './my-clubMock';

describe('ClubDetailClientPage 동기 테스트', () => {
  it('값을 변경하고 확인 버튼을 누르면 서버로 데이터가 전송된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailView clubData={myClubMock} />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const tagInput = screen.getByDisplayValue('배드민턴');
    await user.clear(tagInput);
    await user.type(tagInput, '수정된 태그');

    await user.click(screen.getByRole('button', { name: '확인' }));

    await waitFor(() => {
      expect(mockFetcher.patch).toHaveBeenCalledWith(
        'central/my',
        expect.objectContaining({
          json: expect.objectContaining({
            tag: '수정된 태그',
            name: '테스트 동아리',
            leader: '김주장',
          }),
        }),
      );
    });

    expect(mockToast.success).toHaveBeenCalledWith('동아리 정보를 수정했어요.');

    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });
});
