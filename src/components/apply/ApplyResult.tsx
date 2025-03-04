import Image from 'next/image';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import DownLoad from '@/assets/download.svg';
import { Answer } from '@/types/apply';
import { downloadBlob } from '@/utils/file';
import ApplyContentBox from './ApplyContentBox';
import CheckBox from '../common/CheckBox';
import Radio from '../common/Radio';
export default function ApplyResult({ ...answers }: Answer) {
  const { question, type, order, options, required, section, value, files } =
    answers;

  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      downloadBlob(blob, filename);
    } catch (error) {
      toast.error('파일 다운로드 중 오류가 발생했습니다.');
    }
  };

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
        <TextareaAutosize
          disabled
          className="w-full bg-inherit text-base font-semibold text-gray-700 md:text-lg"
        >
          {value}
        </TextareaAutosize>
      );
    }

    if (type === 'FILE' && files.length > 0) {
      return (
        <>
          {files.map((file) => (
            <div key={file.name} className="flex items-center gap-2">
              <button
                onClick={() => downloadFile(file.cdnUrl, file.name)}
                className="flex items-center text-lg font-semibold text-gray-700"
              >
                {file.name}
                <Image
                  src={DownLoad}
                  width={20}
                  height={20}
                  alt="file"
                  className="ml-3"
                />
              </button>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <ApplyContentBox className="flex flex-col gap-4">
      <div className="text-base font-semibold text-blue-600 md:text-xl md:font-bold">
        {section}
        {order}. {question}
        <span className="text-red-600">{required && '*'}</span>
      </div>
      {renderContent()}
    </ApplyContentBox>
  );
}
