import { useState } from 'react';
import Image from 'next/image';
import { usePresignedUrlForm } from '@/hooks/api/apply/usePresignedUrlForm'; // Presigned URL 훅 가져오기
import File from '../../assets/file.svg';

interface FileUploadProps {
  onFilesSelected: (files: File[] | string[]) => void;
  disabled?: boolean;
}

export default function FileUpload({
  onFilesSelected,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { getPresignedIds, isLoading } = usePresignedUrlForm();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    const updatedFiles = [...files, ...selectedFiles];

    setFiles(updatedFiles);

    if (getPresignedIds) {
      const uploadedFiles = await getPresignedIds(selectedFiles);
      const fileIds = uploadedFiles.map((file) => file.id);

      onFilesSelected(fileIds);
    } else {
      console.error('getPresignedIds is undefined.');
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border">
      <label className="relative flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-50 bg-gray-50 px-4 py-3 text-start text-sm font-semibold text-gray-400 shadow-sm">
        <Image src={File} alt="file_icon" width={17} />
        파일을 선택해주세요
        <input
          type="file"
          multiple
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
          disabled={disabled || isLoading}
        />
      </label>

      {files.length > 0 && (
        <div className="px-4 pb-2">
          <ul className="flex flex-col justify-start gap-1 text-center align-middle">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex flex-row items-center text-base text-gray-600"
              >
                <button
                  className="p-1 pr-2 text-sm text-gray-500"
                  onClick={() => removeFile(index)}
                >
                  X
                </button>
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
