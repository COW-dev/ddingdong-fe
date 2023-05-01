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
          className="w-full resize-none border-b py-2 text-xl font-bold outline-none placeholder:font-medium md:py-3 md:text-2xl"
          placeholder="제목을 입력해주세요"
        />
        <TextareaAutosize
          minRows={8}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요"
          className="mt-4 h-auto w-full resize-none overflow-hidden rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-base font-medium outline-none md:mt-6 md:px-6 md:py-5 md:text-lg"
        />
        <div className="mt-4 flex justify-end md:mt-6"></div>
      </form>
    </>
  );
}
