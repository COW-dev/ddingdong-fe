import { useState } from 'react';
import Image from 'next/image';
import FileUpload from './FileUpload';
import TextArea from './TextArea';
import EmptyCircle from '../../assets/empty-circle-check.svg';
import EmptySquare from '../../assets/empty_square_check.svg';
import FilledCircle from '../../assets/check.svg';
import FilledSquare from '../../assets/checkbox.svg';

interface Props {
  fieldId: number;
  index: number;
  type: string;
  isClosed: boolean;
  question: string;
  options: string[] | [];
  required: boolean;
}

export default function ApplyContent({
  index,
  type,
  isClosed,
  options,
  question,
  required,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRadioChange = (option: string) => {
    setSelectedOptions([option]);
  };

  return (
    <div className="border-b border-gray-200 pb-3">
      <div className="font-semibold">{question}</div>
      <div className="text-sm text-gray-400">
        {required ? '* 필수' : '선택사항'}
      </div>

      {(type === 'CHECK_BOX' || type === 'RADIO') && (
        <div className="flex flex-col items-start gap-2 px-2 pb-3">
          {options.map((opt, i) => (
            <div key={i} className="flex w-full items-center gap-3">
              <div
                className="flex cursor-pointer items-center"
                onClick={() =>
                  type === 'CHECK_BOX'
                    ? handleCheckboxChange(opt)
                    : handleRadioChange(opt)
                }
              >
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
                  width={20}
                  height={20}
                />
              </div>

              <span className="text-gray-600">{opt}</span>
            </div>
          ))}
        </div>
      )}

      {type === 'LONG_TEXT' && (
        <TextArea
          placeholder="서술형 응답 (최대 1,000자 이내)"
          disabled={isClosed}
        />
      )}

      {type === 'TEXT' && (
        <TextArea
          placeholder="단답형 응답 (최대 300자 이내)"
          disabled={isClosed}
        />
      )}

      {type === 'FILE' && (
        <FileUpload onFilesSelected={() => {}} disabled={isClosed} />
      )}
    </div>
  );
}
