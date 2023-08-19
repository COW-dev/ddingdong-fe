import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import File from '@/assets/file.svg';
import { NoticeDetail } from '@/types/notice';

type UploadFileProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileUrls?: { fileUrl: string; name: string }[];
  setNoticeData?: Dispatch<SetStateAction<NoticeDetail>>;
};

export default function UploadFile({
  file,
  setFile,
  fileUrls,
  setNoticeData,
}: UploadFileProps) {
  const [fileName, setFileName] = useState<string | null>(
    (fileUrls && fileUrls[0]?.name) ?? null,
  );
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
      setFileName(file.name);
    }
  }
  function handelCancle() {
    setFile(null);
    setFileName(null);
    setNoticeData && setNoticeData((prev) => ({ ...prev, fileUrls: [] }));
  }

  return (
    <div className="mt-3 h-10 w-full rounded-lg border border-gray-100 bg-gray-50 text-gray-900 placeholder:text-gray-300 focus:outline-none">
      <label
        className="md:text-md flex items-center text-sm font-medium text-gray-300 "
        htmlFor="file_input"
      >
        <Image
          src={File}
          width={20}
          height={20}
          alt="file"
          className="my-2 ml-3 cursor-pointer"
        />
        {file || fileName ? (
          <>
            <span className="ml-3">{fileName}</span>
            <button
              type="button"
              className="ml-auto mr-3 cursor-pointer"
              onClick={handelCancle}
            >
              X
            </button>
          </>
        ) : (
          <>
            <span className="ml-2 cursor-pointer">파일을 선택해주세요.</span>
            <input
              className="hidden"
              id="file_input"
              name="uploadFile"
              type="file"
              onChange={handleChange}
            />
          </>
        )}
      </label>
    </div>
  );
}
