import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FormField, FormState } from '@/types/form';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import CloseIcon from '../../assets/cancel.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

type Props = {
  index: number;
  type: string;
  fieldData: FormField;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  isClosed: boolean;
};

export default function Content({
  index,
  type,
  fieldData,
  setFormState,
  isClosed,
}: Props) {
  const localOptions = useMemo(
    () => fieldData.options || ['옵션1'],
    [fieldData.options],
  );

  const updateOption = useCallback(
    (newOptions: string[]) => {
      setFormState((prevState: FormState) => ({
        ...prevState,
        formFields: prevState.formFields.map((fieldItem, fieldIndex) =>
          fieldIndex === index
            ? { ...fieldItem, options: newOptions }
            : fieldItem,
        ),
      }));
    },
    [index, setFormState],
  );

  const handleAddOption = useCallback(() => {
    if (!isClosed && localOptions.length < 20) {
      updateOption([...localOptions, `옵션 ${localOptions.length + 1}`]);
    }
  }, [isClosed, localOptions, updateOption]);

  const handleRemoveOption = useCallback(
    (optIndex: number) => {
      if (!isClosed && localOptions.length > 1) {
        updateOption(localOptions.filter((_, i) => i !== optIndex));
      }
    },
    [isClosed, localOptions, updateOption],
  );

  const handleOptionChange = useCallback(
    (optIndex: number, newValue: string) => {
      if (!isClosed) {
        const newOptions = localOptions.map((opt, i) =>
          i === optIndex ? newValue : opt,
        );
        updateOption(newOptions);
      }
    },
    [isClosed, localOptions, updateOption],
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
              <div className="flex h-[34px] w-full items-center">
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
                  className="w-full bg-white px-3 font-semibold text-gray-500 outline-none"
                  disabled={isClosed}
                />
              </div>
              {!isClosed && localOptions.length > 1 && (
                <button onClick={() => handleRemoveOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {!isClosed && localOptions.length < 20 && (
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
          disabled={true}
        />
      )}
      {type === 'TEXT' && (
        <TextArea placeholder="단답형 응답 (최대 300자 이내)" disabled={true} />
      )}
      {type === 'FILE' && (
        <FileUpload
          onFilesSelected={(files) => console.log(files)}
          disabled={true}
        />
      )}
    </div>
  );
}
