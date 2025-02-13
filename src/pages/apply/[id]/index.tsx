import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import JSConfetti from 'js-confetti';
import ApplyForm from '@/components/apply/ApplyForm';
import { useAllSections } from '@/hooks/api/apply/useAllSections';
import Check from '../../../assets/check.svg';
import FilledCircle from '../../../assets/check_form.svg';
import EmptyCircle from '../../../assets/empty-circle-check.svg';

export default function IndexPage() {
  const router = useRouter();
  const { id } = router.query;

  const parsedId: number | undefined = (() => {
    if (Array.isArray(id)) return parseInt(id[0], 10);
    if (typeof id === 'string') return parseInt(id, 10);
  })();

  const { data: sectionsData, isLoading } = useAllSections(parsedId ?? -1);
  const [step, setStep] = useState<
    'SECTION' | 'QUESTION' | 'SUBMITED' | '로딩'
  >('로딩');

  useEffect(() => {
    if (!isLoading && sectionsData) {
      const sections = sectionsData?.data?.sections || [];
      if (sections.length > 2) {
        setStep('QUESTION');
      } else {
        setStep('QUESTION');
      }
    }
  }, [sectionsData, isLoading]);
  console.log(sectionsData);

  return (
    <div>
      <div>
        {step === 'SECTION' ||
          (step == 'QUESTION' && (
            <div className="pb-6">
              <div className="py-5 pt-10 text-4xl font-bold text-gray-800">
                {sectionsData?.data?.title}
              </div>
              <div className="whitespace-pre-wrap py-2 text-base font-semibold text-gray-500">
                {sectionsData?.data?.description}
              </div>
            </div>
          ))}
        {step === 'SECTION' && (
          <div className="flex w-full flex-col justify-center">
            <SelectSection sections={sectionsData?.data?.sections} />
            <div className="flex w-full justify-center gap-3 py-10 font-bold">
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-50">
                취소
              </button>
              <button className="rounded-lg bg-blue-100 px-5 py-2 text-blue-500 ">
                다음
              </button>
            </div>
          </div>
        )}
        {step === 'QUESTION' && (
          <div>
            <ApplyForm />
            <div className="flex w-full justify-center gap-3 py-10 font-bold">
              <button className="rounded-xl bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-50">
                취소
              </button>
              <button className="rounded-xl bg-blue-500 px-10 py-2 text-white ">
                제출하기
              </button>
            </div>
          </div>
        )}
      </div>
      {step === 'SUBMITED' && <Submited />}
    </div>
  );
}

interface SectionsProps {
  sections: string[];
}

export function SelectSection({ sections }: SectionsProps) {
  const [selectedRadio, setSelectedRadio] = useState<string>('');

  return (
    <div className="flex flex-col items-start rounded-xl border px-6 py-5 pb-5">
      <div className="px-2 py-2 text-xl font-bold text-blue-500">
        지원분야를 선택해주세요.
      </div>
      {sections.map(
        (opt, i) =>
          opt !== '공통' && (
            <div
              key={i}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-100"
              onClick={() => setSelectedRadio(opt)}
            >
              <div className="relative flex h-6 w-6 items-center justify-center">
                <Image
                  src={EmptyCircle}
                  alt="radio 기본"
                  width={24}
                  height={24}
                  className="duration-600 h-6 w-6 scale-100 transition-all ease-in-out"
                />
                {selectedRadio === opt && (
                  <Image
                    src={FilledCircle}
                    alt="radio 선택됨"
                    width={24}
                    height={24}
                    className="duration-400 absolute h-6 w-6 scale-90 opacity-100 transition-transform ease-out"
                  />
                )}
              </div>

              <span
                className={`py-1 text-base font-semibold transition-all duration-300 ${
                  selectedRadio === opt ? 'text-gray-800' : 'text-gray-500'
                }`}
              >
                {opt}
              </span>
            </div>
          ),
      )}
    </div>
  );
}

export function Submited() {
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#f9bec7',
        '#FFA500',
        '#FF8C42',
        '#FFB347',
        '#FFD700',
        '#FFEC8B',
        '#FFFACD',
      ],
      confettiRadius: 3,
    });
  });

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="p-10">
        <Image src={Check} alt="checkIcon" width={70} />
      </div>
      <div className="flex w-full flex-col items-center gap-4 py-2 text-center">
        <div className="text-4xl font-bold text-gray-700">
          지원서 제출이 완료되었습니다!
        </div>
        <p className="w-1/3">
          ~~ 동아리에 지원해주셔서 감사합니다! 현재까지 ~~ 동아리 지원자는
          N명입니다.
        </p>
      </div>
    </div>
  );
}
