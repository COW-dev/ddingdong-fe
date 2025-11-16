import {
  Body3,
  Checkbox,
  FileUpload,
  Flex,
  IconButton,
  Radio,
  RadioItem,
  TextArea,
} from 'ddingdong-design-system';

import { QuestionType } from '@/app/_api/types/apply';

import { useQuestionOptions } from '../../_hooks/useQuestionOptions';

type QuestionContentProps = {
  index: number;
  options: string[];
  section: { section: string; questions: unknown[] };
  onOptionsChange: (options: string[]) => void;
  readOnly?: boolean;
};

function RadioQuestionContent({
  options,
  onOptionsChange,
  readOnly = false,
}: QuestionContentProps) {
  const {
    localOptions,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    canAddOption,
    canRemoveOption,
  } = useQuestionOptions(options || [], onOptionsChange);

  return (
    <Flex dir="col" alignItems="start" gap={4} className="px-2 pb-3">
      <Radio value="option" className="contents">
        {localOptions.map((option, i) => (
          <Flex
            key={`option-${i}`}
            alignItems="center"
            justifyContent="between"
            gap={2}
            className="w-full"
          >
            <Flex
              alignItems="center"
              justifyContent="start"
              gap={2}
              className="w-full"
            >
              <RadioItem value={option} className="size-5" />

              <input
                value={option}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                className="w-[80%] border-none outline-none"
                disabled={readOnly}
                readOnly={readOnly}
              />
            </Flex>
            <Flex>
              {canRemoveOption && !readOnly && (
                <IconButton
                  iconName="close"
                  size={20}
                  onClick={() => handleRemoveOption(i)}
                />
              )}
            </Flex>
          </Flex>
        ))}
      </Radio>
      {canAddOption && !readOnly && (
        <button
          onClick={handleAddOption}
          className="mt-1 cursor-pointer text-gray-300"
        >
          <Body3>옵션 추가...</Body3>
        </button>
      )}
    </Flex>
  );
}

function CheckboxQuestionContent({
  options,
  onOptionsChange,
  readOnly = false,
}: QuestionContentProps) {
  const {
    localOptions,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    canAddOption,
    canRemoveOption,
  } = useQuestionOptions(options || [], onOptionsChange);

  return (
    <Flex dir="col" alignItems="start" gap={4} className="px-2 pb-3">
      {localOptions.map((option, i) => (
        <Flex key={i} alignItems="center" gap={2} className="w-full">
          <Flex
            alignItems="center"
            justifyContent="start"
            gap={2}
            className="w-full"
          >
            <Checkbox
              checked={!localOptions.includes(option)}
              className="size-5"
            />

            <input
              value={option}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="w-[80%] border-none outline-none"
              disabled={readOnly}
              readOnly={readOnly}
            />
          </Flex>
          <Flex>
            {canRemoveOption && !readOnly && (
              <IconButton
                iconName="close"
                size={20}
                onClick={() => handleRemoveOption(i)}
              />
            )}
          </Flex>
        </Flex>
      ))}
      {canAddOption && !readOnly && (
        <button
          onClick={handleAddOption}
          className="mt-1 cursor-pointer text-gray-300"
        >
          <Body3>옵션 추가...</Body3>
        </button>
      )}
    </Flex>
  );
}

function TextQuestionContent() {
  return (
    <TextArea value="" placeholder="단답형 응답 (최대 300자 이내)" disabled />
  );
}

function LongTextQuestionContent() {
  return (
    <TextArea value="" placeholder="서술형 응답 (최대 1,000자 이내)" disabled />
  );
}

function FileQuestionContent() {
  return <FileUpload mode="single" disabled />;
}

export const questionTypeMap: Record<
  QuestionType,
  React.ComponentType<QuestionContentProps>
> = {
  RADIO: RadioQuestionContent,
  CHECK_BOX: CheckboxQuestionContent,
  TEXT: TextQuestionContent,
  LONG_TEXT: LongTextQuestionContent,
  FILE: FileQuestionContent,
};
