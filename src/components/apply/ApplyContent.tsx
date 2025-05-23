import { useState } from 'react';
import Image from 'next/image';
import { usePresignedUrlForm } from '@/hooks/api/apply/usePresignedUrlForm';
import { FormAnswer, QuestionType } from '@/types/form';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import FilledCircle from '../../assets/check_form.svg';
import FilledSquare from '../../assets/check_square_form.svg';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';

interface Props {
  fieldId: string;
  type: QuestionType;
  question: string;
  options: string[];
  required: boolean;
  setFormAnswers: React.Dispatch<React.SetStateAction<FormAnswer[]>>;
}

export default function ApplyContent({
  fieldId,
  type,
  options,
  question,
  required,
  setFormAnswers,
}: Props) {
  const { getPresignedIds, isLoading } = usePresignedUrlForm();
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

  const longTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setLongTextValue(e.target.value);
    handleFormAnswer([e.target.value]);
  };

  const shortTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setShortTextValue(e.target.value);
    handleFormAnswer([e.target.value]);
  };

  const handleFileUpload = async (files: File[] | string[]) => {
    if (files.length === 0) return;

    if (typeof files[0] === 'string') {
      handleFormAnswer(files as string[]);
    } else {
      const uploadedFiles = await getPresignedIds(files as File[]);
      const fileIds = uploadedFiles.map((file) => file.id);
      handleFormAnswer(fileIds);
    }
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
        <div className="flex gap-1 pb-3 pl-1 text-lg font-bold text-blue-500 md:text-xl">
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
              <div className="flex min-w-7 cursor-pointer items-center">
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
        <FileUpload onFilesSelected={handleFileUpload} disabled={isLoading} />
      )}
    </div>
  );
}
