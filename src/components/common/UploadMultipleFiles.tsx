import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Cancel from '@/assets/cancle.svg';
import ClipIcon from '@/assets/clipIcon.svg';
import File from '@/assets/file.svg';
import { NoticeDetail } from '@/types/notice';

type UploadFileProps = {
  file: File[];
  setFile: Dispatch<SetStateAction<File[]>>;
  fileUrls?: { fileUrl: string; name: string }[];
  setNoticeData?: Dispatch<SetStateAction<NoticeDetail>>;
};
//file에 add
export default function UploadMultipleFile({
  file,
  setFile,
  fileUrls,
  setNoticeData,
}: UploadFileProps) {
  function handleFileAdd(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const fileItem = event.target.files[i];
        file?.push(fileItem);
      }
      setFile([...file]);
    }
  }

  function handleUploadFileDelete(index: number) {
    file.splice(index, 1);
    setFile([...file]);
  }
  function handleReceviedFileDelete(index: number) {
    fileUrls?.splice(index, 1);
    fileUrls &&
      setNoticeData &&
      setNoticeData((prev) => ({ ...prev, fileUrls: [...fileUrls] }));
  }

  const renderFileItem = (
    item: File | { fileUrl: string; name: string },
    index: number,
    callback: (index: number) => void,
  ) => (
    <div key={`file-${index}`} className="my-1 flex">
      <Image src={ClipIcon} width={10} height={10} alt="file" />
      <span className="ml-3 text-xs text-gray-500">{item.name}</span>
      <button
        type="button"
        className="ml-auto mr-3 cursor-pointer"
        onClick={() => callback(index)}
      >
        <Image src={Cancel} width={10} height={10} alt="delete" />
      </button>
    </div>
  );

  return (
    <>
      <div>
        {file.map((item, index) =>
          renderFileItem(item, index, handleUploadFileDelete),
        )}
        {fileUrls?.map((item, index) =>
          renderFileItem(item, index, handleReceviedFileDelete),
        )}
      </div>

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
          <span className="ml-2 cursor-pointer">파일을 선택해주세요.</span>
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
    </>
  );
}
