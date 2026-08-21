import { z } from 'zod';

export const CALENDAR_REPEAT_TYPES = [
  'NONE',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
] as const;

export const calendarRepeatTypeSchema = z.enum(CALENDAR_REPEAT_TYPES);

const calendarDateSchema = z.string().date();
const categoryColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const calendarEventDateRangeSchema = z.object({
  startDate: calendarDateSchema,
  endDate: calendarDateSchema,
  repeatEndDate: calendarDateSchema,
  repeatType: calendarRepeatTypeSchema,
});

type CalendarEventDateRange = z.infer<typeof calendarEventDateRangeSchema>;

function validateCalendarEventDateRange(
  { startDate, endDate, repeatEndDate, repeatType }: CalendarEventDateRange,
  context: z.RefinementCtx,
) {
  if (endDate < startDate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: '종료일은 시작일보다 빠를 수 없습니다.',
      path: ['endDate'],
    });
  }
  if (repeatEndDate < endDate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: '반복 종료일은 일정 종료일보다 빠를 수 없습니다.',
      path: ['repeatEndDate'],
    });
  }
  if (repeatType === 'NONE' && repeatEndDate !== endDate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        '반복하지 않는 일정의 반복 종료일은 일정 종료일과 같아야 합니다.',
      path: ['repeatEndDate'],
    });
  }
}

export const calendarEventResponseSchema = calendarEventDateRangeSchema
  .extend({
    id: z.number().int().positive(),
    title: z.string().min(1),
    category: z.string().min(1),
    color: categoryColorSchema,
  })
  .superRefine(validateCalendarEventDateRange);

export const calendarResponseSchema = z.object({
  events: z.array(calendarEventResponseSchema),
});

export const calendarCategoryResponseSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  color: categoryColorSchema,
});

export const calendarCategoriesResponseSchema = z.object({
  categories: z.array(calendarCategoryResponseSchema),
});

export const calendarEventRequestSchema = calendarEventDateRangeSchema
  .extend({
    title: z.string().trim().min(1, '일정 제목을 입력해 주세요.'),
    categoryId: z.number().int().positive(),
  })
  .superRefine(validateCalendarEventDateRange);

export const calendarCategoryRequestSchema = z.object({
  categoryName: z.string().trim().min(1, '카테고리 이름을 입력해 주세요.'),
  color: categoryColorSchema,
});

export type CalendarEventResponse = z.infer<typeof calendarEventResponseSchema>;
export type CalendarResponse = z.infer<typeof calendarResponseSchema>;
export type CalendarCategoryResponse = z.infer<
  typeof calendarCategoryResponseSchema
>;
export type CalendarEventRequest = z.infer<typeof calendarEventRequestSchema>;
export type CalendarCategoryRequest = z.infer<
  typeof calendarCategoryRequestSchema
>;
export type CalendarRepeatType = z.infer<typeof calendarRepeatTypeSchema>;
