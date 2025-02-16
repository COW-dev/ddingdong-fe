import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useSubmitApply } from '@/hooks/api/apply/useSubmitApply';
import ApplyContent from './ApplyContent';
import CommonQuestion from './CommnQuestion';

interface FormData {
  data: {
    formFields: {
      id: string;
      type: 'CHECK_BOX' | 'RADIO' | 'LONG_TEXT' | 'TEXT' | 'FILE';
      options?: string[];
      required: boolean;
      question: string;
    }[];
  };
}
interface ApplyFormProps {
  formData: any;
  setStep: React.Dispatch<
    React.SetStateAction<'SECTION' | 'QUESTION' | 'SUBMITTED'>
  >;
  sections: any;
}
interface RequiredQuestions {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
}

export default function ApplyForm({
  sections,
  formData,
  setStep,
}: ApplyFormProps) {
  const [questionData, setQuestionData] = useState(formData?.data);
  const router = useRouter();
  const { id } = router.query;

  const [requiredQuestions, setRequiredQuestions] = useState<
    RequiredQuestions | Partial<RequiredQuestions>
  >({
    name: '',
    studentNumber: '',
    department: '',
    phoneNumber: '',
    email: '',
  });

  const [formAnswers, setFormAnswers] = useState([]);

  const goSection = () => {
    if (sections.length > 2) {
      setStep('SECTION');
    } else {
      router.back();
    }
  };

  const [applyContent, setApplyContent] = useState<{ formAnswers: any[] }>({
    formAnswers: [],
  });
  const { mutate, isLoading } = useSubmitApply(Number(id));

  useEffect(() => {
    setApplyContent({
      ...requiredQuestions,
      formAnswers,
    });
  }, [requiredQuestions, formAnswers]);

  const handleSubmit = () => {
    const requiredFields = formData.data.formFields.filter(
      (field) => field.required,
    );

    for (const field of requiredFields) {
      const answer = applyContent.formAnswers.find(
        (ans) => ans.fieldId === field.id,
      );

      if (
        !answer ||
        !answer.value ||
        (Array.isArray(answer.value) && answer.value.length === 0)
      ) {
        toast.error(`필수 항목을 입력하여 주세요`);
        return;
      }
    }

    mutate(applyContent, {
      onSuccess: () => {
        setStep('SUBMITTED');
      },
    });
  };

  return (
    <div>
      <CommonQuestion
        disabled={false}
        requiredQuestions={{
          name: requiredQuestions.name || '',
          studentNumber: requiredQuestions.studentNumber || '',
          department: requiredQuestions.department || '',
          phoneNumber: requiredQuestions.phoneNumber || '',
          email: requiredQuestions.email || '',
        }}
        setRequiredQuestions={setRequiredQuestions}
      />

      {questionData?.formFields?.map((field) => (
        <ApplyContent
          key={field.id}
          fieldId={field.id}
          type={field.type}
          options={field.options ?? []}
          required={field.required}
          question={field.question}
          formAnswers={formAnswers}
          setFormAnswers={setFormAnswers}
        />
      ))}
      <div className="flex w-full justify-center gap-3 py-6 font-bold">
        <button
          onClick={goSection}
          className="rounded-xl bg-gray-100 px-4 py-2 text-gray-500 hover:bg-gray-200"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-blue-500 px-16 py-3 text-lg text-white hover:bg-blue-600"
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
