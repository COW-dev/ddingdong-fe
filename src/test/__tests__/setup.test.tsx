import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { render } from '@/test/utils';

describe('테스트 환경 설정 확인', () => {
  it('테스트 환경이 정상 작동해야 함', () => {
    render(<div>테스트</div>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });
});
