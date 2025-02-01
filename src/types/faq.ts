export type Faq = {
  id: number;
  question: string;
  reply: string;
  createdAt: string;
};

export type CreateFaq = {
  token: string;
  faqData: object;
};

export type DeleteFaq = {
  token: string;
  questionId: number;
};

export type FAQItem = {
  question: string;
  reply: string;
};

export type UpdateFaq = {
  token: string;
  questionId: number;
  faqData: FAQItem;
};
