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

  // const { data } = useSingleAnswer(id, token);

  const data = {
    data: {
      // type: 'TEXT',
      // answers: [
      //   {
      //     applicationId: 1,
      //     name: '고선제',
      //     answer: '답변1',
      //   },
      //   {
      //     applicationId: 2,
      //     name: '고선제2',
      //     answer:
      //       '팬들이 2월 8일 브라이튼 & 호브 앨비언에게 1-2로 패한 FA컵 경기 이후 공격수 크리스토퍼 은쿠쿠에 대한 불만을 표출했다. 이번 패배로 첼시는 대회에서 탈락하게 되었으며, 아멕스 스타디움에서는 네 번째 라운드에서의 종료를 경험했다.니콜라스 잭슨과 마크 기우가 웨스트햄 유나이티드와의 이전 리그 경기에서 부상을 입으면서, 첼시의 엔조 마레스카 감독은 은쿠쿠에게 공격을 이끌도록 전적으로 의존해야 했다. 그러나 은쿠쿠는 90분 동안 별다른 활약을 보이지 않으며, 블루스의 부진한 경기력에 기여했다.',
      //   },
      // ],
      type: 'FILE',
      answers: [
        {
          applicationId: 1,
          name: '고선제',
          answer: 'url', // 이거 파일 url 보내겠습니다
        },
        {
          applicationId: 2,
          name: '고선제2',
          answer: 'url',
        },
      ],
    },
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {data?.data.answers.map((answer) => {
        return <ChartComponent answer={answer} />;
      })}
    </div>
  );
}

function FileList({ answer }: { answer: AnswerItem }) {
  //onClick시 다운로드
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

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      onClick={() => router.push(`${router.asPath}/${answer.applicationId}`)}
      readOnly
      className="block w-full rounded-xl border border-[#E5E7EB]  p-5 text-sm font-semibold text-[#6B7280] outline-none hover:cursor-pointer hover:border-[#3B82F6] hover:shadow-inner md:text-base"
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }}
    >
      {answer.answer}
    </textarea>
  );
}
