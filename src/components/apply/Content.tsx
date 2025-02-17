import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import CloseIcon from '../../assets/cancel.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

interface QuestionData {
  question: string;
  type: 'CHECK_BOX' | 'RADIO' | 'TEXT' | 'LONG_TEXT' | 'FILE';
  options: string[];
  required: boolean;
  order: number;
}

interface FormField {
  section: string;
  questions: QuestionData[];
}

interface Props {
  index: number;
  type: string;
  isEditing: boolean;
  questionData: {
    options: string[];
  };
  setFormField: (update: any) => void;
  section: { section: string; questions: any[] };
  isClosed: boolean;
}

export default function Content({
  index,
  type,
  isEditing,
  questionData,
  setFormField,
  isClosed,
  section,
}: Props) {
  const localOptions = useMemo(
    () => questionData.options || [],
    [questionData.options],
  );

  const updateOption = useCallback(
    (newOptions: string[]) => {
      setFormField((prevState: FormField[]) =>
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
    },
    [setFormField, section.section, index],
  );

  const handleAddOption = useCallback(() => {
    if (isEditing && localOptions.length < 5) {
      updateOption([...localOptions, `옵션 ${localOptions.length + 1}`]);
    }
  }, [isEditing, localOptions, updateOption]);

  const handleRemoveOption = useCallback(
    (optIndex: number) => {
      if (isEditing && localOptions.length > 1) {
        updateOption(localOptions.filter((_, i) => i !== optIndex));
      }
    },
    [isEditing, localOptions, updateOption],
  );

  const handleOptionChange = useCallback(
    (optIndex: number, newValue: string) => {
      if (isEditing) {
        const newOptions = localOptions.map((opt, i) =>
          i === optIndex ? newValue : opt,
        );
        updateOption(newOptions);
      }
    },
    [isEditing, localOptions, updateOption],
  );

  return (
    <div className="border-b border-gray-200 pb-3">
      {(type === 'RADIO' || type === 'CHECK_BOX') && (
        <div className="flex flex-col items-start gap-2 px-2 pb-3">
          {localOptions.map((opt, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between gap-2"
            >
              <div className="flex h-[34px] items-center">
                <Image
                  src={type === 'RADIO' ? EmptyCircle : EmptySquare}
                  alt={`${type} 선택`}
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="bg-white px-3 font-semibold text-gray-500 outline-none"
                  disabled={!isEditing || isClosed}
                />
              </div>
              {isEditing && !isClosed && localOptions.length > 1 && (
                <button onClick={() => handleRemoveOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {isEditing && !isClosed && localOptions.length < 5 && (
            <button
              onClick={handleAddOption}
              className="mt-1 flex items-center gap-3 text-gray-300"
            >
              <Image
                src={type === 'RADIO' ? EmptyCircle : EmptySquare}
                alt={`${type} 선택`}
                width={20}
                height={20}
              />
              옵션 추가...
            </button>
          )}
        </div>
      )}

      {type === 'LONG_TEXT' && (
        <TextArea
          placeholder="서술형 응답 (최대 1,000자 이내)"
          disabled={isEditing}
        />
      )}
      {type === 'TEXT' && (
        <TextArea
          placeholder="단답형 응답 (최대 300자 이내)"
          disabled={isEditing}
        />
      )}
      {type === 'FILE' && (
        <FileUpload
          onFilesSelected={(files) => console.log(files)}
          disabled={isEditing}
        />
      )}
    </div>
  );
}
