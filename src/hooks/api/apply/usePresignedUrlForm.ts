import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getPresignedUrlForm, uploadPresignedUrl } from '@/apis';

interface UploadFile {
  id: string;
  fileName: string;
}

export function usePresignedUrlForm() {
  const presignedUrlMutation = useMutation(
    async (fileName: string) => {
      const response = await getPresignedUrlForm(fileName);

      return response.data;
    },
    {
      onError: (error) => {
        toast.error('Presigned URL 요청 중 오류가 발생했습니다.');
      },
    },
  );

  const uploadFileMutation = useMutation(
    async ({
      file,
      uploadUrl,
      contentType,
    }: {
      file: File;
      uploadUrl: string;
      contentType: string;
    }) => {
      await uploadPresignedUrl(file, uploadUrl, contentType);
    },
    {
      onError: (error) => {
        toast.error('파일 업로드 중 오류가 발생했습니다.');
      },
    },
  );

  const getPresignedId = async (file: File): Promise<UploadFile | null> => {
    try {
      const { id, uploadUrl, contentType } =
        await presignedUrlMutation.mutateAsync(file.name);

      if (!id || !uploadUrl || !contentType) {
        throw new Error('Presigned URL 응답이 올바르지 않습니다.');
      }

      await uploadFileMutation.mutateAsync({
        file,
        uploadUrl,
        contentType,
      });

      return { id, fileName: file.name };
    } catch (error) {
      toast.error(`${file.name} 업로드 실패. 다시 시도해주세요.`);

      return null;
    }
  };

  const getPresignedIds = useCallback(
    async (files: File[]): Promise<UploadFile[]> => {
      const results = await Promise.allSettled(
        files.map((file) => getPresignedId(file)),
      );

      const uploadedFiles = results
        .filter(
          (result): result is PromiseFulfilledResult<UploadFile> =>
            result.status === 'fulfilled' && result.value !== null,
        )
        .map((result) => result.value);

      const failedFiles = results
        .filter(
          (result) => result.status === 'rejected' || result.value === null,
        )
        .map((_, index) => files[index].name);

      if (failedFiles.length > 0) {
        toast.error(`${failedFiles.join(', ')} 업로드 실패`);
      }

      return uploadedFiles;
    },
    [],
  );

  return {
    getPresignedIds,
    getPresignedId,
    isLoading: presignedUrlMutation.isLoading || uploadFileMutation.isLoading,
  };
}
