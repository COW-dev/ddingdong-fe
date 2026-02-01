import { useMemo, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useUpdateForm } from '@/app/_api/mutations/apply';
import { applyQueryOptions } from '@/app/_api/queries/apply';
import { useFormFieldReducer } from '@/app/admin/apply/new/_hooks/reducer/useFormFieldReducer';
import { FormBasicInfo } from '@/app/admin/apply/new/_hooks/useFormBasicInfo';

import {
  transformFormDataToBasicInfo,
  transformFormDataToSectionFormField,
} from '../_utils/transformFormData';

export function useFormEdit(formId: number) {
  const { data: formData } = useSuspenseQuery(applyQueryOptions.form(formId));
  const { mutate: updateForm, isPending } = useUpdateForm();

  // 모집이 시작되기 전인지 확인
  const isRecruitStartedBefore = useMemo(() => {
    if (!formData.startDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(formData.startDate);
    startDate.setHours(0, 0, 0, 0);

    return startDate.getTime() > today.getTime();
  }, [formData.startDate]);

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
      formField: sectionFormField,
    }),
    [formFieldState, sectionFormField],
  );

  const handleBasicInfoChange = (updates: Partial<FormBasicInfo>) => {
    if (isEditing) {
      setBasicInfo((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleSave = () => {
    if (
      !basicInfo.recruitPeriod.startDate ||
      !basicInfo.recruitPeriod.endDate
    ) {
      toast.error('모집 기간을 입력해주세요.');
      return;
    }

    updateForm(
      {
        formId,
        formData: {
          title: basicInfo.title,
          description: basicInfo.description,
          startDate: basicInfo.recruitPeriod.startDate
            .toISOString()
            .split('T')[0],
          endDate: basicInfo.recruitPeriod.endDate.toISOString().split('T')[0],
          hasInterview: basicInfo.hasInterview,
          sections: formData.sections || [],
          formFields: formData.formFields || [],
        },
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
    isRecruitStartedBefore,
  };
}
