import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import JSConfetti from 'js-confetti';
import Warning from '@/assets/warning.svg';
import ApplyForm from '@/components/apply/ApplyForm';
import { useAllSections } from '@/hooks/api/apply/useAllSections';
import { useFormDetail } from '@/hooks/api/apply/useFormDetail';
import Check from '../../../assets/check.svg';
import FilledCircle from '../../../assets/check_form.svg';
import EmptyCircle from '../../../assets/empty-circle-check.svg';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export default function IndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const formId = id && !isNaN(Number(id)) ? Number(id) : 0;

  const { data: sectionsData, isLoading } = useAllSections(formId);
  const [selectedRadio, setSelectedRadio] = useState<string>('');
  const [step, setStep] = useState<'SECTION' | 'QUESTION' | 'SUBMITTED'>(
    'SECTION',
  );
  const today = dayjs();

  const isActive =
    sectionsData?.data?.startDate &&
    sectionsData?.data?.endDate &&
    dayjs(sectionsData.data.startDate).isValid() &&
    dayjs(sectionsData.data.endDate).isValid() &&
    today.isBetween(
      dayjs(sectionsData.data.startDate),
      dayjs(sectionsData.data.endDate).endOf('day'),
      'second',
      '[]',
    );

  const sections = useMemo(
    () => sectionsData?.data?.sections || [],
    [sectionsData],
  );

  useEffect(() => {
    if (!isLoading) {
      if (sections && sections.length > 2) {
        setStep('SECTION');
      } else {
        setStep('QUESTION');
        setSelectedRadio('공통');
      }
    }
  }, [sections, isLoading]);

  const { data: questionData, refetch } = useFormDetail(formId, selectedRadio);
  useEffect(() => {
    if (selectedRadio) {
      refetch();
    }
  }, [selectedRadio, refetch]);

  const goBack = () => {
    router.back();
  };

  const onClickNext = () => {
    if (!selectedRadio) {
      alert('지원 분야를 선택해주세요!');
      return;
    }
    setStep('QUESTION');
  };

  return (
    <div>
      {!isLoading ? (
        isActive ? (
          <div>
            {(step === 'SECTION' || step === 'QUESTION') && (
              <div className="pb-6">
                <div className="py-5 pt-10 text-4xl font-bold text-gray-800">
                  {sectionsData?.data?.title}
                </div>
                <div className="whitespace-pre-wrap py-2 text-lg font-semibold text-gray-500">
                  {sectionsData?.data?.description}
                </div>
              </div>
            )}
            {step === 'SECTION' && (
              <div className="flex w-full flex-col justify-center">
                <SelectSection
                  sections={sections}
                  setSelectedRadio={setSelectedRadio}
                  selectedRadio={selectedRadio}
                />
                <div className="flex w-full justify-center gap-3 py-10 text-lg font-bold">
                  <button
                    onClick={goBack}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
                  >
                    취소
                  </button>
                  <button
                    onClick={onClickNext}
                    className="rounded-lg bg-blue-100 px-5 py-2 text-blue-500 hover:bg-blue-200"
                  >
                    다음
                  </button>
                </div>
              </div>
            )}
            {step === 'QUESTION' && (
              <div>
                {questionData && (
                  <ApplyForm
                    formData={questionData}
                    setStep={setStep}
                    sections={sections}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="justify-centerpb-20 flex flex-col items-center gap-6 pt-10 text-center">
            <div className="m-2 rounded-full bg-red-500 p-2 pb-2.5">
              <Image src={Warning} alt="warning" width={50} />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              현재 지원 기간이 아닙니다.
            </p>
            <p className="text-lg font-semibold text-gray-600">
              지원 가능 기간: {sectionsData?.data?.startDate} ~{' '}
              {sectionsData?.data?.endDate}
            </p>
          </div>
        )
      ) : (
        <div className="flex h-screen items-center justify-center"></div>
      )}

      {step === 'SUBMITTED' && (
        <div>
          <Submitted
            applicationCount={questionData?.data.applicationCount}
            clubName={questionData?.data.clubName}
          />
        </div>
      )}
    </div>
  );
}

interface SectionsProps {
  sections: string[];
  selectedRadio: string;
  setSelectedRadio: (value: string) => void;
}

export function SelectSection({
  sections,
  selectedRadio,
  setSelectedRadio,
}: SectionsProps) {
  return (
    <div className="flex flex-col items-start rounded-xl border px-6 py-5 pb-5">
      <div className="px-2 py-2 text-xl font-bold text-blue-500">
        지원분야를 선택해주세요.
      </div>
      {sections?.map(
        (opt, i) =>
          opt !== '공통' && (
            <div
              key={i}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 md:hover:bg-gray-100"
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

interface SubmittedProps {
  applicationCount: number;
  clubName: string;
}

export function Submitted({ applicationCount, clubName }: SubmittedProps) {
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
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <div className="p-10">
        <Image src={Check} alt="checkIcon" width={70} />
      </div>
      <div className="flex w-full flex-col items-center gap-4 py-2 text-center">
        <div className="text-4xl font-bold text-gray-700">
          지원서 제출이 완료되었습니다!
        </div>
        <p className="w-1/2">
          {clubName}에 지원해주셔서 감사합니다!
          <p>
            현재까지 {clubName} 지원자는 {applicationCount + 1}명입니다.
          </p>
        </p>
      </div>
    </div>
  );
}
