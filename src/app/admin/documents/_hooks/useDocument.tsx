import { useState } from 'react';

import { usePresignedUrl } from '../../../../hooks/common/usePresignedUrl';

type UploadFileRecord = {
  id: string;
  name: string;
  file: File;
};

export const useDocument = () => {
  const { getPresignedIds, isLoading } = usePresignedUrl();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<UploadFileRecord[]>([]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const resetTitle = () => {
    setTitle('');
  };

  const handleChangeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const uploadInfo = await getPresignedIds(selectedFiles);

    const newRecords = uploadInfo.map(({ id, file }) => ({
      id,
      name: file.name,
      file,
    }));

    setFiles((prev) => [...prev, ...newRecords]);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const resetAll = () => {
    setTitle('');
    setFiles([]);
  };

  return {
    title,
    files,
    isLoading,
    fileIds: files.map((file) => file.id),
    resetTitle,
    resetAll,
    handleChangeTitle,
    handleDeleteFile,
    handleChangeFiles,
  };
};
