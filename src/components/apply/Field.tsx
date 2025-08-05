import React, { useCallback, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { useFormStore } from '@/store/form';
import { QuestionType, FormField } from '@/types/form';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';
import { Switch } from '../ui/switch';

type Props = {
  index: number;
  focusSection: string;
  isClosed?: boolean;
  fieldData: FormField;
  formId: string;
};

export default function Field({
  index,
  focusSection,
  isClosed,
  fieldData,
  formId,
}: Props) {
  const { updateField, deleteField } = useFormStore();

  const types: QuestionType[] = [
    'CHECK_BOX',
    'RADIO',
    'TEXT',
    'LONG_TEXT',
    'FILE',
  ];

  const selectedTypeRef = useRef<QuestionType>(fieldData.type as QuestionType);
  const enabledRef = useRef<boolean>(fieldData.required);

  const handleFieldUpdate = useCallback(
    (field: keyof FormField, value: any) => {
      updateField(formId, index, { [field]: value });
    },
    [formId, index, updateField],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleFieldUpdate('question', e.target.value);
    },
    [handleFieldUpdate],
  );

  const handleTypeChange = useCallback(
    (value: QuestionType) => {
      selectedTypeRef.current = value;
      handleFieldUpdate('type', value);
      handleFieldUpdate(
        'options',
        ['RADIO', 'CHECK_BOX'].includes(value) ? ['옵션1'] : [],
      );
    },
    [handleFieldUpdate],
  );

  const handleSwitchChange = useCallback(
    (value: boolean) => {
      enabledRef.current = value;
      handleFieldUpdate('required', value);
    },
    [handleFieldUpdate],
  );

  const handleDeleteQuestion = useCallback(() => {
    deleteField(formId, focusSection, index);
  }, [formId, focusSection, index, deleteField]);

  return (
    <div className="mb-3 flex flex-col rounded-xl border border-gray-200 p-8 px-6">
      <div className="flex w-full flex-row flex-wrap gap-3 md:flex-nowrap">
        <BaseInput
          placeholder="질문을 입력해 주세요."
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
          isClosed={isClosed ?? false}
          fieldData={fieldData}
          formId={formId}
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
            onClick={handleDeleteQuestion}
          />
        </div>
      )}
    </div>
  );
}
