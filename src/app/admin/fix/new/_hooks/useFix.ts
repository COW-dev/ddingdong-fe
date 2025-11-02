import { ChangeEvent, useState } from 'react';

import toast from 'react-hot-toast';

import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { EditFix } from '@/types/fix';
import { createImageOrder } from '@/utils/change';
import { useCreateFix } from '@/app/_api/mutations/fix';

const INIT_POST: EditFix = {
  title: '',
  content: '',
  images: null,
};

export const useFix = () => {
  const mutation = useCreateFix();
  const [post, setPost] = useState<EditFix>(INIT_POST);
  const { getPresignedIds, isLoading } = usePresignedUrl();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPost((prev: EditFix) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleClickUpload = async (files: File[]) => {
  //   const uploadInfo = await getPresignedIds(files);
  //   const uploadIds = uploadInfo.map(({ id }) => id);
  //   setPost((prev) => ({
  //     ...prev,
  //     images: prev.images === null ? uploadIds : [...prev.images, ...uploadIds],
  //   }));
  //   return uploadInfo;
  // };

  const handleSubmit = () => {
    if (post.title === '') return toast('제목을 입력해주세요.');
    const submitData = {
      ...post,
      images: createImageOrder(post.images),
    };
    mutation.mutate({ post: submitData });
  };

  return {
    post,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
