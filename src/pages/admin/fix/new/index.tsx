import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Heading from '@/components/common/Heading';
import NeutralButton from '@/components/common/NeutralButton';
import UploadMultipleImage from '@/components/common/UploadMultipleImage';
import { useNewFix } from '@/hooks/api/fixzone/useNewFix';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { EditFix } from '@/types/fix';

export default function Index() {
  const mutation = useNewFix();
  const [{ token }] = useCookies(['token']);
  const [post, setPost] = useState<EditFix>(initPost);
  const [image, setImage] = useState<File[]>([]);

  function handleSubmit() {
    if (post.title === '') return toast('제목을 입력해주세요.');
    mutation.mutate({ post, token });
  }

  const { getPresignedIds, isLoading } = usePresignedUrl();

  const fetchKey = async () => {
    try {
      const ids = await getPresignedIds(image);
      setPost((prev) => ({
        ...prev,
        fixZoneImageIds: ids ?? null,
      }));
    } catch (e) {
      setImage([]);
    }
  };

  useEffect(() => {
    fetchKey();
  }, [image]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPost((prev: EditFix) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <>
      <Heading>동아리방 시설보수 신청</Heading>
      <div className="mt-10 flex w-full flex-col rounded-xl border border-gray-100 md:mt-14 md:flex-row">
        {/* 정보 */}
        <div className=" flex h-full w-full flex-col justify-between px-6 py-6 pb-0 md:w-1/2 md:p-6">
          <textarea
            value={post.title}
            name="title"
            spellCheck={false}
            className="mb-4 resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium shadow-sm outline-none md:h-1/6 md:p-4 "
            placeholder="[동아리명] 제목을 입력하세요."
            onChange={(event) => handleChange(event)}
          />
          <textarea
            value={post.content}
            name="content"
            spellCheck={false}
            className="h-full  resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium shadow-sm outline-none placeholder:text-gray-400 "
            placeholder="내용을 입력하세요."
            onChange={(event) => handleChange(event)}
          />
        </div>
        {/* 내용 */}
        <div className="md:w-1/2  md:flex-row">
          <div className="h-full rounded-xl bg-white">
            <UploadMultipleImage
              isLoading={isLoading}
              image={image}
              setImage={setImage}
            />
          </div>
        </div>
      </div>
      <div className="mr-8 mt-6 flex items-center justify-center md:mt-8">
        <div className="rounded-xl border-gray-200">
          <NeutralButton href="/fix">취소</NeutralButton>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`ml-5 rounded-lg bg-blue-500 px-16 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-600 md:w-auto md:text-base ${
            isLoading && 'cursor-not-allowed bg-gray-500 hover:bg-gray-600'
          }`}
        >
          신청하기
        </button>
      </div>
    </>
  );
}

const initPost: EditFix = {
  title: '',
  content: '',
  fixZoneImageIds: null,
};
