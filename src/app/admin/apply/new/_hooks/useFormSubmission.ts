import { useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useCreateForm } from '@/app/_api/mutations/apply';
import { SectionFormField } from '@/app/_api/types/apply';

import { formatFormData } from '../_utils/format';
import { validateBasicInfo, validateQuestions } from '../_utils/validation';

import { FormBasicInfo } from './useFormBasicInfo';

type UseFormSubmissionProps = {
  basicInfo: FormBasicInfo;
  sections: string[];
  formField: SectionFormField[];
};

export function useFormSubmission({
  basicInfo,
  sections,
  formField,
}: UseFormSubmissionProps) {
  const router = useRouter();
  const { mutate: createForm } = useCreateForm();

  const handleSubmit = () => {
    if (!validateBasicInfo(basicInfo)) {
      return;
    }

    if (!validateQuestions(formField)) {
      return;
    }

    const formattedPostData = formatFormData(basicInfo, sections, formField);
    createForm(formattedPostData, {
      onSuccess: () => {
        router.push('/apply');
      },
      onError: (error) => {
        toast.error(
          error instanceof ApiError ? error.message : '폼 생성에 실패했습니다.',
        );
      },
    });
  };

  return { handleSubmit };
}
