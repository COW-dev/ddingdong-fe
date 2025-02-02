import { useState } from 'react';
import Image from 'next/image';
import FileUpload from './FileUpload';
import TextArea from './TextArea';

import CloseIcon from '../../assets/cancel.svg';
import Check from '../../assets/check.svg';
import CheckBox from '../../assets/checkbox.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

type Props = {
  option: '객관식' | '서술형' | '단답형' | '체크박스' | '파일 업로드';
  isReadOnly: boolean;
};

export default function Content({ option, isReadOnly }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
  const [checkedBoxes, setCheckedBoxes] = useState<boolean[]>([false]);
  const [options, setOptions] = useState<string[]>(['옵션 1']);

  const handleRadioSelect = (index: number) => {
    if (!isReadOnly) {
      setSelectedRadio(index);
    }
  };

  const handleCheckboxToggle = (index: number) => {
    if (!isReadOnly) {
      setCheckedBoxes((prev) =>
        prev.map((checked, i) => (i === index ? !checked : checked)),
      );
    }
  };

  const handleAddOption = () => {
    if (isReadOnly && options.length < 5) {
      const newOption = `옵션 ${options.length + 1}`;
      setOptions([...options, newOption]);
      setCheckedBoxes([...checkedBoxes, false]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (isReadOnly && options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
      setCheckedBoxes(checkedBoxes.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, newValue: string) => {
    if (isReadOnly) {
      setOptions((prev) =>
        prev.map((opt, i) => (i === index ? newValue : opt)),
      );
    }
  };

  return (
    <>
      {(option === '객관식' || option === '체크박스') && (
        <div className="flex flex-col items-start gap-2 px-2">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex w-full flex-row items-center justify-between gap-2"
            >
              <div
                className={`flex h-[34px] flex-shrink-0 items-center ${
                  isReadOnly
                    ? 'pointer-events-none cursor-default'
                    : 'cursor-pointer'
                }`}
                onClick={() =>
                  option === '객관식'
                    ? !isReadOnly && handleRadioSelect(i)
                    : !isReadOnly && handleCheckboxToggle(i)
                }
              >
                <Image
                  src={
                    option === '객관식'
                      ? selectedRadio === i
                        ? Check
                        : EmptyCircle
                      : checkedBoxes[i]
                      ? CheckBox
                      : EmptySquare
                  }
                  alt={option === '객관식' ? '객관식 선택' : '체크박스 선택'}
                  width={
                    option === '객관식'
                      ? selectedRadio === i
                        ? 17
                        : 20
                      : checkedBoxes[i]
                      ? 17
                      : 20
                  }
                  height={
                    option === '객관식'
                      ? selectedRadio === i
                        ? 17
                        : 20
                      : checkedBoxes[i]
                      ? 17
                      : 20
                  }
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="px-3 font-semibold text-gray-500"
                  disabled={!isReadOnly}
                />
              </div>
              {isReadOnly && options.length > 1 && (
                <button onClick={() => handleRemoveOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {isReadOnly && options.length < 5 && (
            <button
              onClick={handleAddOption}
              className="mt-1 flex items-center gap-3 rounded py-1 align-middle font-semibold text-gray-300"
            >
              <Image
                src={option === '객관식' ? EmptyCircle : EmptySquare}
                alt={option === '객관식' ? '객관식 선택' : '체크박스 선택'}
                width={20}
                height={20}
              />
              옵션 추가...
            </button>
          )}
        </div>
      )}

      {option === '서술형' && (
        <div className={isReadOnly ? 'pointer-events-none opacity-50' : ''}>
          <TextArea
            placeholder="서술형 응답(최대 1,000자 이내)"
            disabled={isReadOnly}
          />
        </div>
      )}

      {option === '단답형' && (
        <div className={isReadOnly ? 'pointer-events-none opacity-50' : ''}>
          <TextArea
            placeholder="단답형 응답 (최대 300자 이내)"
            disabled={isReadOnly}
          />
        </div>
      )}

      {option === '파일 업로드' && (
        <div className={isReadOnly ? 'pointer-events-none opacity-50' : ''}>
          <div className="relative">
            <FileUpload
              onFilesSelected={(files) => setUploadedFiles(files)}
              disabled={isReadOnly}
            />
            {isReadOnly && (
              <div className="pointer-events-none absolute inset-0 bg-gray-200 opacity-50"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
