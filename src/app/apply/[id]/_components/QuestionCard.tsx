'use client';

import { useState } from 'react';

import { Body2, Flex } from 'ddingdong-design-system';

import { FormField, QuestionType } from '@/app/_api/types/apply';

import {
  CheckboxQuestion,
  FileQuestion,
  LongTextQuestion,
  RadioQuestion,
  TextQuestion,
} from './questionTypes/QuestionTypes';

type QuestionCardProps = FormField & {
  onChange: (value: string | string[]) => void;
};

export function QuestionCard({
  type,
  question,
  options,
  required,
  onChange,
}: QuestionCardProps) {
  const [value, setValue] = useState<string | string[]>('');

  const handleChange = (newValue: string | string[]) => {
    setValue(newValue);
    onChange(newValue);
  };
  const questionRenderers: Record<
    QuestionType,
    () => React.ReactElement | null
  > = {
    RADIO: () => (
      <RadioQuestion
        options={options}
        selectedValue={Array.isArray(value) ? value[0] || '' : value}
        onValueChange={(val) => handleChange(val)}
      />
    ),
    CHECK_BOX: () => (
      <CheckboxQuestion
        options={options}
        selectedValues={Array.isArray(value) ? value : []}
        onValueChange={(vals) => handleChange(vals)}
      />
    ),
    TEXT: () => (
      <TextQuestion
        value={typeof value === 'string' ? value : ''}
        onChange={(val) => handleChange(val)}
      />
    ),
    LONG_TEXT: () => (
      <LongTextQuestion
        value={typeof value === 'string' ? value : ''}
        onChange={(val) => handleChange(val)}
      />
    ),
    FILE: () => (
      <FileQuestion
        onFileChange={(fileIds) => handleChange(fileIds as string[])}
      />
    ),
  };

  const renderQuestionContent = () => {
    const renderer = questionRenderers[type];
    return renderer ? renderer() : null;
  };

  return (
    <Flex
      dir="col"
      gap={3}
      className="my-3 rounded-lg border border-gray-200 px-6 py-6"
    >
      <Flex dir="row" gap={1} alignItems="center">
        <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
          {question}
        </Body2>
        {required && (
          <span className="text-lg font-bold text-red-500 md:text-xl">*</span>
        )}
      </Flex>
      {renderQuestionContent()}
    </Flex>
  );
}
