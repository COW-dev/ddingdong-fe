import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';
import { UploadFile } from '@/types';

export function usePresignedUrl() {
  const [{ token }] = useCookies(['token']);

  const uploadFile = useMutation(async (file: File): Promise<UploadFile> => {
    const { data } = await getPresignedUrl(file.name, token);
    const { id, contentType, uploadUrl } = data;

    await uploadPresignedUrl(file, uploadUrl, contentType);
    return { id, file, contentType };
  });

  const handleError = (fileNames: string[]) => {
    toast.error(
      `${fileNames.join('\n')} \n ${
        fileNames.length
      }개의 파일을 다시 업로드해주세요. `,
    );
  };

  const handlePartialUpload = (
    results: PromiseSettledResult<UploadFile>[],
    files: File[],
  ): UploadFile[] => {
    const errorFileNames: string[] = [];
    const successFile: UploadFile[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successFile.push(result.value);
      } else {
        errorFileNames.push(files[index].name);
      }
    });

    if (errorFileNames.length > 0) {
      handleError(errorFileNames);
    }

    return successFile;
  };

  const getPresignedId = async (file: File) => {
    try {
      return await uploadFile.mutateAsync(file);
    } catch (e) {
      handleError([file.name]);
    }
  };

  const getPresignedIds = useCallback(
    async (files: File[]) => {
      const results = await Promise.allSettled(
        files.map((file) => uploadFile.mutateAsync(file)),
      );
      return handlePartialUpload(results, files);
    },
    [uploadFile],
  );

  return {
    getPresignedIds,
    getPresignedId,
    isLoading: uploadFile.isLoading,
  };
}
