import { toast } from 'react-hot-toast';

import { FormAnswer, FormField } from '@/app/_api/types/apply';
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
  formFields: FormField[];
};

export function validateApplyData({
  commonQuestionData,
  formAnswers,
  formFields,
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

  const requiredFields = formFields.filter((field) => field.required);
  for (const field of requiredFields) {
    if (!field.id) continue;

    const answer = formAnswers.find((ans) => ans.fieldId === Number(field.id));
    const hasValue =
      answer &&
      (Array.isArray(answer.value)
        ? answer.value.length > 0 && answer.value.some((v) => v.trim() !== '')
        : typeof answer.value === 'string' && answer.value.trim() !== '');

    if (!hasValue) {
      toast.error(`필수 항목인 "${field.question}"을(를) 입력해주세요.`);
      return false;
    }
  }

  return true;
}
