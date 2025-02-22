import { z } from 'zod';

export const commonQuestionSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요.'),
  studentNumber: z.string().min(8, '올바른 학번을 힙력하세요.'),
  department: z.string(),
  phoneNumber: z
    .string()
    .regex(/^010\d{8}$/, '올바른 전화번호 형식이 아닙니다.'),
  email: z.string().email('올바른 이메일을 입력하세요.'),
});

export type CommonQuestionType = z.infer<typeof commonQuestionSchema>;
