import React, { useState } from 'react';
import Image from 'next/image';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import BaseInput from '@/components/apply/BaseInput';
import CommonQuestion from '@/components/apply/CommnQuestion';
import Question from '@/components/apply/Question';
import Sections from '@/components/apply/Sections';
import TextArea from '@/components/apply/TextArea';
import AddForm from '../../assets/add_form.svg';
import square from '../../assets/checkbox.svg';
import emptySquare from '../../assets/empty_square_check.svg';
import { useNewForm } from '@/hooks/api/form/useNewForm';
import { useCookies } from 'react-cookie';
type Section = string;

type QuestionType = 'CHECK_BOX' | 'RADIO' | 'TEXT' | 'LONG_TEXT' | 'FILE';

interface FormField {
  question: string;
  type: QuestionType;
  options: string[] | null;
  required: boolean;
  order: number;
  section: Section;
}

interface FormData {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: Section[];
  formFields: FormField[];
}

interface Props {
  formData?: FormData;
}

export default function ManageForm({ formData }: Props) {
  const [{ token }] = useCookies(['token']);
  const newFormMutation = useNewForm(token);

  const handleSave = () => {
    const formatDate = (dateString: string | null) => {
      if (!dateString) return '';
      return new Date(dateString).toISOString().split('T')[0];
    };

    const formattedPostData: FormData = {
      title: title.trim(),
      description: description.trim() || null,
      startDate: formatDate(recruitPeriod.startDate),
      endDate: formatDate(recruitPeriod.endDate),
      hasInterview: isChecked,
      sections: sections,
      formFields: formField.flatMap((section) =>
        section.questions.map((question) => ({
          question: question.question.trim(),
          type: question.type,
          options: question.options ? question.options : null,
          required: question.required,
          order: question.order,
          section: section.section,
        })),
      ),
    };

    newFormMutation.mutate(formattedPostData);
  };

  const [isClosed, setIsClosed] = useState(
    formData?.startDate ? new Date(formData.startDate) < new Date() : false,
  );

  const [isChecked, setIsChecked] = useState(formData?.hasInterview);
  function categorizeFormFields(formData) {
    const categorizedFields = {};

    formData?.sections.forEach((section) => {
      categorizedFields[section] = [];
    });

    formData?.formFields.forEach((field) => {
      if (categorizedFields.hasOwnProperty(field.section)) {
        categorizedFields[field.section].push(field);
      }
    });

    return categorizedFields;
  }
  const [modiformField, setmodiFormField] = useState(
    Object.keys(categorizeFormFields(formData)).map((section) => ({
      section,
      questions: categorizeFormFields(formData)[section].map((field) => ({
        question: field.question,
        type: field.type,
        options: field.options || ['옵션1'],
        required: field.required,
        order: field.order,
      })),
    })),
  );

  const [focusSection, setFocusSection] = useState('공통');
  const [sections, setSections] = useState(
    formData ? formData.sections : ['공통'],
  );
  const [recruitPeriod, setRecruitPeriod] = useState<DateRangeType>({
    startDate: formData?.startDate || null,
    endDate: formData?.endDate || null,
  });

  const baseQuestion = [
    {
      question: '',
      type: 'RADIO',
      options: ['옵션1'],
      required: true,
      order: 1,
    },
  ];

  const [formField, setFormField] = useState(
    formData
      ? modiformField
      : [
          {
            section: '공통',
            questions: [
              {
                question: '',
                type: 'RADIO',
                options: ['옵션1'],
                required: true,
                order: 1,
              },
            ],
          },
        ],
  );

  console.log(formField);

  const [title, setTitle] = useState(formData?.title ? formData.title : '');
  const [description, setDescription] = useState(
    formData?.description ? formData.description : '',
  );

  const addQuestion = () => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === focusSection
          ? {
              ...section,
              questions: [
                ...section.questions,
                {
                  question: '',
                  type: 'RADIO',
                  options: ['옵션1'],
                  required: true,
                  order: section.questions.length + 1,
                },
              ],
            }
          : section,
      ),
    );
  };

  const handleDateChange = (newValue) => {
    setRecruitPeriod(newValue);
  };

  const deleteQuestion = (sectionName, questionIndex) => {
    setFormField((prev) =>
      prev.map((section) =>
        section.section === sectionName
          ? {
              ...section,
              questions: section.questions
                .filter((_, qIndex) => qIndex !== questionIndex)
                .map((question, newIndex) => ({
                  ...question,
                  order: newIndex + 1,
                })),
            }
          : section,
      ),
    );
  };

  const addSection = () => {
    const sectionName = prompt('새 섹션 이름을 입력하세요:');
    if (sectionName) {
      setSections((prev) => [...prev, sectionName]);
      setFormField((prev) => [
        ...prev,
        {
          section: sectionName,
          questions: baseQuestion.map((q) => ({ ...q })),
        },
      ]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-2">
        <button className="text-xl font-bold">지원서 템플릿 관리</button>
        {!isClosed && (
          <button
            className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-400"
            onClick={handleSave}
          >
            저장하기
          </button>
        )}
      </div>
      <div className="flex w-full items-center justify-end gap-1 pt-10 text-base font-semibold text-gray-500">
        <div className="relative flex h-[20px] w-[20px] cursor-pointer items-center justify-center">
          <Image
            onClick={() => {
              if (!isClosed) {
                setIsChecked(!isChecked);
              }
            }}
            src={isChecked ? square : emptySquare}
            width={isChecked ? 17 : 21}
            height={isChecked ? 17 : 21}
            className={`object-contain ${
              isClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            alt="checkBox"
          />
        </div>
        우리동아리는 면접을 보지 않아요!
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-row flex-wrap gap-3 md:flex-nowrap">
          <BaseInput
            type="text"
            placeholder={'지원서 제목을 입력해주세요'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isClosed}
          />
          <div className="w-full rounded-lg border">
            <Datepicker
              value={recruitPeriod}
              useRange={false}
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={handleDateChange}
              placeholder="모집 기간을 설정하세요"
              disabled={isClosed}
            />
          </div>
        </div>
        <TextArea
          placeholder="지원서 설명을 입력해 주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isClosed}
        />
      </div>

      <div className="mt-6">
        <Sections
          addSection={addSection}
          focusSection={focusSection}
          sections={sections}
          setFocusSection={setFocusSection}
          isClosed={isClosed}
        />
        {focusSection == '공통' && <CommonQuestion disabled={true} />}

        {formField
          .filter((item) => item.section === focusSection)
          .map((section) => (
            <div key={section.section}>
              {section.questions.map((question, qIndex) => (
                <Question
                  key={`${section.section}-${qIndex}`}
                  index={qIndex}
                  questionData={question}
                  deleteQuestion={() => deleteQuestion(section.section, qIndex)}
                  setFormField={setFormField}
                  section={section}
                  isClosed={isClosed}
                />
              ))}
            </div>
          ))}
      </div>

      <button
        onClick={addQuestion}
        className="fixed bottom-24 right-12 flex items-center justify-center rounded-full bg-blue-500 p-1 shadow-lg transition-all duration-200 hover:bg-blue-600"
      >
        <Image src={AddForm} width={27} height={27} alt="폼추가하기" />
      </button>
    </div>
  );
}
