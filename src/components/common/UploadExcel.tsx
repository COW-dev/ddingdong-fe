import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import File from '@/assets/file.svg';
import Refresh from '@/assets/refresh.svg';

type UploadFileProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileUrls?: { fileUrl: string; name: string };
};

export default function UploadMemberExcel({
  file,
  setFile,
  fileUrls,
}: UploadFileProps) {
  const [fileName, setFileName] = useState<string | null>(
    (fileUrls && fileUrls?.name) ?? null,
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
      setFileName(file.name);
    }
  }
  function handelCancel() {
    setFile(null);
    setFileName(null);
  }
  return (
    <>
      <div className="mt-2 h-60 w-full rounded-lg border border-gray-100 bg-gray-50 placeholder:text-gray-300 focus:outline-none">
        <label
          className="md:text-md flex flex-col items-center text-sm font-medium text-gray-300 "
          htmlFor="excel"
        >
          {file || fileName ? (
            <>
              <div
                className=" mr-3 mt-2 flex w-full items-center justify-end"
                onClick={handelCancel}
              >
                <Image
                  src={Refresh}
                  height={15}
                  width={15}
                  alt={'재설정'}
                  className="cursor-pointer"
                />
                <button
                  type="button"
                  className="text-md ml-1 cursor-pointer font-bold text-blue-500"
                >
                  재설정
                </button>
              </div>
              <span className="mt-20 w-full text-center text-2xl font-bold">
                {fileName}
              </span>
            </>
          ) : (
            <>
              <div className="my-16 flex h-full w-full flex-col items-center justify-center">
                <div className="cursor-pointer text-4xl font-bold text-blue-500 ">
                  +
                </div>
                <div className="mt-5 cursor-pointer text-xl font-bold text-blue-500 ">
                  엑셀 파일 첨부하기
                </div>
              </div>
              <input
                className=" hidden"
                id="excel"
                name="excel"
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleChange}
              />
            </>
          )}
        </label>
      </div>
    </>
  );
}
