import { useState } from 'react';

export const useMemberExcelFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const resetAll = () => {
    setFile(null);
  };
  return { file, handleChangeFiles, handleDeleteFile, resetAll };
};
