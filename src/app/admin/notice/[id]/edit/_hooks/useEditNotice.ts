import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { noticeQueryOptions } from '@/app/_api/queries/notice';
import { UrlType } from '@/app/_api/types/file';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { sortByOrder } from '@/utils/change';

export const useEditNotice = (noticeId: number) => {
  const { data: noticeData } = useSuspenseQuery(
    noticeQueryOptions.detail(noticeId),
  );
  const [noticeEditData, setNoticeEditData] = useState(noticeData);
  const [files, setFiles] = useState<UrlType[]>(noticeEditData.files);
  const [imageIds, setImageIds] = useState<UrlType[]>(
    sortByOrder(noticeEditData.images),
  );

  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();

  const isUploading = isImageLoading || isFileLoading;

  const handleChangeNoticeData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoticeEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickImageUpload = async (files: File[] | null) => {
    if (!files || files.length === 0) {
      setImageIds([]);
      return [];
    }

    const newFiles = files.filter((file) => file.size > 0);
    if (newFiles.length === 0) {
      return [];
    }

    const uploadInfo = await getImagePresignedId(newFiles);
    setImageIds((prev) => [
      ...prev,
      ...uploadInfo.map(({ id, file }) => {
        const previewUrl = URL.createObjectURL(file);
        return {
          id,
          fileName: file.name,
          cdnUrl: previewUrl,
          originUrl: previewUrl,
        };
      }),
    ]);
    return uploadInfo;
  };

  const handleClickFileUpload = async (files: File[]) => {
    const uploadInfo = await getFilePresignedId(files);
    setFiles((prev) => [
      ...prev,
      ...uploadInfo.map(({ id, file }) => ({
        id,
        fileName: file.name,
        cdnUrl: '',
        originUrl: '',
      })),
    ]);
    return uploadInfo;
  };

  const handleClickFileDelete = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.fileName !== fileName));
  };
  return {
    noticeEditData,
    imageIds,
    files,
    isUploading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  };
};
