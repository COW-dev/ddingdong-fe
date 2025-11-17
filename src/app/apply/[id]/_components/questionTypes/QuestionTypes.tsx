'use client';

import {
  Body2,
  Checkbox,
  FileUpload,
  Flex,
  IconButton,
  Radio,
  RadioItem,
  TextArea,
} from 'ddingdong-design-system';
import { useState } from 'react';
import { usePresignedUrlForm } from '../../_hooks/usePresignedUrlForm';

type CheckboxQuestionProps = {
  options: string[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
};

export function CheckboxQuestion({
  options,
  selectedValues,
  onValueChange,
}: CheckboxQuestionProps) {
  const handleToggle = (option: string) => {
    if (selectedValues.includes(option)) {
      onValueChange(selectedValues.filter((v) => v !== option));
    } else {
      onValueChange([...selectedValues, option]);
    }
  };

  return (
    <Flex dir="col" gap={2} className="w-full">
      {options.map((option, index) => (
        <Flex
          key={index}
          dir="row"
          alignItems="center"
          gap={2}
          className="w-full cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          onClick={() => handleToggle(option)}
        >
          <Checkbox
            checked={selectedValues.includes(option)}
            onCheckedChange={() => handleToggle(option)}
            className="flex size-5 items-center"
          />
          <Body2 weight="semibold" className="py-1 text-gray-500">
            {option}
          </Body2>
        </Flex>
      ))}
    </Flex>
  );
}

type FileQuestionProps = {
  onFileChange: (files: File[] | string[]) => void;
};

export function FileQuestion({ onFileChange }: FileQuestionProps) {
  const { getPresignedId, isLoading } = usePresignedUrlForm();
  const [fileName, setFileName] = useState<string>('');
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onFileChange([]);
      return;
    }

    try {
      const fileInfo = await getPresignedId(file);
      if (fileInfo) {
        setFileName(file.name);
        onFileChange([fileInfo.id]);
      }
    } catch (error) {
      onFileChange([]);
    }
  };

  return (
    <Flex dir="col" gap={2} className="w-full">
      <FileUpload mode="single" disabled={false} onChange={handleChange} />
      {fileName && (
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          gap={2}
          className="w-full pl-2"
        >
          <Body2 weight="semibold" className="py-1 text-gray-500">
            {fileName}
          </Body2>
          <IconButton
            iconName="close"
            size={16}
            color="gray"
            onClick={() => {
              setFileName('');
              onFileChange([]);
            }}
          />
        </Flex>
      )}
    </Flex>
  );
}

type LongTextQuestionProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LongTextQuestion({ value, onChange }: LongTextQuestionProps) {
  return (
    <TextArea
      showCounter
      rows={8}
      maxLength={1000}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="서술형 응답 (최대 1,000자 이내)"
    />
  );
}

type RadioQuestionProps = {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export function RadioQuestion({
  options,
  selectedValue,
  onValueChange,
}: RadioQuestionProps) {
  return (
    <Radio value={selectedValue} className="contents">
      {options.map((option, index) => (
        <Flex
          key={index}
          dir="row"
          alignItems="center"
          gap={2}
          className="w-full cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          onClick={() => onValueChange(option)}
        >
          <RadioItem value={option} />
          <Body2 weight="semibold" className="py-1 text-gray-500">
            {option}
          </Body2>
        </Flex>
      ))}
    </Radio>
  );
}

type TextQuestionProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextQuestion({
  value,
  onChange,
  placeholder = '단답형 응답 (최대 300자 이내)',
}: TextQuestionProps) {
  return (
    <TextArea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={false}
    />
  );
}
