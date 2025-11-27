import { useRouter } from 'next/navigation';

import { ChangeEvent, useState } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useCreateFix } from '@/app/_api/mutations/fix';
import { FixAPIRequest } from '@/app/_api/types/fix';
import { UploadRecord } from '@/app/admin/notice/new/_hook/useNewNotice';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';

const INIT_POST: FixAPIRequest = {
  title: '',
  content: '',
  images: null,
};

export const useFix = () => {
  const mutation = useCreateFix();
  const router = useRouter();
  const [images, setImages] = useState<UploadRecord[]>([]);
  const [post, setPost] = useState<FixAPIRequest>(INIT_POST);
  const { getPresignedIds, isLoading } = usePresignedUrl();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPost((prev: FixAPIRequest) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClickImageUpload = async (
    files: File[] | null,
    urls: string[] | null,
  ) => {
    if (!files || !urls) {
      setImages([]);
      return [];
    }

    const newFiles = files.filter((file) => file.size > 0);
    if (newFiles.length === 0) {
      return setImages((prev) => {
        const fileNames = files.map((file) => file.name);
        return prev?.filter((item) => fileNames.includes(item.name ?? ''));
      });
    }

    const uploadInfo = await getPresignedIds(newFiles);
    setImages((prev) => [
      ...prev,
      ...uploadInfo.map(({ id, file }, index) => {
        return {
          id,
          name: file.name,
          previewUrl: urls[index],
          file,
        };
      }),
    ]);
    return uploadInfo;
  };

  const handleSubmit = () => {
    if (post.title === '') return toast('제목을 입력해주세요.');
    const submitData: FixAPIRequest = {
      ...post,
      images: images.map((image, index) => ({ id: image.id, order: index })),
    };
    mutation.mutate(submitData, {
      onSuccess: () => {
        toast.success('시설보수 요청사항이 접수되었어요.');
        router.push('/fix');
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          return toast.error(error.message);
        }
      },
    });
  };

  return {
    post,
    images,
    isLoading,
    handleChange,
    handleSubmit,
    handleClickImageUpload,
  };
};
