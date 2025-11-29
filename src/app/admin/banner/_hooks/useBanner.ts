import { ApiError } from 'next/dist/server/api-utils';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useCreateBanner } from '@/app/_api/mutations/banner';
import { BannerAPIRequest } from '@/app/_api/types/banner';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';

export const useBanner = () => {
  const [webPreviewUrl, setWebPreviewUrl] = useState<string[]>([]);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string[]>([]);
  const [banner, setBanner] = useState<BannerAPIRequest>({
    mobileImageId: '',
    webImageId: '',
    link: '',
  });

  const initialize = () => {
    setWebPreviewUrl([]);
    setMobilePreviewUrl([]);
    setBanner({
      mobileImageId: '',
      webImageId: '',
      link: '',
    });
  };

  const { getPresignedId, isLoading } = usePresignedUrl();
  const { mutate } = useCreateBanner();

  const handleSubmit = (onSuccess: () => void) => {
    if ([banner.mobileImageId, banner.webImageId].includes('')) {
      return toast.error('웹/모바일용 이미지를 모두 첨부해주세요.');
    }
    mutate(banner, {
      onSuccess: () => {
        toast.success('배너가 생성되었어요.');
        onSuccess();
        initialize();
      },
      onError: (error: Error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
      },
    });
  };

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

  return {
    webPreviewUrl,
    mobilePreviewUrl,
    handleChangeWeb,
    handleChangeMobile,
    handleSubmit,
    isLoading,
  };
};
