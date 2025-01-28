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
