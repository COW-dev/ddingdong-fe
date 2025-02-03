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
  isEditing: boolean;
};

export default function Content({ option, isEditing, QuestionInfo }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
  const [radioOptions, setRadioOptions] = useState<string[]>(['옵션 1']);

  const [checkedBoxes, setCheckedBoxes] = useState<boolean[]>([false]);
  const [checkboxOptions, setCheckboxOptions] = useState<string[]>(['옵션 1']);

  const handleRadioSelect = (index: number) => {
    if (!isEditing) {
      setSelectedRadio(index);
    }
  };

  const handleCheckboxToggle = (index: number) => {
    if (!isEditing) {
      setCheckedBoxes((prev) =>
        prev.map((checked, i) => (i === index ? !checked : checked)),
      );
    }
  };

  const handleAddRadioOption = () => {
    if (isEditing && radioOptions.length < 5) {
      setRadioOptions([...radioOptions, `옵션 ${radioOptions.length + 1}`]);
    }
  };

  const handleAddCheckboxOption = () => {
    if (isEditing && checkboxOptions.length < 5) {
      setCheckboxOptions([
        ...checkboxOptions,
        `옵션 ${checkboxOptions.length + 1}`,
      ]);
      setCheckedBoxes([...checkedBoxes, false]);
    }
  };

  const handleRemoveRadioOption = (index: number) => {
    if (isEditing && radioOptions.length > 1) {
      setRadioOptions(radioOptions.filter((_, i) => i !== index));
    }
  };

  const handleRemoveCheckboxOption = (index: number) => {
    if (isEditing && checkboxOptions.length > 1) {
      setCheckboxOptions(checkboxOptions.filter((_, i) => i !== index));
      setCheckedBoxes(checkedBoxes.filter((_, i) => i !== index));
    }
  };

  const handleRadioOptionChange = (index: number, newValue: string) => {
    if (isEditing) {
      setRadioOptions((prev) =>
        prev.map((opt, i) => (i === index ? newValue : opt)),
      );
    }
  };

  const handleCheckboxOptionChange = (index: number, newValue: string) => {
    if (isEditing) {
      setCheckboxOptions((prev) =>
        prev.map((opt, i) => (i === index ? newValue : opt)),
      );
    }
  };

  return (
    <div className="border-b border-gray-200 pb-3">
      {option === '객관식' && (
        <div className="flex flex-col items-start gap-2 px-2 pb-3">
          {radioOptions.map((opt, i) => (
            <div
              key={i}
              className="flex w-full flex-row items-center justify-between gap-2"
            >
              <div
                className={`flex h-[34px] flex-shrink-0 items-center ${
                  isEditing ? '' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && handleRadioSelect(i)}
              >
                <Image
                  src={selectedRadio === i ? Check : EmptyCircle}
                  alt="객관식 선택"
                  width={selectedRadio === i ? 17 : 20}
                  height={selectedRadio === i ? 17 : 20}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleRadioOptionChange(i, e.target.value)}
                  className="px-3 font-semibold text-gray-500 outline-none"
                  disabled={!isEditing}
                />
              </div>
              {isEditing && radioOptions.length > 1 && (
                <button onClick={() => handleRemoveRadioOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {isEditing && radioOptions.length < 5 && (
            <button
              onClick={handleAddRadioOption}
              className="mt-1 flex items-center gap-3 rounded py-1 align-middle font-semibold text-gray-300"
            >
              <Image
                src={EmptyCircle}
                alt="객관식 선택"
                width={20}
                height={20}
              />
              옵션 추가...
            </button>
          )}
        </div>
      )}

      {option === '체크박스' && (
        <div className="flex flex-col items-start gap-2 border-b border-gray-100 px-2 pb-3">
          {checkboxOptions.map((opt, i) => (
            <div
              key={i}
              className="flex w-full flex-row items-center justify-between gap-2"
            >
              <div
                className={`flex h-[34px] flex-shrink-0 items-center ${
                  isEditing ? '' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && handleCheckboxToggle(i)}
              >
                <Image
                  src={checkedBoxes[i] ? CheckBox : EmptySquare}
                  alt="체크박스 선택"
                  width={checkedBoxes[i] ? 17 : 20}
                  height={checkedBoxes[i] ? 17 : 20}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    handleCheckboxOptionChange(i, e.target.value)
                  }
                  className=" px-3 font-semibold text-gray-500 outline-none"
                  disabled={!isEditing}
                />
              </div>
              {isEditing && checkboxOptions.length > 1 && (
                <button onClick={() => handleRemoveCheckboxOption(i)}>
                  <Image src={CloseIcon} alt="삭제" width={16} height={16} />
                </button>
              )}
            </div>
          ))}
          {isEditing && checkboxOptions.length < 5 && (
            <button
              onClick={handleAddCheckboxOption}
              className="mt-1 flex items-center gap-3 rounded py-1 align-middle font-semibold text-gray-300"
            >
              <Image
                src={EmptySquare}
                alt="체크박스 선택"
                width={20}
                height={20}
              />
              옵션 추가...
            </button>
          )}
        </div>
      )}

      {option === '서술형' && (
        <TextArea
          placeholder="서술형 응답(최대 1,000자 이내)"
          disabled={isEditing}
        />
      )}
      {option === '단답형' && (
        <TextArea
          placeholder="단답형 응답 (최대 300자 이내)"
          disabled={isEditing}
        />
      )}
      {option === '파일 업로드' && (
        <FileUpload
          onFilesSelected={(files) => setUploadedFiles(files)}
          disabled={isEditing}
        />
      )}
    </div>
  );
}
