import { useState } from 'react';
import Image from 'next/image';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import FilledCircle from '../../assets/check_form.svg';
import FilledSquare from '../../assets/check_square_form.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

interface FormAnswer {
  fieldId: string | number;
  value: string[];
}

interface Props {
  fieldId: string | number;
  type: 'CHECK_BOX' | 'RADIO' | 'LONG_TEXT' | 'TEXT' | 'FILE';
  question: string;
  options: string[];
  required: boolean;
  formAnswers: FormAnswer[];
  setFormAnswers: React.Dispatch<React.SetStateAction<FormAnswer[]>>;
}

export default function ApplyContent({
  fieldId,
  type,
  options,
  question,
  required,
  formAnswers,
  setFormAnswers,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [longTextValue, setLongTextValue] = useState('');
  const [shortTextValue, setShortTextValue] = useState('');

  const handleCheckboxChange = (option: string) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    handleFormAnswer(updatedOptions);
  };

  const handleRadioChange = (option: string) => {
    setSelectedOptions([option]);
    handleFormAnswer([option]);
  };

  const longTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLongTextValue(e.target.value);
    handleFormAnswer([e.target.value]);
  };

  const shortTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShortTextValue(e.target.value);
    handleFormAnswer([e.target.value]);
  };

  const handleFormAnswer = (newValue: string[]) => {
    setFormAnswers((prev) => {
      const existingIndex = prev.findIndex(
        (answer) => answer.fieldId === fieldId,
      );

      if (existingIndex !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingIndex] = { fieldId, value: newValue };
        return updatedAnswers;
      } else {
        return [...prev, { fieldId, value: newValue }];
      }
    });
  };

  return (
    <div className="my-5 rounded-lg border px-6 py-6">
      <div>
        <div className="flex gap-1 pb-3 pl-1 text-xl font-bold text-blue-500">
          {question} <span className="text-red-500">{required ? '*' : ''}</span>
        </div>
      </div>

      {(type === 'CHECK_BOX' || type === 'RADIO') && (
        <div className="flex flex-col items-start pb-3">
          {options.map((opt, i) => (
            <div
              onClick={() =>
                type === 'CHECK_BOX'
                  ? handleCheckboxChange(opt)
                  : handleRadioChange(opt)
              }
              key={i}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 md:hover:bg-gray-100"
            >
              <div className="flex cursor-pointer items-center">
                <Image
                  src={
                    type === 'CHECK_BOX'
                      ? selectedOptions.includes(opt)
                        ? FilledSquare
                        : EmptySquare
                      : selectedOptions.includes(opt)
                      ? FilledCircle
                      : EmptyCircle
                  }
                  alt={`${type} 선택`}
                  width={24}
                  height={24}
                  className={`h-6 w-6 transition-all duration-300 ease-in-out ${
                    selectedOptions.includes(opt)
                      ? 'scale-95 opacity-100'
                      : 'scale-70 opacity-80'
                  }`}
                />
              </div>

              <span className="py-1 text-base font-semibold text-gray-500">
                {opt}
              </span>
            </div>
          ))}
        </div>
      )}

      {type === 'LONG_TEXT' && (
        <TextArea
          placeholder="서술형 응답 (최대 1,000자 이내)"
          disabled={false}
          onChange={longTextChange}
          value={longTextValue}
        />
      )}

      {type === 'TEXT' && (
        <TextArea
          placeholder="단답형 응답 (최대 300자 이내)"
          disabled={false}
          onChange={shortTextChange}
          value={shortTextValue}
        />
      )}

      {type === 'FILE' && (
        <FileUpload
          onFilesSelected={(files) => console.log(files)}
          disabled={false}
        />
      )}
    </div>
  );
}
