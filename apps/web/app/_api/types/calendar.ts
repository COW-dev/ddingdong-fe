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

export const calendarEventResponseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  startDate: calendarDateSchema,
  endDate: calendarDateSchema,
  repeatEndDate: calendarDateSchema,
  repeatType: calendarRepeatTypeSchema,
  category: z.string().min(1),
  color: categoryColorSchema,
});

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

export const calendarEventRequestSchema = z.object({
  title: z.string().trim().min(1, '일정 제목을 입력해 주세요.'),
  startDate: calendarDateSchema,
  endDate: calendarDateSchema,
  repeatEndDate: calendarDateSchema,
  repeatType: calendarRepeatTypeSchema,
  categoryId: z.number().int().positive(),
});

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
