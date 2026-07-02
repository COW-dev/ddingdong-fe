import { useMemo, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import { useUpdateForm } from '@/_api/mutations/apply';
import { applyQueryOptions } from '@/_api/queries/apply';
import { formatDate, parseLocalDate } from '@/admin/apply/_utils/dateFormat';
import { useFormFieldReducer } from '@/admin/apply/new/_hooks/reducer/useFormFieldReducer';
import { FormBasicInfo } from '@/admin/apply/new/_hooks/useFormBasicInfo';
import { formatFormData } from '@/admin/apply/new/_utils/format';
import {
  validateBasicInfo,
  validateQuestions,
} from '@/admin/apply/new/_utils/validation';

import {
  transformFormDataToBasicInfo,
  transformFormDataToSectionFormField,
} from '../_utils/transformFormData';

export function useFormEdit(formId: number) {
  const { data: formData } = useSuspenseQuery(applyQueryOptions.form(formId));
  const { mutate: updateForm, isPending } = useUpdateForm();

  const { canEditForm, canEditContent } = useMemo(() => {
    if (!formData.startDate || !formData.endDate) {
      return {
        canEditForm: false,
        canEditContent: false,
      };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = parseLocalDate(formData.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = parseLocalDate(formData.endDate);
    endDate.setHours(0, 0, 0, 0);

    const isBeforeRecruiting = today.getTime() < startDate.getTime();
    const isRecruiting =
      startDate.getTime() <= today.getTime() &&
      today.getTime() <= endDate.getTime();

    return {
      canEditForm: isBeforeRecruiting || isRecruiting,
      canEditContent: isBeforeRecruiting,
    };
  }, [formData.startDate, formData.endDate]);

  const [isEditing, setIsEditing] = useState(false);
  const [basicInfo, setBasicInfo] = useState<FormBasicInfo>(() =>
    transformFormDataToBasicInfo(formData),
  );

  const sectionFormField = useMemo(
    () => transformFormDataToSectionFormField(formData),
    [formData],
  );

  const formFieldState = useFormFieldReducer({
    focusSection: formData.sections?.[0],
    sections: formData.sections || [],
    formField: sectionFormField,
  });

  const contextValue = useMemo(
    () => ({
      ...formFieldState,
    }),
    [formFieldState],
  );

  const handleBasicInfoChange = (updates: Partial<FormBasicInfo>) => {
    if (isEditing) {
      setBasicInfo((prev) => ({
        title:
          canEditContent && updates.title !== undefined
            ? updates.title
            : prev.title,
        description:
          canEditContent && updates.description !== undefined
            ? updates.description
            : prev.description,
        hasInterview:
          canEditContent && updates.hasInterview !== undefined
            ? updates.hasInterview
            : prev.hasInterview,
        recruitPeriod: updates.recruitPeriod ?? prev.recruitPeriod,
      }));
    }
  };

  const handleSave = () => {
    if (!formData.startDate || !formData.endDate) {
      toast.error('지원서를 수정할 수 있는 기간이 아닙니다.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = parseLocalDate(formData.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = parseLocalDate(formData.endDate);
    endDate.setHours(0, 0, 0, 0);

    const currentIsBeforeRecruiting = today.getTime() < startDate.getTime();
    const currentIsRecruiting =
      startDate.getTime() <= today.getTime() &&
      today.getTime() <= endDate.getTime();

    if (!currentIsBeforeRecruiting && !currentIsRecruiting) {
      toast.error('지원서를 수정할 수 있는 기간이 아닙니다.');
      return;
    }

    if (currentIsBeforeRecruiting && !validateBasicInfo(basicInfo)) {
      return;
    }

    if (
      !currentIsBeforeRecruiting &&
      (!basicInfo.recruitPeriod.startDate || !basicInfo.recruitPeriod.endDate)
    ) {
      toast.error('모집 기간을 입력해주세요.');
      return;
    }

    if (
      currentIsBeforeRecruiting &&
      !validateQuestions(formFieldState.formField)
    ) {
      return;
    }

    const updatedFormData = currentIsBeforeRecruiting
      ? formatFormData(
          basicInfo,
          formFieldState.sections,
          formFieldState.formField,
        )
      : {
          title: formData.title,
          description: formData.description ?? null,
          startDate: formatDate(basicInfo.recruitPeriod.startDate),
          endDate: formatDate(basicInfo.recruitPeriod.endDate),
          hasInterview: formData.hasInterview,
          sections: formData.sections || [],
          formFields: formData.formFields || [],
        };

    updateForm(
      {
        formId,
        formData: updatedFormData,
      },
      {
        onSuccess: async () => {
          toast.success('지원서가 수정되었습니다.');
          setIsEditing(false);
        },
        onError: (error) => {
          toast.error(
            error instanceof ApiError
              ? error.message
              : '지원서 수정에 실패했습니다.',
          );
        },
      },
    );
  };

  const handleCancel = () => {
    setBasicInfo(transformFormDataToBasicInfo(formData));
    setIsEditing(false);
  };

  return {
    formData,
    isEditing,
    setIsEditing,
    basicInfo,
    handleBasicInfoChange,
    handleSave,
    handleCancel,
    isPending,
    contextValue,
    canEditForm,
    canEditContent,
  };
}
