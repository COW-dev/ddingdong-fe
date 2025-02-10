import { useState } from 'react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export default function FileUpload({
  onFilesSelected,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    onFilesSelected(selectedFiles);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="relative flex w-full cursor-pointer rounded-lg border border-gray-50 bg-gray-50 px-4 py-3 text-start text-sm font-semibold text-gray-400 shadow-sm">
        {files.length > 0
          ? `선택된 파일 (${files.length}개): ${files
              .map((file) => file.name)
              .join(', ')}`
          : '파일을 선택해주세요'}
        <input
          type="file"
          multiple
          className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
