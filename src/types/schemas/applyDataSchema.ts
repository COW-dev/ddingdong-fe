import { z } from 'zod';

import { commonQuestionSchema } from './commonQuestionSchema';

export const applyDataSchema = commonQuestionSchema.extend({
  formAnswers: z.array(
    z.object({
      fieldId: z.union([z.string(), z.number()]),
      value: z.union([z.string(), z.array(z.string())]),
    }),
  ),
});

export type ApplyDataType = z.infer<typeof applyDataSchema>;
