import { useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import { useNewNotice } from '@/hooks/useNewNotice';

export default function Index() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const mutation = useNewNotice();
  const [cookies] = useCookies(['token']);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return mutation.mutate({ title, content, token: cookies.token });
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항 작성하기</title>
      </Head>
      <h1 className="mt-7 text-3xl font-bold md:mt-10 md:text-4xl">
        공지사항 작성하기
      </h1>
      <form className="mt-12 w-full md:mt-14" onSubmit={handleSubmit}>
        <TextareaAutosize
          value={title}
          spellCheck={false}
          className="w-full resize-none rounded-none border-b pb-2 text-xl font-semibold outline-none placeholder:text-gray-300 md:pb-3 md:text-2xl"
          placeholder="제목"
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextareaAutosize
          minRows={8}
          value={content}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          onChange={(event) => setContent(event.target.value)}
          className="mt-6 h-auto w-full resize-none overflow-hidden rounded-none border-b pb-2 text-base font-medium outline-none placeholder:text-gray-300 md:mt-8 md:pb-3 md:text-lg"
        />
        <div className="mt-4 flex justify-end md:mt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-100 px-4 py-4 font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5"
          >
            작성하기
          </button>
        </div>
      </form>
    </>
  );
}
