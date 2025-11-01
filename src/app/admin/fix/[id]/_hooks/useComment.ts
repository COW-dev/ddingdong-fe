import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateComment } from '@/app/_api/mutations/fix';
import { ApiError } from '@/app/_api/fetcher';

export const useComment = (postId: number) => {
  const [comment, setComment] = useState<string>('');
  const mutation = useCreateComment(postId);

  const handleSubmit = () => {
    mutation.mutate(
      { postId, comment },
      {
        onSuccess: () => {
          toast.success('댓글을 성공적으로 생성했어요.');
        },
        onError: (error: Error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
        },
      },
    );
    setComment('');
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length === 255)
      return toast(
        `255자 이하로 작성해주세요. \n
          현재 : ${inputText.length}자`,
      );
    setComment(inputText);
  };

  return {
    comment,
    handleSubmit,
    handleChangeMessage,
  };
};
