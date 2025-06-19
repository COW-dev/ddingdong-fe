import React, { useCallback, useRef } from 'react';
import { departmentInfo } from '@/constants/department';
import BaseInput from './BaseInput';
import { StepDropdown } from './StepDropdown';

interface CommonQuestionProps {
  disabled?: boolean;
  formId: string;
}

export default function CommonQuestion({
  disabled = false,
  formId,
}: CommonQuestionProps) {
  const nameRef = useRef('');
  const studentNumberRef = useRef('');
  const phoneNumberRef = useRef('');
  const emailRef = useRef('');
  const departmentRef = useRef('');

  const handleDepartmentChange = useCallback((selectedDept: string) => {
    departmentRef.current = selectedDept;
  }, []);

  return (
    <div className="mb-3 flex flex-col gap-5 rounded-lg border border-gray-200 px-6 py-7">
      <div className="flex flex-row flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="이름을 입력해 주세요."
          label={'이름'}
          disabled={disabled}
          defaultValue={nameRef.current}
          onChange={(e) => (nameRef.current = e.target.value)}
        />
        <BaseInput
          placeholder="학번을 입력해 주세요."
          label={'학번'}
          disabled={disabled}
          defaultValue={studentNumberRef.current}
          onChange={(e) => (studentNumberRef.current = e.target.value)}
        />
        <StepDropdown
          contents={departmentInfo}
          label={'학과'}
          disabled={disabled}
          selectItem={handleDepartmentChange}
          selectedContent={departmentRef.current}
        />
      </div>

      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="전화번호를 입력해 주세요."
          label={`전화번호(' - '포함)`}
          disabled={disabled}
          defaultValue={phoneNumberRef.current}
          onChange={(e) => (phoneNumberRef.current = e.target.value)}
        />
        <BaseInput
          placeholder="이메일을 입력해 주세요."
          label={'이메일'}
          disabled={disabled}
          defaultValue={emailRef.current}
          onChange={(e) => (emailRef.current = e.target.value)}
        />
      </div>

      <div className="w-full border-t border-gray-200 pt-6 text-right font-semibold text-gray-500">
        {disabled
          ? '* 해당 질문은 기본제공 질문입니다'
          : '*인적 사항은 필수 질문입니다'}
      </div>
    </div>
  );
}
