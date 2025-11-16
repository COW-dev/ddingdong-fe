import { toast } from 'react-hot-toast';

import { SectionFormField } from '@/app/_api/types/apply';

import { FormBasicInfo } from '../_hooks/useFormBasicInfo';
import { formBasicInfoSchema } from '../_schemas/formBasicInfoSchema';

function getFirstErrorMessage(
  result: ReturnType<typeof formBasicInfoSchema.safeParse>,
): string | null {
  if (result.success) return null;

  const refineError = result.error.issues.find(
    (issue) => issue.code === 'custom',
  );
  if (refineError?.message) {
    return refineError.message;
  }

  const formattedErrors = result.error.format();

  if (formattedErrors.recruitPeriod?._errors?.[0]) {
    return formattedErrors.recruitPeriod._errors[0];
  }

  const firstErrorMessage = Object.values(formattedErrors)
    .flatMap((error) => (error && '_errors' in error ? error._errors : []))
    .find(Boolean);

  return firstErrorMessage || null;
}

export function validateBasicInfo(basicInfo: FormBasicInfo): boolean {
  const result = formBasicInfoSchema.safeParse({
    title: basicInfo.title,
    description: basicInfo.description,
    hasInterview: basicInfo.hasInterview,
    recruitPeriod: basicInfo.recruitPeriod,
  });

  if (!result.success) {
    const errorMessage = getFirstErrorMessage(result);
    if (errorMessage) {
      toast.error(errorMessage);
    }
    return false;
  }

  return true;
}

export function validateRecruitPeriod(
  recruitPeriod: FormBasicInfo['recruitPeriod'],
): boolean {
  const result =
    formBasicInfoSchema.shape.recruitPeriod.safeParse(recruitPeriod);

  if (!result.success) {
    const formattedErrors = result.error.format();
    const errorMessage = formattedErrors._errors?.[0];
    if (errorMessage) {
      toast.error(errorMessage);
    }
    return false;
  }

  if (recruitPeriod.startDate === null || recruitPeriod.endDate === null) {
    toast.error('모집 기간을 입력하여주세요.');
    return false;
  }

  return true;
}

export function validateQuestions(formField: SectionFormField[]): boolean {
  const allQuestions = formField.flatMap((section) => section.questions);

  if (allQuestions.length === 0) {
    toast.error('질문을 최소 1개 이상 추가하여주세요.');
    return false;
  }

  const emptyQuestion = allQuestions.find(
    (question) => !question.question || question.question.trim() === '',
  );

  if (emptyQuestion) {
    toast.error('모든 질문의 제목을 입력하여주세요.');
    return false;
  }

  const radioOrCheckboxQuestions = allQuestions.filter(
    (question) => question.type === 'RADIO' || question.type === 'CHECK_BOX',
  );

  const questionWithEmptyOptions = radioOrCheckboxQuestions.find((question) => {
    const options = question.options;

    if (!options || !Array.isArray(options) || options.length === 0) {
      return true;
    }

    const allOptionsEmpty = options.every(
      (opt) => !opt || (typeof opt === 'string' && opt.trim() === ''),
    );

    return allOptionsEmpty;
  });

  if (questionWithEmptyOptions) {
    toast.error(
      '라디오 또는 체크박스 질문에는 최소 1개 이상의 옵션이 필요합니다.',
    );
    return false;
  }

  return true;
}
