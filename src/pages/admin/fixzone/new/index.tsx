import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';

import LeftArrow from '@/assets/leftArrow.svg';
import NeutralButton from '@/components/common/NeutralButton';
import UploadMultipleImage from '@/components/common/UploadMultipleImage';
import { useNewFix } from '@/hooks/api/fixzone/useNewFix';
export default function Index() {
  const mutation = useNewFix();
  const [{ token }] = useCookies(['token']);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File[]>([]);
  function handleSubmit() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < image.length; i++) {
      formData.append('images', image[i]);
    }
    mutation.mutate({
      formData: formData,
      token: token,
    });
    handleReset();
  }
  function handleReset() {
    setTitle('');
    setContent('');
    setImage([]);
  }
  return (
    <div className="m-auto max-w-[650px] bg-gray-100 p-10">
      <div className="flex justify-between">
        <Link href="/fixzone">
          <Image src={LeftArrow} alt="back" width={25} height={25} />
        </Link>
        <div className="text-lg font-bold">Fix:Zone 요청하기</div>
        <div></div>
      </div>

      {/* 정보 */}
      <div className="mb-7 mt-14 rounded-xl bg-white p-5 shadow-xl">
        <TextareaAutosize
          value={title}
          spellCheck={false}
          className="w-full resize-none bg-inherit py-2 text-xl font-bold outline-0 placeholder:text-gray-300 focus:border-none"
          placeholder="제목을 입력해주세요."
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextareaAutosize
          value={content}
          spellCheck={false}
          className="text-md w-full resize-none bg-inherit py-2 font-semibold  outline-0 placeholder:text-gray-300 focus:border-none"
          placeholder="요청내용을 입력해주세요."
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      {/* 내용 */}
      <div className="relative my-7 flex items-center justify-center">
        <div className="w-full rounded-xl bg-white">
          <UploadMultipleImage image={image} setImage={setImage} />
        </div>
      </div>

      <div className="mr-8 mt-6 flex justify-end md:mt-8">
        <button
          onClick={handleSubmit}
          className="mr-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5"
        >
          전송
        </button>
        <div className="rounded-xl border border-gray-200">
          <NeutralButton href="/fixzone">취소</NeutralButton>
        </div>
      </div>
    </div>
  );
}
