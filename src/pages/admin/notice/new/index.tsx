import { useState } from 'react';
import Head from 'next/head';
import TextareaAutosize from 'react-textarea-autosize';

export default function Index() {
  const [content, setContent] = useState<string>('');

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항 작성하기</title>
      </Head>
      <h1 className="mt-7 text-3xl font-bold md:mt-10 md:text-4xl">
        공지사항 작성하기
      </h1>
      <form className="mt-8 w-full md:mt-11">
        <TextareaAutosize
          spellCheck={false}
          className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-2xl font-bold outline-none md:p-5 md:text-3xl"
          placeholder="제목을 입력하세요"
        />
        <TextareaAutosize
          minRows={8}
          value={content}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          onChange={(event) => setContent(event.target.value)}
          className="mt-4 h-auto w-full resize-none overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mt-6 md:p-5 md:text-lg"
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
