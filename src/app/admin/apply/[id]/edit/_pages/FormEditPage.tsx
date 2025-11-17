'use client';

import { Button, Flex, Title1 } from 'ddingdong-design-system';

import { FormHeaderSection } from '@/app/admin/apply/new/_components/FormHeaderSection';
import { SectionContent } from '@/app/admin/apply/new/_components/sections/SectionContent';
import { FormFieldContext } from '@/app/admin/apply/new/_contexts/FormFieldContext';

import { useFormEdit } from '../_hooks/useFormEdit';

type FormEditPageProps = {
  formId: number;
};

export function FormEditPage({ formId }: FormEditPageProps) {
  const {
    isEditing,
    setIsEditing,
    basicInfo,
    handleBasicInfoChange,
    handleSave,
    handleCancel,
    isPending,
    contextValue,
    isRecruitPeriodEnded,
  } = useFormEdit(formId);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Flex
        dir="row"
        alignItems="center"
        justifyContent="between"
        className="pt-7 md:pt-10"
      >
        <Title1 weight="bold">지원서 수정</Title1>
        {!isRecruitPeriodEnded &&
          (isEditing ? (
            <Flex gap={2}>
              <Button
                variant="tertiary"
                onClick={handleCancel}
                disabled={isPending}
              >
                취소
              </Button>
              <Button
                variant="secondary"
                color="blue"
                onClick={handleSave}
                disabled={isPending}
              >
                저장하기
              </Button>
            </Flex>
          ) : (
            <Button
              variant="secondary"
              color="blue"
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </Button>
          ))}
      </Flex>
      <FormHeaderSection
        basicInfo={basicInfo}
        onBasicInfoChange={handleBasicInfoChange}
        readOnly={true}
        allowDateEdit={isEditing}
      />
      <SectionContent readOnly={true} />
    </FormFieldContext.Provider>
  );
}
