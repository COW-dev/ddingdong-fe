import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Index() {
  const [content, setContent] = useState<string>('');

  return (
    <>
      <h1 className="mt-7 text-3xl font-bold md:mt-10 md:text-4xl">
        공지사항 작성하기
      </h1>
      <form className="mt-8 w-full md:mt-10">
        <TextareaAutosize
          spellCheck
          className="w-full resize-none rounded-xl border bg-gray-50 p-5 text-xl font-bold outline-none placeholder:font-medium md:p-6 md:text-2xl"
          placeholder="제목"
        />
        <TextareaAutosize
          minRows={8}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요"
          className="mt-4 h-auto w-full resize-none overflow-hidden rounded-xl border bg-gray-50 p-5 text-base font-medium outline-none md:mt-6 md:p-6 md:text-lg"
        />
        <div className="mt-4 flex justify-end md:mt-6">
          <button className="w-full rounded-xl bg-blue-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-blue-600 md:w-auto md:py-3 md:text-lg">
            작성하기
          </button>
        </div>
      </form>
    </>
  );
}
