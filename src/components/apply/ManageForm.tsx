import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import arrow_left from '@/assets/arrow_left.svg';
import BaseInput from '@/components/apply/BaseInput';
import CommonQuestion from '@/components/apply/CommnQuestion';
import Question from '@/components/apply/Question';
import Sections from '@/components/apply/Sections';
import TextArea from '@/components/apply/TextArea';
import { useNewForm } from '@/hooks/api/apply/useNewForm';
import { useUpdateForm } from '@/hooks/api/apply/useUpdateForm';
import {
  FormData,
  QuestionType,
  SectionFormField,
  FormField,
} from '@/types/form';
import FormEditButtons from './FormEditButtons';
import AddForm from '../../assets/add_form.svg';
import square from '../../assets/checkbox.svg';
import emptySquare from '../../assets/empty_square_check.svg';
import Heading from '../common/Heading';

interface Props {
  formData?: FormData;
  id?: number;
  onReset?: () => void;
}
interface CategorizedFields {
  [key: string]: FormField[];
}

export default function ManageForm({ formData, id, onReset }: Props) {
  const router = useRouter();
  const [{ token }] = useCookies(['token']);
  const newFormMutation = useNewForm(token);
  const [isEditing, setIsEditing] = useState(false);
  const updateFormMutation = useUpdateForm(setIsEditing);

  const [title, setTitle] = useState(formData?.title ? formData.title : '');
  const [description, setDescription] = useState(
    formData?.description ? formData.description : '',
  );

  useEffect(() => {
    if (formData) {
      const updatedFormFields = Object.keys(categorizeFormFields(formData)).map(
        (section) => ({
          section,
          questions: categorizeFormFields(formData)[section].map((field) => ({
            question: field.question,
            type: field.type,
            options: field.options || [],
            required: field.required,
            order: field.order,
            section: field.section,
          })),
        }),
      );

      setFormField(updatedFormFields);
    }
  }, [formData]);

  const handleCreateForm = () => {
    if (!title) {
      toast.error('지원서 제목을 입력하여주세요. ');
    }

    if (!description || description.length > 255) {
      toast.error('지원서 설명은 255자 이내로 작성하여주세요.');
      return;
    }

    const formattedPostData = formatFormData();
    newFormMutation.mutate(formattedPostData);
  };

  const handleUpdateForm = () => {
    if (!id || !formData) {
      toast.error('수정할 폼이 존재하지 않습니다.');
      return;
    }
    if (!title) {
      toast.error('지원서 제목을 입력하여주세요. ');
    }

    if (!description || description.length > 255) {
      toast.error('지원서 설명은 255자 이내로 작성하여주세요.');
      return;
    }

    const formattedPostData = formatFormData();

    updateFormMutation.mutate({
      token,
      formId: id,
      formData: formattedPostData,
    });
    setIsEditing(false);
    setIsClosed(true);
  };

  const formatFormData = (): FormData => {
    const formatDate = (date: Date | string | null) => {
      if (!date) return '';
      if (date instanceof Date) return date.toISOString().split('T')[0];
      return new Date(date).toISOString().split('T')[0];
    };

    return {
      title: title.trim(),
      description: description.trim() || null,
      startDate: formatDate(recruitPeriod.startDate),
      endDate: formatDate(recruitPeriod.endDate),
      hasInterview: isChecked ?? false,
      sections: sections,
      formFields: formField.flatMap((section) =>
        section.questions.map(
          (question): FormField => ({
            question: question.question.trim(),
            type: question.type as QuestionType,
            options: question.options || [],
            required: question.required,
            order: question.order,
            section: section.section,
          }),
        ),
      ),
    };
  };

  const isPastStartDate = formData?.startDate
    ? new Date(formData.startDate).setHours(0, 0, 0, 0) <=
      new Date().setHours(0, 0, 0, 0)
    : false;

  const [isClosed, setIsClosed] = useState(formData ? true : false);

  const [isChecked, setIsChecked] = useState(formData?.hasInterview);

  function categorizeFormFields(
    formData: FormData | undefined,
  ): CategorizedFields {
    const categorizedFields: CategorizedFields = {};

    (formData?.sections || []).forEach((section) => {
      categorizedFields[section] = [];
    });

    (formData?.formFields || []).forEach((field) => {
      if (field.section in categorizedFields) {
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
        section,
      })),
    })),
  );

  const [focusSection, setFocusSection] = useState('공통');
  const [sections, setSections] = useState(
    formData ? formData.sections : ['공통'],
  );
  const [recruitPeriod, setRecruitPeriod] = useState<DateRangeType>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (formData) {
      setRecruitPeriod({
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        endDate: formData.endDate ? new Date(formData.endDate) : null,
      });
    }
  }, [formData]);

  const baseQuestion: FormField[] = [
    {
      question: '',
      type: 'RADIO',
      options: ['옵션1'],
      required: true,
      order: 1,
      section: '공통',
    },
  ];

  const [formField, setFormField] = useState<SectionFormField[]>(
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
                section: '공통',
              },
            ],
          },
        ],
  );

  const handleDateChange = (newValue: DateRangeType | null) => {
    setRecruitPeriod(newValue ?? { startDate: null, endDate: null });
  };

  const deleteQuestion = (sectionName: string, questionIndex: number) => {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  const handleOpenModal = () => {
    setNewSectionName('');
    setModalVisible(true);
  };

  const onClickEditButton = () => {
    setIsEditing(true);
    setIsClosed(false);
  };

  const onClickCancelButton = () => {
    onReset?.();
  };

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
                  section: focusSection,
                },
              ],
            }
          : section,
      ),
    );
  };

  return (
    <div>
      <Head>
        <title>지원서 템플릿 관리</title>
      </Head>

      <div className="flex items-center justify-between gap-2">
        <div
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-1 "
        >
          <Image
            src={arrow_left}
            alt="navigation"
            className="mt-7 w-6 md:mt-11 md:w-9"
          />
          <Heading>지원서 생성</Heading>
        </div>
        <FormEditButtons
          formData={formData}
          isEditing={isEditing}
          isClosed={isClosed}
          isPastStartDate={isPastStartDate}
          handleCreateForm={handleCreateForm}
          onClickEditButton={onClickEditButton}
          onClickCancelButton={onClickCancelButton}
          handleUpdateForm={handleUpdateForm}
        />
      </div>

      <div className="flex w-full items-center justify-end gap-2 pt-10 text-lg font-semibold text-gray-500">
        <div className="relative flex h-[20px] w-[20px] cursor-pointer items-center justify-center">
          <Image
            onClick={() => {
              if (!isClosed) {
                setIsChecked(!isChecked);
              }
            }}
            src={isChecked ? square : emptySquare}
            width={isChecked ? 18 : 22}
            height={isChecked ? 18 : 22}
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
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setTitle(e.target.value)}
            disabled={isClosed}
          />

          <div className="w-full rounded-lg border pt-1">
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
          placeholder="지원서 설명을 입력해 주세요 (최대 255자 이내)"
          value={description}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
          ) => setDescription(e.target.value)}
          disabled={isClosed}
        />
      </div>

      <div className="mt-6">
        <Sections
          addSection={handleOpenModal}
          focusSection={focusSection}
          sections={sections}
          setFocusSection={setFocusSection}
          isClosed={isClosed}
          formField={formField}
          setFormField={setFormField}
          setSections={setSections}
          baseQuestion={baseQuestion}
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
      {!isClosed && (
        <button
          onClick={addQuestion}
          className="fixed bottom-24 right-[calc(10vw)] flex items-center justify-center rounded-full bg-blue-500 p-1 shadow-lg transition-all duration-200 hover:bg-blue-600 md:right-[calc(5vw)] lg:right-[calc(2vw)]"
        >
          <Image src={AddForm} width={40} height={40} alt="질문 추가하기" />
        </button>
      )}
    </div>
  );
}
