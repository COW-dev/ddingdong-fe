import React, { useCallback, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { QuestionType, SectionFormField } from '@/types/form';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';
import { Switch } from '../../components/ui/switch';

interface Section {
  section: string;
  questions: any[];
}

interface QuestionData {
  question: string;
  type: string;
  options: string[];
  required: boolean;
  order: number;
}

interface Props {
  index: number;
  questionData: QuestionData;
  section: Section;
  setFormField: React.Dispatch<React.SetStateAction<SectionFormField[]>>;
  isClosed?: boolean;
  deleteQuestion: (sectionName: string | undefined, index: number) => void;
}

export default function Question({
  index,
  section,
  questionData,
  setFormField,
  isClosed,
  deleteQuestion,
}: Props) {
  const types: QuestionType[] = [
    'CHECK_BOX',
    'RADIO',
    'TEXT',
    'LONG_TEXT',
    'FILE',
  ];

  const selectedTypeRef = useRef<QuestionType>(
    questionData.type as QuestionType,
  );
  const enabledRef = useRef<boolean>(questionData.required);

  const updateField = useCallback(
    (field: keyof QuestionData, value: any) => {
      setFormField((prev) =>
        prev.map((sec) =>
          sec.section === section.section
            ? {
                ...sec,
                questions: sec.questions.map((q, qIndex) =>
                  qIndex === index ? { ...q, [field]: value } : q,
                ),
              }
            : sec,
        ),
      );
    },
    [index, section.section, setFormField],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField('question', e.target.value);
    },
    [updateField],
  );

  const handleTypeChange = useCallback(
    (value: QuestionType) => {
      selectedTypeRef.current = value;
      updateField('type', value);
      updateField(
        'options',
        ['RADIO', 'CHECK_BOX'].includes(value) ? ['옵션1'] : [],
      );
    },
    [updateField],
  );

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      enabledRef.current = value;
      updateField('required', value);
    },
    [updateField],
  );

  return (
    <div className="mb-3 flex flex-col rounded-xl border border-gray-200 p-8 px-6">
      <div className="flex w-full flex-row flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="질문을 입력해주세요"
          disabled={isClosed}
          defaultValue={questionData.question}
          onChange={handleInputChange}
        />

        <Dropdown
          contents={types}
          selected={selectedTypeRef.current}
          setSelected={handleTypeChange}
          disabled={isClosed}
        />
      </div>

      <div className="py-4">
        <Content
          index={index}
          type={selectedTypeRef.current}
          isEditing={true}
          questionData={questionData}
          setFormField={setFormField}
          section={section}
          isClosed={isClosed ?? false}
        />
      </div>

      {!isClosed && (
        <div className="flex w-full items-center justify-end gap-3">
          <div className="flex items-center gap-2 text-center align-middle">
            <span className="text-sm font-medium text-gray-500">필수</span>
            <Switch
              checked={enabledRef.current}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          <Trash2
            className="cursor-pointer text-sm text-gray-500"
            onClick={() => deleteQuestion(section.section, index)}
          />
        </div>
      )}
    </div>
  );
}
