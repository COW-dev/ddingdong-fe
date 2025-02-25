import React, { useCallback, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { QuestionType, FormState, FormField } from '@/types/form';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';
import { Switch } from '../ui/switch';

type Props = {
  index: number;
  focusSection: string;
  isClosed?: boolean;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  deleteQuestion: (sectionName: string | undefined, index: number) => void;
  fieldData: FormField;
};

export default function Field({
  index,
  focusSection,
  setFormState,
  isClosed,
  deleteQuestion,
  fieldData,
}: Props) {
  console.log(fieldData, 'formState.formFields');
  const types: QuestionType[] = [
    'CHECK_BOX',
    'RADIO',
    'TEXT',
    'LONG_TEXT',
    'FILE',
  ];

  const selectedTypeRef = useRef<QuestionType>(fieldData.type as QuestionType);
  const enabledRef = useRef<boolean>(fieldData.required);

  const updateField = useCallback(
    (field: keyof FormField, value: any) => {
      setFormState((prev) => ({
        ...prev,
        formFields: prev.formFields.map((fieldItem, fieldIndex) =>
          fieldIndex === index ? { ...fieldItem, [field]: value } : fieldItem,
        ),
      }));
    },
    [index, setFormState],
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
          defaultValue={fieldData.question}
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
          setFormState={setFormState}
          section={fieldData.section}
          isClosed={isClosed ?? false}
          fieldData={fieldData}
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
            onClick={() => deleteQuestion(focusSection, index)}
          />
        </div>
      )}
    </div>
  );
}
