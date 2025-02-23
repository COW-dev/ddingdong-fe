import React, { useCallback, useRef } from 'react';
import { departmentInfo } from '@/constants/department';
import BaseInput from './BaseInput';
import { StepDropdown } from './StepDropdown';

interface RequiredQuestions {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
}

interface CommonQuestionProps {
  disabled?: boolean;
  requiredQuestions?: RequiredQuestions;
  setRequiredQuestions?: React.Dispatch<
    React.SetStateAction<RequiredQuestions | Partial<RequiredQuestions>>
  >;
}

export default function CommonQuestion({
  disabled = false,
  requiredQuestions,
  setRequiredQuestions,
}: CommonQuestionProps) {
  const nameRef = useRef(requiredQuestions?.name || '');
  const studentNumberRef = useRef(requiredQuestions?.studentNumber || '');
  const phoneNumberRef = useRef(requiredQuestions?.phoneNumber || '');
  const emailRef = useRef(requiredQuestions?.email || '');

  const handleBlur = useCallback(
    (field: keyof RequiredQuestions, value: string) => {
      if (setRequiredQuestions) {
        setRequiredQuestions(
          (prev) =>
            ({
              ...prev,
              [field]: value ?? '',
            } as RequiredQuestions),
        );
      }
    },
    [setRequiredQuestions],
  );

  const handleDepartmentChange = useCallback(
    (selectedDept: string) => {
      if (setRequiredQuestions) {
        setRequiredQuestions((prev) => ({
          ...prev,
          department: selectedDept,
        }));
      }
    },
    [setRequiredQuestions],
  );

  return (
    <div className="mb-3 flex flex-col gap-5 rounded-lg border border-gray-200 px-6 py-7">
      <div className="flex flex-row flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="이름을 입력해주세요"
          label={'이름'}
          disabled={disabled}
          defaultValue={nameRef.current}
          onChange={(e) => (nameRef.current = e.target.value)}
          onBlur={() => handleBlur('name', nameRef.current)}
        />
        <BaseInput
          placeholder="학번을 입력해주세요"
          label={'학번'}
          disabled={disabled}
          defaultValue={studentNumberRef.current}
          onChange={(e) => (studentNumberRef.current = e.target.value)}
          onBlur={() => handleBlur('studentNumber', studentNumberRef.current)}
        />
        <StepDropdown
          contents={departmentInfo}
          label={'학과'}
          disabled={disabled}
          selectItem={handleDepartmentChange}
          selectedContent={requiredQuestions?.department || ''}
        />
      </div>

      <div className="flex flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="전화번호를 입력해주세요"
          label={`전화번호(' - '포함)`}
          disabled={disabled}
          defaultValue={phoneNumberRef.current}
          onChange={(e) => (phoneNumberRef.current = e.target.value)}
          onBlur={() => handleBlur('phoneNumber', phoneNumberRef.current)}
        />
        <BaseInput
          placeholder="이메일을 입력해주세요"
          label={'이메일'}
          disabled={disabled}
          defaultValue={emailRef.current}
          onChange={(e) => (emailRef.current = e.target.value)}
          onBlur={() => handleBlur('email', emailRef.current)}
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
