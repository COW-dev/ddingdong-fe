import { ApiError } from '@/app/_api/fetcher';
import { useCreateBanner } from '@/app/_api/mutations/banner';
import { NewBanner } from '@/app/_api/types/banner';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useBanner = () => {
  const [webPreviewUrl, setWebPreviewUrl] = useState<string[]>([]);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string[]>([]);
  const [banner, setBanner] = useState<NewBanner>({
    mobileImageId: '',
    webImageId: '',
    link: '',
  });

  const { mutate } = useCreateBanner();
  const { getPresignedId } = usePresignedUrl();

  const handleChangeImage = async ({
    files,
    urls,
    type,
  }: {
    files: File[] | null;
    urls: string[];
    type: 'web' | 'mobile';
  }) => {
    if (type === 'web') setWebPreviewUrl(urls);
    else setMobilePreviewUrl(urls);

    if (!files) {
      return setBanner((prev) => ({
        ...prev,
        [`${type}ImageId`]: '',
      }));
    }

    try {
      const uploadInfo = await getPresignedId(files[0]);
      setBanner((prev) => ({
        ...prev,
        [`${type}ImageId`]: uploadInfo?.id ?? '',
      }));
    } catch {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleChangeWeb = (files: File[] | null, urls: string[]) =>
    handleChangeImage({ files, urls, type: 'web' });

  const handleChangeMobile = (files: File[] | null, urls: string[]) =>
    handleChangeImage({ files, urls, type: 'mobile' });

  const handleSubmit = () => {
    mutate(banner, {
      onSuccess: () => {
        toast.success('배너가 생성되었어요.');
      },
      onError: (error: Error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
      },
    });
  };

  return {
    webPreviewUrl,
    mobilePreviewUrl,
    handleChangeWeb,
    handleChangeMobile,
    handleSubmit,
  };
};
