import { toast } from 'react-hot-toast';

import { FormAnswer } from '@/app/_api/types/apply';
import { applyDataSchema } from '@/types/schemas/applyDataSchema';

type CommonQuestionData = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
};

type ApplyDataInput = {
  commonQuestionData: CommonQuestionData;
  formAnswers: FormAnswer[];
};

export function validateApplyData({
  commonQuestionData,
  formAnswers,
}: ApplyDataInput): boolean {
  const result = applyDataSchema.safeParse({
    name: commonQuestionData.name,
    studentNumber: commonQuestionData.studentNumber,
    department: commonQuestionData.department,
    email: commonQuestionData.email,
    phoneNumber: commonQuestionData.phoneNumber,
    formAnswers,
  });

  if (!result.success) {
    const formattedErrors = result.error.format();
    const firstErrorMessage = Object.values(formattedErrors)
      .flatMap((error) => (error && '_errors' in error ? error._errors : []))
      .find(Boolean);

    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
    }
    return false;
  }

  return true;
}
