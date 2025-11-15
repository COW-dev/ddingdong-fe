import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getPresignedUrl, uploadPresignedUrl } from '@/app/_api/services/file';
import { UploadFile } from '@/app/_api/types/file';
import { convertGifToMp4, isGifFile } from '@/utils/gifToMp4';
import { optimizeImage } from '@/utils/imageOptimizer';

export function usePresignedUrl() {
  const uploadFile = useMutation<UploadFile, Error, File>({
    mutationFn: async (originalFile: File) => {
      let fileToUpload = originalFile;

      if (isGifFile(originalFile)) {
        const result = await convertGifToMp4(originalFile);
        fileToUpload = result.file;
      } else if (originalFile.type.startsWith('image/')) {
        const result = await optimizeImage(originalFile, 0.75);
        fileToUpload = result.file;
      }

      const { id, uploadUrl, contentType } = await getPresignedUrl(
        encodeURIComponent(fileToUpload.name),
      );
      await uploadPresignedUrl(fileToUpload, uploadUrl, contentType);

      return {
        id,
        file: fileToUpload,
        contentType,
      };
    },
    onError: (error, variables, context) => {
      console.error('업로드 실패:', error, variables, context);
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
