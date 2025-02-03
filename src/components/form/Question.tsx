import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';
import { Switch } from '../../components/ui/switch';

interface Props {
  index: number;
  questionData: {
    question: string;
    type: string;
    options: string[] | null;
    required: boolean;
    order: number;
    section?: string;
  };
  deleteQuestion: (sectionName: string | undefined, index: number) => void;
}

export default function Question({
  index,
  section,
  questionData,
  setFormField,
  deleteQuestion,
}: Props) {
  const options = ['객관식', '서술형', '단답형', '체크박스', '파일 업로드'];
  const [selectedOption, setSelectedOption] = useState<string>(
    questionData.type,
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

  const updateOption = (sectionName: string, index: number, value: string) => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === sectionName
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) =>
                qIndex === index ? { ...question, type: value } : question,
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
      <div className="flex w-full flex-row gap-6">
        <BaseInput
          placeholder="질문을 입력해주세요"
          value={questionData.question}
          onChange={(e) => updateInput(section.section, index, e.target.value)} // ✅ 이벤트 값 전달
        />
        <Dropdown
          contents={options}
          selected={selectedOption}
          setSelected={(value) => {
            setSelectedOption(value);
            updateOption(section.section, index, value);
          }}
        />
      </div>
      <div className="py-4">
        <Content
          option={selectedOption}
          isEditing={true}
          questionData={questionData}
        />
      </div>
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
          onClick={() => deleteQuestion(questionData.section, index)}
        />
      </div>
    </div>
  );
}
