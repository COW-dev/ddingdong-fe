import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { ClubDetailView } from '@/app/admin/my-club/_pages/ClubDetailClientPage';
import { render } from '@/test/utils';

import { myClubMock } from './my-clubMock';

describe('ClubDetailClientPage 수정 테스트', () => {
  it('정보 수정하기 버튼을 누르면 편집 모드로 전환되고 입력 필드가 활성화된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailView clubData={myClubMock} />);

    const editButton = screen.getByRole('button', { name: '정보 수정하기' });
    await user.click(editButton);

    const tagInput = screen.getByDisplayValue('배드민턴');
    expect(tagInput).toBeInTheDocument();

    const leaderInput = screen.getByDisplayValue('김주장');
    expect(leaderInput).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('편집 모드에서 값을 변경하고 취소하면 원래 값으로 복구된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailView clubData={myClubMock} />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.clear(leaderInput);
    await user.type(leaderInput, '새로운주장');
    expect(leaderInput).toHaveValue('새로운주장');

    await user.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.getByText('김주장')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '정보 수정하기' }),
    ).toBeInTheDocument();
  });

  it('입력 필드의 지우기 버튼을 누르면 해당 필드가 초기화된다.', async () => {
    const user = userEvent.setup();
    render(<ClubDetailView clubData={myClubMock} />);

    await user.click(screen.getByRole('button', { name: '정보 수정하기' }));

    const leaderInput = screen.getByDisplayValue('김주장');
    await user.clear(leaderInput);
    expect(leaderInput).toHaveValue('');
  });
});
