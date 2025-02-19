import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import router from 'next/router';
import { useCookies } from 'react-cookie';
import File from '@/assets/file.svg';
import { AnswerItem, useSingleAnswer } from '@/hooks/api/apply/useSingleAnswer';

const componentMap = {
  TEXT: TextList,
  LONG_TEXT: TextList,
  FILE: FileList,
} as const;

type Props = {
  id: number;
  type: 'TEXT' | 'FILE' | 'LONG_TEXT';
};

export default function QuestionSingleContent({ type, id }: Props) {
  const [{ token }] = useCookies();
  const ChartComponent = componentMap[type];

  const { data } = useSingleAnswer(id, token);

  return (
    <div className="flex w-full flex-col gap-4">
      {data?.data.answers.map((answer, index) => {
        return <ChartComponent answer={answer} key={index} />;
      })}
    </div>
  );
}

function FileList({ answer }: { answer: AnswerItem }) {
  return (
    <label
      className="flex items-center rounded-xl border border-[#E5E7EB] p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      htmlFor="file_input"
    >
      <Image
        src={File}
        width={20}
        height={20}
        alt="file"
        className="my-2 ml-3 cursor-pointer"
      />
      <span className="ml-3">{answer.answer}</span>
    </label>
  );
}

function TextList({ answer }: { answer: AnswerItem }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [answer]);

  useEffect(() => {
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, []);

  const handleClick = () => {
    const { id } = router.query;
    router.push(`/apply/${id}/${answer.applicationId}`);
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      onClick={handleClick}
      readOnly
      className="block w-full rounded-xl border border-[#E5E7EB]  p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }}
      value={answer.answer}
    />
  );
}
