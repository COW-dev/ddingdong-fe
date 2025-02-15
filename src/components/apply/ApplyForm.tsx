import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSubmitApply } from '@/hooks/api/apply/useSubmitApply';
import ApplyContent from './ApplyContent';
import CommonQuestion from './CommnQuestion';

interface FormData {
  data: {
    formFields: {
      id: string;
      type: string;
      options?: string[];
      required: boolean;
      question: string;
    }[];
  };
}

interface ApplyFormProps {
  formData: FormData;
  setStep: (step: string) => void;
}

interface RequiredQuestions {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
}

export default function ApplyForm({ formData, setStep }: ApplyFormProps) {
  const [questionData, setQuestionData] = useState(formData?.data);
  const router = useRouter();
  const { id } = router.query;

  const [requiredQuestions, setRequiredQuestions] = useState<
    RequiredQuestions | Partial<RequiredQuestions>
  >({
    name: '',
    studentNumber: '',
    department: '',
    // phoneNumber: '',
    // email: '',
  });

  const [formAnswers, setFormAnswers] = useState([]);

  const goSection = () => {
    setStep('SECTION');
  };

  // {
  //   "name": "김띵동",
  //   "studentNumber": "60200000",
  //   "department": "융합소프트웨어학부 응용소프트웨어전공",
  //   "formAnswers": [
  //     {
  //       "fieldId": 1,
  //       "value": [
  //         "string"
  //       ]
  //     }
  //   ]
  // }

  const [applyContent, setApplyContent] = useState({});
  const { mutate, isLoading } = useSubmitApply(id);

  useEffect(() => {
    setApplyContent({
      ...requiredQuestions,
      formAnswers,
    });
  }, [requiredQuestions, formAnswers]);

  console.log(applyContent, 'applyContent');
  const handleSubmit = () => {
    mutate(applyContent, {
      onSuccess: () => {
        setStep('SUBMITED');
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
          className="rounded-xl bg-blue-500 px-12 py-3 text-white hover:bg-blue-600"
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
