import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Index() {
  const [content, setContent] = useState<string>('');

  return (
    <>
      <form className="mt-6 w-full md:mt-8">
        <TextareaAutosize
          spellCheck={false}
          className="w-full resize-none rounded-none border-b py-2 text-2xl font-bold outline-none placeholder:font-medium md:py-3 md:text-3xl"
          placeholder="제목을 입력해 주세요"
        />
        <TextareaAutosize
          minRows={8}
          spellCheck={false}
          placeholder="내용을 입력해 주세요"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="mt-4 h-auto w-full resize-none overflow-hidden rounded-xl border p-5 text-base font-medium outline-none md:mt-6 md:p-6 md:text-lg"
        />
        <div className="mt-4 flex justify-end md:mt-6">
          <button className="w-full rounded-xl bg-blue-100 px-4 py-4 font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5">
            작성하기
          </button>
        </div>
      </form>
    </>
  );
}
