import { z } from 'zod';

export const formBasicInfoSchema = z.object({
  title: z.string().min(1, '지원서 제목을 입력하여주세요.').trim(),
  description: z
    .string()
    .max(255, '지원서 설명은 255자 이내로 작성하여주세요.')
    .optional()
    .nullable(),
  hasInterview: z.boolean(),
  recruitPeriod: z
    .object({
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
    })
    .refine((data) => data.startDate !== null && data.endDate !== null, {
      message: '모집 기간을 입력하여주세요.',
      path: ['recruitPeriod'],
    }),
});

export type FormBasicInfoSchemaType = z.infer<typeof formBasicInfoSchema>;
