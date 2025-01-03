import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Cancel from '@/assets/cancel.svg';
import File from '@/assets/file.svg';
import { UploadFile, UrlType } from '@/types';
import Loading from '../loading/Loading';

type UploadFileProps = {
  isLoading: boolean;
  onAdd: (file: File[]) => Promise<UploadFile[]>;
  onDelete: (fileId: string) => void;
  initialFiles?: UrlType[];
};

export default function UploadMultipleFile({
  isLoading,
  onAdd,
  onDelete,
  initialFiles = [],
}: UploadFileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<UrlType[]>(initialFiles);

  async function handleFileAdd(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const uploadInfo = await onAdd(Array.from(event.target.files));
      const newFiles = uploadInfo.map((info) => info.file);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }

  function handleExistingFileDelete(index: number) {
    const fileId = existingFiles[index].id;
    if (fileId) {
      onDelete(fileId);
      setExistingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  }
  function handleNewFileDelete(index: number) {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  const renderFileItem = (
    item: File | UrlType,
    index: number,
    isExisting: boolean,
    callback: (index: number) => void,
  ) => (
    <div
      key={`file-${isExisting ? 'existing' : 'new'}-${index}`}
      className="my-2 flex"
    >
      <button
        type="button"
        className="mr-2 cursor-pointer"
        onClick={() => callback(index)}
      >
        <Image src={Cancel} width={15} height={15} alt="delete" />
      </button>
      <span className="text-sm font-semibold text-gray-500">
        {isExisting ? (item as UrlType).fileName : (item as File).name}
      </span>
    </div>
  );

  if (isLoading)
    return (
      <div className="flex h-full w-full justify-center p-6">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="mt-3 h-12 w-full cursor-pointer rounded-lg border border-gray-100 bg-gray-50 text-gray-900 placeholder:text-gray-300 focus:outline-none">
        <label
          className="md:text-md flex h-full items-center text-sm font-medium text-gray-400 "
          htmlFor="file_input"
        >
          <Image
            src={File}
            width={20}
            height={20}
            alt="file"
            className="my-2 ml-3 cursor-pointer"
          />
          <span className="ml-2 cursor-pointer font-semibold">
            파일을 선택해주세요.
          </span>
          <input
            className="hidden"
            id="file_input"
            name="uploadFile"
            type="file"
            multiple
            onChange={handleFileAdd}
          />
        </label>
      </div>
      <div className="ml-1">
        {existingFiles.map((item, index) =>
          renderFileItem(item, index, true, handleExistingFileDelete),
        )}
        {files.map((item, index) =>
          renderFileItem(item, index, false, handleNewFileDelete),
        )}
      </div>
    </>
  );
}
