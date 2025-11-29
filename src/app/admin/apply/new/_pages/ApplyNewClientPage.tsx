'use client';

import { Button, Flex, Title1 } from 'ddingdong-design-system';

import { FormHeaderSection } from '../_components/FormHeaderSection';
import { SectionContent } from '../_components/sections/SectionContent';
import { FormFieldContext } from '../_contexts/FormFieldContext';
import { useFormFieldReducer } from '../_hooks/reducer/useFormFieldReducer';
import { useFormBasicInfo } from '../_hooks/useFormBasicInfo';
import { useFormSubmission } from '../_hooks/useFormSubmission';

export const ApplyNewClientPage = () => {
  const { basicInfo, updateBasicInfo } = useFormBasicInfo();
  const formFieldState = useFormFieldReducer();

  const { handleSubmit } = useFormSubmission({
    basicInfo,
    sections: formFieldState.sections,
    formField: formFieldState.formField,
  });

  return (
    <FormFieldContext.Provider value={formFieldState}>
      <Flex
        dir="row"
        alignItems="center"
        justifyContent="between"
        className="pt-7 md:pt-10"
      >
        <Title1 weight="bold">지원서 생성</Title1>
        <Button variant="secondary" color="blue" onClick={handleSubmit}>
          저장하기
        </Button>
      </Flex>
      <FormHeaderSection
        basicInfo={basicInfo}
        onBasicInfoChange={updateBasicInfo}
        allowDateEdit={true}
      />
      <SectionContent />
    </FormFieldContext.Provider>
  );
};
