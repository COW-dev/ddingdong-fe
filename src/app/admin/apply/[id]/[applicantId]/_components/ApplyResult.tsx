'use client';

import { Body1, Body2, Checkbox, Flex } from 'ddingdong-design-system';

import { Answer } from '@/app/_api/types/apply';
import { downloadFile } from '@/app/documents/_utils/downloadFile';

import { ApplyContentContainer } from './ApplicantInfo';

export function ApplyResult({
  question,
  type,
  order,
  options,
  required,
  section,
  value,
  files,
}: Answer) {
  const renderContent = () => {
    if (type === 'CHECK_BOX' && options) {
      return (
        <Flex dir="col" gap={4}>
          {options.map((option) => (
            <Flex key={option} dir="row" alignItems="center" gap={2}>
              <Checkbox
                checked={value.includes(option)}
                disabled
                className="flex-shrink-0"
              />
              <Body2 weight="medium" className="text-gray-700 md:text-lg">
                {option}
              </Body2>
            </Flex>
          ))}
        </Flex>
      );
    }

    if (type === 'RADIO' && options) {
      return (
        <Flex dir="col" gap={4}>
          {options.map((option) => {
            const isSelected = value.includes(option);
            return (
              <Flex key={option} dir="row" alignItems="center" gap={2}>
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  )}
                </div>
                <Body2 weight="medium" className="text-gray-700 md:text-lg">
                  {option}
                </Body2>
              </Flex>
            );
          })}
        </Flex>
      );
    }

    if (type === 'TEXT' || type === 'LONG_TEXT') {
      return (
        <Body2 weight="medium" className="w-full resize-none bg-inherit">
          {value.join('')}
        </Body2>
      );
    }

    if (type === 'FILE') {
      return (
        <Flex dir="col" gap={4}>
          {files.map((file) => (
            <Flex key={file.name} dir="row" alignItems="center" gap={2}>
              <Body2
                weight="medium"
                className="text-gray-700 md:text-lg"
                onClick={() => downloadFile(file.cdnUrl, file.name)}
              >
                {file.name}
              </Body2>
            </Flex>
          ))}
        </Flex>
      );
    }
  };

  return (
    <ApplyContentContainer>
      <Flex dir="col" gap={4}>
        <Body1 weight="bold" className="text-blue-500">
          {section}
          {order}. {question}
          {required && (
            <Body1 as="span" className="text-red-600">
              *
            </Body1>
          )}
        </Body1>
        {renderContent()}
      </Flex>
    </ApplyContentContainer>
  );
}
