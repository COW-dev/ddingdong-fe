import { useState, useEffect } from 'react';

import Image from 'next/image';
import FileUpload from './FileUpload';
import TextArea from './TextArea';

import CloseIcon from '../../assets/cancel.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

interface Props {
  index: number;
  type: string;
  isEditing: boolean;
  questionData: {
    options: string[];
  };
  setFormField: (update: any) => void;
  section: { section: string; questions: any[] };
}

export default function Content({
  index,
  type,
  isEditing,
  questionData,
  setFormField,
  section,
}: Props) {
  const [localOptions, setLocalOptions] = useState<string[]>(
    questionData.options || [],
  );

  useEffect(() => {
    if (JSON.stringify(localOptions) !== JSON.stringify(questionData.options)) {
      setLocalOptions(questionData.options || []);
    }
  }, [questionData.options]);

  const updateOption = (newOptions: string[]) => {
    setFormField((prevState) =>
      prevState.map((sec) =>
        sec.section === section.section
          ? {
              ...sec,
              questions: sec.questions.map((question, qIndex) =>
                qIndex === index
                  ? { ...question, options: newOptions }
                  : question,
              ),
            }
          : sec,
      ),
    );

    setTimeout(() => {
      setLocalOptions(newOptions);
    }, 0);
  };

  const handleAddOption = () => {
    if (isEditing && localOptions.length < 5) {
      updateOption([...localOptions, `옵션 ${localOptions.length + 1}`]);
    }
  };

  const handleRemoveOption = (optIndex: number) => {
    if (isEditing && localOptions.length > 1) {
      updateOption(localOptions.filter((_, i) => i !== optIndex));
    }
  };

  const handleOptionChange = (optIndex: number, newValue: string) => {
    if (isEditing) {
      const newOptions = localOptions.map((opt, i) =>
        i === optIndex ? newValue : opt,
      );
      updateOption(newOptions);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-3">
      {(type === '객관식' || type === '체크박스') && (
        <div className="flex flex-col items-start gap-2 px-2 pb-3">
          {localOptions.map((opt, i) => (
            <div
              key={i}
              className="flex w-full flex-row items-center justify-between gap-2"
            >
              <div className="flex h-[34px] items-center">
                <Image
                  src={type === '객관식' ? EmptyCircle : EmptySquare}
                  alt={`${type} 선택`}
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="px-3 font-semibold text-gray-500 outline-none"
                  disabled={!isEditing}
                />
              </div>
              {isEditing && localOptions.length > 1 && (
                <button onClick={() => handleRemoveOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {isEditing && localOptions.length < 5 && (
            <button
              onClick={handleAddOption}
              className="mt-1 flex items-center gap-3 text-gray-300"
            >
              <Image
                src={type === '객관식' ? EmptyCircle : EmptySquare}
                alt={`${type} 선택`}
                width={20}
                height={20}
              />
              옵션 추가...
            </button>
          )}
        </div>
      )}

      {type === '서술형' && (
        <TextArea
          placeholder="서술형 응답 (최대 1,000자 이내)"
          disabled={isEditing}
        />
      )}
      {type === '단답형' && (
        <TextArea
          placeholder="단답형 응답 (최대 300자 이내)"
          disabled={isEditing}
        />
      )}
      {type === '파일 업로드' && (
        <FileUpload onFilesSelected={() => {}} disabled={isEditing} />
      )}
    </div>
  );
}
