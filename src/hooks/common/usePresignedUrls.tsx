import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';

export function usePresignedUrls() {
  const [{ token }] = useCookies(['token']);

  const uploadFile = useMutation(async (file: File) => {
    const { data } = await getPresignedUrl(file.name, token);
    const { id, contentType, uploadUrl } = data;

    await uploadPresignedUrl(file, uploadUrl, contentType);
    return id;
  });

  const handleUploadResults = (
    results: PromiseSettledResult<string>[],
    files: File[],
  ): string[] => {
    const errorFileNames: string[] = [];
    const ids: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        ids.push(result.value);
      } else {
        errorFileNames.push(files[index].name);
      }
    });

    if (errorFileNames.length > 0) {
      handleError(errorFileNames);
    }

    return ids;
  };

  const handleError = (fileNames: string[]) => {
    toast.error(
      `${fileNames.join('\n')} \n ${
        fileNames.length
      }개의 파일에서 업로드에 실패했어요 `,
    );
    throw new Error('여러 파일 업로드 중 에러 발생');
  };

  const getPresignedIds = useCallback(
    async (files: File[]): Promise<string[]> => {
      const results = await Promise.allSettled(
        files.map((file) => uploadFile.mutateAsync(file)),
      );

      return handleUploadResults(results, files);
    },
    [uploadFile],
  );

  return {
    getPresignedIds,
    isLoading: uploadFile.isLoading,
  };
}
