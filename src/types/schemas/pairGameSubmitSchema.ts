import { z } from 'zod';

export const pairGameSubmitSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요.'),
  studentNumber: z
    .string()
    .regex(/^60\d{6}$/, '올바른 학번을 입력하세요. (예시: 60123456)'),
  department: z.string().min(1, '학과를 선택해주세요.'),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다.'),
});

export type PairGameSubmitType = z.infer<typeof pairGameSubmitSchema>;
