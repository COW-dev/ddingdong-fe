import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Datepicker from 'react-tailwindcss-datepicker';
import arrow_left from '@/assets/arrow_left.svg';
import BaseInput from '@/components/apply/BaseInput';
import CommonQuestion from '@/components/apply/CommnQuestion';
import Field from '@/components/apply/Field';
import Sections from '@/components/apply/Sections';
import TextArea from '@/components/apply/TextArea';
import { FormState, FormField } from '@/types/form';
import FormEditButtons from './FormEditButtons';
import AddForm from '../../assets/add_form.svg';
import square from '../../assets/checkbox.svg';
import emptySquare from '../../assets/empty_square_check.svg';
import Heading from '../common/Heading';

type ManageFormType = {
  formData?: FormState;
  id?: number;
  onReset?: () => void;
};

export default function ManageForm({ formData, id, onReset }: ManageFormType) {
  const router = useRouter();

  const isPastStartDate = formData?.startDate
    ? new Date(formData.startDate) < new Date()
    : false;

  const [mode, setMode] = useState<'view' | 'edit'>(
    formData == undefined ? 'edit' : 'view',
  );

  const isDisabled = mode === 'view' || isPastStartDate;

  const isEditableRegardlessOfPeriod = mode === 'view';

  const [focusSection, setFocusSection] = useState('공통');
  const baseField: FormField = {
    section: focusSection,
    options: ['옵션1'],
    question: '',
    type: 'CHECK_BOX',
    required: true,
    order: 0,
  };

  const [formState, setFormState] = useState<FormState>({
    title: formData?.title ?? '',
    description: formData?.description ?? '',
    hasInterview: formData?.hasInterview ?? false,
    sections: formData?.sections ?? ['공통'],
    startDate: formData?.startDate ?? null,
    endDate: formData?.endDate ?? null,
    formFields: formData?.formFields ?? [],
  });

  const handleHasInterviewToggle = () => {
    setFormState((prevState) => ({
      ...prevState,
      hasInterview: !prevState.hasInterview,
    }));
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormState((prevState) => ({
      ...prevState,
      startDate: date.startDate,
      endDate: date.endDate,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const addField = () => {
    const newField: FormField = {
      ...baseField,
      order: formState.formFields.length + 1,
    };

    setFormState((prevState) => ({
      ...prevState,
      formFields: [...prevState.formFields, newField],
    }));
  };

  const deleteField = (section: string, index: number) => {
    setFormState((prevState) => ({
      ...prevState,
      formFields: prevState.formFields.filter(
        (field) =>
          !(
            field.section === section &&
            prevState.formFields.indexOf(field) === index
          ),
      ),
    }));
  };

  console.log(formState, 'formState^^');

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
          formData={formData ? formData : undefined}
          mode={mode}
          setMode={setMode}
          onReset={onReset ? onReset : () => undefined}
          formState={formState}
          id={id ? id : undefined}
        />
      </div>

      <div
        className={`flex w-full items-center justify-end gap-2 pt-10 text-lg font-semibold ${
          isDisabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-500'
        }`}
      >
        <div
          className={`relative flex h-[20px] w-[20px] items-center justify-center ${
            isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <Image
            onClick={() => {
              if (!isDisabled) {
                handleHasInterviewToggle();
              }
            }}
            src={formState.hasInterview ? square : emptySquare}
            width={formState.hasInterview ? 18 : 22}
            height={formState.hasInterview ? 18 : 22}
            className={`object-contain ${
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            alt="checkBox"
          />
        </div>
        우리 동아리는 면접을 봐요!
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-row flex-wrap gap-3 md:flex-nowrap">
          <BaseInput
            type="text"
            placeholder={'지원서 제목을 입력해주세요'}
            value={formState.title}
            onChange={handleTitleChange}
            disabled={isDisabled}
          />

          <div className="h-fit w-full rounded-lg border py-0.5">
            <Datepicker
              value={{
                startDate: formState.startDate,
                endDate: formState.endDate,
              }}
              useRange={false}
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onChange={handleDateChange}
              placeholder="모집 기간을 설정하세요"
              disabled={isEditableRegardlessOfPeriod}
            />
          </div>
        </div>
        <TextArea
          placeholder="지원서 설명을 입력해 주세요 (최대 255자 이내)"
          value={formState.description}
          onChange={handleDescriptionChange}
          disabled={isDisabled}
        />
      </div>

      <div className="mt-6">
        <Sections
          setFormState={setFormState}
          focusSection={focusSection}
          sections={formState.sections}
          setFocusSection={setFocusSection}
          isClosed={isDisabled}
          formState={formState}
          baseField={baseField}
        />
        {focusSection == '공통' && <CommonQuestion disabled={true} />}

        {formState.formFields
          .filter((field: FormField) => field.section === focusSection)
          .map((field, index) => {
            return (
              <div key={`${field.section}-${index}`}>
                <Field
                  key={`${field.section}-${index}`}
                  index={index}
                  deleteQuestion={() => deleteField(field.section, index)}
                  setFormState={setFormState}
                  focusSection={focusSection}
                  isClosed={isDisabled}
                  fieldData={field}
                />
              </div>
            );
          })}
      </div>
      {!isDisabled && (
        <button
          onClick={addField}
          className="fixed bottom-24 right-[calc(10vw)] flex items-center justify-center rounded-full bg-blue-500 p-1 shadow-lg transition-all duration-200 hover:bg-blue-600 md:right-[calc(5vw)] lg:right-[calc(2vw)]"
        >
          <Image src={AddForm} width={40} height={40} alt="질문 추가하기" />
        </button>
      )}
    </div>
  );
}
