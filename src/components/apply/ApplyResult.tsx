import Image from 'next/image';
import DownLoad from '@/assets/download.svg';
import { Answer } from '@/types/apply';
import ApplyContentBox from './ApplyContentBox';
import CheckBox from '../common/CheckBox';
import Radio from '../common/Radio';

export default function ApplyResult({ ...answers }: Answer) {
  const { question, type, order, options, required, value } = answers;

  const renderContent = () => {
    if (type === 'CHECK_BOX' && options) {
      return (
        <div>
          {options.map((option) => (
            <label key={option} className="mb-4 flex items-center gap-2">
              <CheckBox value={value.includes(option)} disabled />
              <span className="text-base font-medium text-gray-700 md:text-lg">
                {option}
              </span>
            </label>
          ))}
        </div>
      );
    }
    if (type === 'RADIO' && options) {
      return (
        <div>
          {options.map((option) => (
            <label key={option} className="mb-4 flex items-center gap-2">
              <Radio value={value.includes(option)} disabled />
              <span className="text-base font-medium text-gray-700 md:text-lg">
                {option}
              </span>
            </label>
          ))}
        </div>
      );
    }
    if (type === 'TEXT' || type === 'LONG_TEXT') {
      return (
        <div className="text-base font-semibold text-gray-700 md:text-lg">
          {value}
        </div>
      );
    }

    if (type === 'FILE') {
      return (
        <div className="flex items-center gap-2">
          <a
            download
            href={value[0]}
            target="_blank"
            className="flex items-center text-lg font-semibold text-gray-700"
          >
            {value[0]}
            <Image src={DownLoad} width={20} height={20} alt="file" />
          </a>
        </div>
      );
    }
  };

  return (
    <ApplyContentBox className="flex flex-col gap-4">
      <div className="text-base font-semibold text-blue-600 md:text-xl md:font-bold">
        {order}. {question}
        <span className="text-red-600">{required && '*'}</span>
      </div>
      {renderContent()}
    </ApplyContentBox>
  );
}
