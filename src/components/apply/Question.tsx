import { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';
import hamburger from '../../assets/hamburger.svg';
import { Switch } from '../../components/ui/switch';
import { QuestionType } from '@/types/form';

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
  deleteQuestion: (sectionName: string | undefined, index: number) => void;
}

interface FormField {
  section: string;
  questions: QuestionData[];
}

interface Props {
  index: number;
  questionData: QuestionData;
  section: Section;
  setFormField: React.Dispatch<React.SetStateAction<FormField[]>>;
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

  const [selectedType, setSelectedType] = useState<QuestionType>(
    questionData.type as QuestionType,
  );

  const [enabled, setEnabled] = useState<boolean>(questionData.required);

  const updateInput = (sectionName: string, index: number, value: string) => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === sectionName
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) =>
                qIndex === index ? { ...question, question: value } : question,
              ),
            }
          : section,
      ),
    );
  };

  const updateSelector = (
    sectionName: string,
    index: number,
    value: string,
  ) => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === sectionName
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) =>
                qIndex === index
                  ? {
                      ...question,
                      type: value,
                      options: ['RADIO', 'CHECK_BOX'].includes(value)
                        ? ['옵션1']
                        : [],
                    }
                  : question,
              ),
            }
          : section,
      ),
    );
  };

  const updateSwitch = (sectionName: string, index: number, value: boolean) => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === sectionName
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) =>
                qIndex === index ? { ...question, required: value } : question,
              ),
            }
          : section,
      ),
    );
  };

  return (
    <div className="mb-3 flex flex-col rounded-xl border border-gray-200 p-4 ">
      <div className="flex w-full justify-center pb-4">
        {!isClosed && (
          <Image src={hamburger} alt="hamburger" className="cursor-pointer" />
        )}
      </div>
      <div className="flex w-full flex-row flex-wrap gap-2 md:flex-nowrap">
        <BaseInput
          placeholder="질문을 입력해주세요"
          disabled={isClosed}
          value={questionData.question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateInput(section.section, index, e.target.value)
          }
        />

        <Dropdown
          contents={types}
          selected={selectedType}
          setSelected={(value: QuestionType) => {
            setSelectedType(value);
            updateSelector(section.section, index, value);
          }}
          disabled={isClosed}
        />
      </div>
      <div className="py-4">
        <Content
          index={index}
          type={selectedType}
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
            <span className="text-sm font-medium text-gray-500">{'필수'}</span>

            <Switch
              checked={enabled}
              onCheckedChange={(value) => {
                setEnabled(value);
                updateSwitch(section.section, index, value);
              }}
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
