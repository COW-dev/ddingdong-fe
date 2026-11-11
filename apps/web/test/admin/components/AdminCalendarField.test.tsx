import { useState } from 'react';

import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  AdminCalendarField,
  type CalendarDateRange,
} from '@/admin/_components/AdminCalendarField';

import { fireEvent, render, screen } from '../../utils/render';

function Field({ mode }: { mode: 'single' | 'range' }) {
  const [value, setValue] = useState<Date | null>(new Date(2026, 6, 13));
  const [range, setRange] = useState<CalendarDateRange>({
    startDate: new Date(2026, 6, 13),
    endDate: new Date(2026, 6, 14),
  });
  const base = {
    minDate: new Date(2026, 0, 1),
    maxDate: new Date(2026, 11, 31),
    placeholder: '날짜 선택',
    ariaLabel: '활동 날짜 선택',
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {mode === 'single' ? (
        <AdminCalendarField {...base} value={value} onChange={setValue} />
      ) : (
        <AdminCalendarField
          {...base}
          mode="range"
          value={range}
          onChange={setRange}
        />
      )}
      <button type="button">외부</button>
    </div>
  );
}

afterEach(() => vi.restoreAllMocks());

describe('AdminCalendarField', () => {
  it.each(['single', 'range'] as const)(
    '%s 팝업은 잘림 영역 밖에서 월 이동과 날짜 선택을 처리한다',
    async (mode) => {
      const user = userEvent.setup();
      const { container } = render(<Field mode={mode} />);
      await user.click(screen.getByRole('button', { name: '활동 날짜 선택' }));
      const dialog = screen.getByRole('dialog');
      expect(document.body).toContainElement(dialog);
      expect(container).not.toContainElement(dialog);

      await user.click(screen.getByRole('button', { name: '다음 달' }));
      expect(
        screen.getByRole('heading', { name: '2026년 8월' }),
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: '이전 달' }));
      expect(
        screen.getByRole('heading', { name: '2026년 7월' }),
      ).toBeInTheDocument();
      await user.click(
        screen.getByRole('gridcell', { name: '2026년 7월 15일' }),
      );
      if (mode === 'range') {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        await user.click(
          screen.getByRole('gridcell', { name: '2026년 7월 17일' }),
        );
      }
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    },
  );

  it('화면 오른쪽 아래에서는 팝업을 위로 옮기고 오른쪽 경계를 벗어나지 않는다', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      function (this: HTMLElement) {
        return this.getAttribute('role') === 'dialog'
          ? new DOMRect(0, 0, 444, 400)
          : new DOMRect(
              window.innerWidth - 100,
              window.innerHeight - 60,
              100,
              40,
            );
      },
    );
    const user = userEvent.setup();
    render(<Field mode="single" />);
    await user.click(screen.getByRole('button', { name: '활동 날짜 선택' }));
    expect(screen.getByRole('dialog')).toHaveStyle({
      left: `${window.innerWidth - 444 - 16}px`,
      top: `${window.innerHeight - 60 - 400 - 8}px`,
    });
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '활동 날짜 선택' }));
    await user.click(screen.getByRole('button', { name: '외부' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('스크롤해도 관리자 헤더 아래에서 멈추고 남은 높이에 맞춘다', async () => {
    let triggerTop = 200;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      function (this: HTMLElement) {
        if (this.classList.contains('admin-header'))
          return new DOMRect(0, 0, 1024, 72);
        if (this.getAttribute('role') === 'dialog')
          return new DOMRect(0, 0, 444, 900);
        return new DOMRect(100, triggerTop, 250, 40);
      },
    );
    const user = userEvent.setup();
    render(
      <>
        <header className="admin-header" />
        <Field mode="single" />
      </>,
    );
    await user.click(screen.getByRole('button', { name: '활동 날짜 선택' }));
    expect(screen.getByRole('dialog')).toHaveStyle({
      top: '80px',
      maxHeight: `${window.innerHeight - 96}px`,
    });
    triggerTop = -100;
    fireEvent.scroll(window);
    expect(screen.getByRole('dialog')).toHaveStyle({
      top: '80px',
      maxHeight: `${window.innerHeight - 96}px`,
    });
  });
});
