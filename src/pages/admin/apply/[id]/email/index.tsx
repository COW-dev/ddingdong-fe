import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { AlertCircle } from 'lucide-react';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  APPLICANT_PLACEHOLDER,
  EMAIL_OPTIONS,
  TEMPLATE,
} from '@/constants/apply';
import { useNewResultEmail } from '@/hooks/api/apply/useNewResultEmail';
import { ApplicantStatus } from '@/types/apply';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState<string>('');
  const [target, setTarget] = useState<ApplicantStatus>('SUBMITTED');
  const [message, setMessage] = useState<string>(TEMPLATE);

  const mutation = useNewResultEmail();

  const handleChangeTarget = (targetValue: string) => {
    setTarget(targetValue as ApplicantStatus);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!newValue.includes(APPLICANT_PLACEHOLDER)) {
      return;
    }
    setMessage(newValue);
  };

  const handleSubmit = () => {
    mutation.mutate({
      formId: Number(id),
      title,
      target: target,
      message: message,
      token,
    });
  };

  return (
    <div className="mt-7 flex flex-col items-start justify-between gap-3 md:gap-5">
      <div className="flex flex-col items-start justify-between gap-2">
        <h1 className="text-2xl font-bold md:text-4xl">
          지원 결과 이메일 전송
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 md:text-lg">
            전송대상을 선택하고, 전송할 내용을 작성해 주세요.
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle size={20} />
              </TooltipTrigger>
              <TooltipContent className="mt-3 h-16" side="bottom" align="start">
                <p className="whitespace-pre-line rounded-[10px] bg-blue-50 p-4 text-sm">
                  <strong>{`‘{지원자명}’`}</strong>
                  {`은 각 지원자의 이름으로 자동 변경되며, 수정이 불가합니다.\n필요할 경우 직접 `}
                  <strong>{`‘{지원자명}’`}</strong>
                  {`을 입력해 추가로 사용할 수 있습니다.`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Select
        onValueChange={(value) => handleChangeTarget(value as ApplicantStatus)}
      >
        <SelectTrigger className="mt-6 w-[135px] text-base font-semibold text-gray-500 focus:ring-0">
          <SelectValue placeholder="전송대상선택" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {EMAIL_OPTIONS.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="text-base font-semibold text-gray-500"
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="이메일 제목을 입력해 주세요."
        className="h-[52px] w-full rounded-xl border border-gray-200 bg-gray-100 p-4 text-base font-medium outline-none md:p-5 md:text-lg"
      />
      <TextareaAutosize
        name="content"
        value={message}
        onChange={handleChange}
        minRows={8}
        maxRows={15}
        placeholder="전송할 내용을 입력해 주세요."
        className="h-80 w-full resize-none rounded-xl border border-gray-200 bg-gray-100 p-4 text-base font-medium outline-none md:p-5 md:text-lg"
      />
      <div className="mt-2 flex w-full items-center justify-center gap-3 md:mt-6">
        <Link
          href={`/apply/${id}`}
          className="rounded-xl bg-gray-100 p-3 text-lg font-bold text-gray-500 transition-colors hover:bg-gray-200 md:w-auto md:p-4"
        >
          취소
        </Link>
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-blue-500 px-10 py-3 text-lg font-bold text-white hover:bg-blue-600 md:px-[60px] md:py-3.5"
        >
          전송하기
        </button>
      </div>
    </div>
  );
}
