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

  // 모집 기간 종료 여부 확인 (endDate의 하루 끝까지 허용)
  const isRecruitPeriodEnded = useMemo(() => {
    if (!formData.endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(formData.endDate);
    endDate.setHours(23, 59, 59, 999);
    return today > endDate;
  }, [formData.endDate]);

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

  // formField를 sectionFormField로 직접 오버라이드 (formData 변경 시 자동 반영)
  const contextValue = useMemo(
    () => ({
      ...formFieldState,
      formField: sectionFormField,
    }),
    [formFieldState, sectionFormField],
  );

  const handleBasicInfoChange = (updates: Partial<FormBasicInfo>) => {
    if (isEditing) {
      const allowedUpdates: Partial<FormBasicInfo> = {};
      if (updates.recruitPeriod) {
        allowedUpdates.recruitPeriod = updates.recruitPeriod;
      }
      setBasicInfo((prev) => ({ ...prev, ...allowedUpdates }));
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
          title: formData.title,
          description: formData.description,
          startDate: basicInfo.recruitPeriod.startDate
            .toISOString()
            .split('T')[0],
          endDate: basicInfo.recruitPeriod.endDate.toISOString().split('T')[0],
          hasInterview: formData.hasInterview,
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
    isRecruitPeriodEnded,
  };
}
