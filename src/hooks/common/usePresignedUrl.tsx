import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getPresignedUrl, uploadPresignedUrl } from '@/app/_api/services/file';
import { UploadFile } from '@/app/_api/types/file';

export function usePresignedUrl() {
  const uploadFile = useMutation<UploadFile, Error, File>({
    mutationFn: async (file: File) => {
      const { id, uploadUrl, contentType } = await getPresignedUrl(
        encodeURIComponent(file.name),
      );

      await uploadPresignedUrl(file, uploadUrl, contentType);
      return { id, file, contentType };
    },
    onError: (error, variables, context) => {
      console.error('❌ 업로드 실패:', error, variables, context);
      toast.error('파일 업로드 중 문제가 발생했어요.');
    },
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
      console.error('❌ getPresignedId Error:', e);

      handleError([file.name]);
    }
  };

  const getPresignedIds = async (files: File[]) => {
    const results = await Promise.allSettled(
      files.map((file) => uploadFile.mutateAsync(file)),
    );
    return handlePartialUpload(results, files);
  };

  return {
    getPresignedIds,
    getPresignedId,
    isLoading: uploadFile.isPending,
  };
}
