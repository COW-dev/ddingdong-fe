import React, { useState } from 'react';
import Image from 'next/image';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import BaseInput from '@/components/form/BaseInput';
import CommonQuestion from '@/components/form/CommonQuestion';
import Question from '@/components/form/Question';
import Sections from '@/components/form/Sections';
import TextArea from '@/components/form/TextArea';
import AddForm from '../../../../assets/add_form.svg';

export default function FormPage() {
  const [focusSection, setFocusSection] = useState('공통');
  const [sections, setSections] = useState(['공통']);
  const [recruitPeriod, setRecruitPeriod] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  });

  const baseQuestion = [
    {
      question: '',
      type: '객관식',
      options: ['옵션1'],
      required: true,
      order: 1,
    },
  ];

  const [formField, setFormField] = useState([
    {
      section: '공통',
      questions: [
        {
          question: '',
          type: '객관식',
          options: ['옵션1'],
          required: true,
          order: 1,
        },
      ],
    },
  ]);

  console.log(formField);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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
                  type: '객관식',
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
        <button className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-400">
          저장하기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-row gap-3">
          <BaseInput
            type="text"
            placeholder={'지원서 제목을 입력해주세요'}
            value={title}
          />
          <div className="w-[75%] rounded-lg border">
            <Datepicker
              value={recruitPeriod}
              useRange={false}
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={handleDateChange}
              placeholder="모집 기간을 설정하세요"
            />
          </div>
        </div>
        <TextArea
          placeholder="지원서 설명을 입력해 주세요"
          value={description}
        />
      </div>

      <div className="mt-6">
        <Sections
          addSection={addSection}
          focusSection={focusSection}
          sections={sections}
          setFocusSection={setFocusSection}
        />
        {focusSection == '공통' && <CommonQuestion />}

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
