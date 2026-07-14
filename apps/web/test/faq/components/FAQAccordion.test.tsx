import { describe, expect, it } from 'vitest';

import { FAQAccordion } from '@/faq/_components/FAQAccordion';

import { render, screen } from '../../utils/render';

describe('FAQAccordion', () => {
  it('FAQ 목록을 질문 최신순으로 렌더링한다', () => {
    const faqs = [
      { id: 1, question: '첫 번째 질문', reply: '첫 번째 답변' },
      { id: 2, question: '두 번째 질문', reply: '두 번째 답변' },
    ];

    render(<FAQAccordion FAQs={faqs} />);

    const questions = screen.getAllByText(/질문$/);
    expect(questions[0]).toHaveTextContent('두 번째 질문');
    expect(questions[1]).toHaveTextContent('첫 번째 질문');
  });

  it('FAQ가 없으면 질문 항목을 렌더링하지 않는다', () => {
    render(<FAQAccordion FAQs={[]} />);

    expect(screen.queryByText(/질문$/)).not.toBeInTheDocument();
  });
});
