import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Datepicker from 'react-tailwindcss-datepicker';
import arrow_left from '@/assets/arrow_left.svg';
import BaseInput from '@/components/apply/BaseInput';
import CommonQuestion from '@/components/apply/CommnQuestion';
import Field from '@/components/apply/Field';
import FormEditButtons from '@/components/apply/FormEditButtons';
import Sections from '@/components/apply/Sections';
import TextArea from '@/components/apply/TextArea';
import { useFormStore } from '@/store/form';
import { FormState, FormField } from '@/types/form';
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
  const [formId, setFormId] = useState<string>('');

  const isPastStartDate = formData?.startDate
    ? new Date(formData.startDate) < new Date()
    : false;

  const {
    setServerForm,
    getForm,
    updateFormField,
    isModified,
    setMode,
    getMode,
    getFocusSection,
    setFocusSection,
    addField,
    createNewForm,
  } = useFormStore();

  useEffect(() => {
    if (id && formData) {
      const idStr = id.toString();
      setFormId(idStr);
      setServerForm(idStr, {
        title: formData.title ?? '',
        description: formData.description ?? '',
        hasInterview: formData.hasInterview ?? false,
        sections: formData.sections ?? ['공통'],
        startDate: formData.startDate ?? null,
        endDate: formData.endDate ?? null,
        formFields: formData.formFields ?? [],
      });
    } else if (!formData) {
      const tempId = createNewForm();
      setFormId(tempId);
    }
  }, [id, formData, setServerForm, createNewForm]);

  const formState = getForm(formId);
  const mode = getMode(formId);
  const focusSection = getFocusSection(formId);

  const isDisabled = mode === 'view' || isPastStartDate;
  const isEditableRegardlessOfPeriod = mode === 'view';

  const baseField: FormField = {
    section: focusSection,
    options: ['옵션1'],
    question: '',
    type: 'CHECK_BOX',
    required: true,
    order: 0,
  };

  const handleHasInterviewToggle = () => {
    updateFormField(formId, 'hasInterview', !formState?.hasInterview);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateFormField(formId, 'title', e.target.value);
  };

  const handleDateChange = (date: any) => {
    const formattedEndDate = new Date(date.endDate).toISOString().split('T')[0];
    updateFormField(formId, 'endDate', formattedEndDate);
    if (!isDisabled) {
      updateFormField(formId, 'startDate', date.startDate);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateFormField(formId, 'description', e.target.value);
  };

  const handleAddField = () => {
    addField(formId, baseField);
  };

  if (!formState || !formId) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

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
          setMode={(newMode) => {
            if (typeof newMode === 'function') {
              const updatedMode = newMode(mode);
              setMode(formId, updatedMode);
            } else {
              setMode(formId, newMode);
            }
          }}
          onReset={onReset ? onReset : () => undefined}
          formState={formState}
          id={id ? id : undefined}
          isPastStartDate={isPastStartDate}
          formId={formId}
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
        우리동아리는 면접을 보지 않아요!
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

          <div className="w-full rounded-lg border pt-1">
            <Datepicker
              value={{
                startDate: formState.startDate
                  ? new Date(formState.startDate)
                  : null,
                endDate: formState.endDate ? new Date(formState.endDate) : null,
              }}
              useRange={true}
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
          focusSection={focusSection}
          sections={formState.sections}
          setFocusSection={(section) => setFocusSection(formId, section)}
          isClosed={isDisabled}
          baseField={baseField}
          formId={formId}
        />
        {focusSection == '공통' && (
          <CommonQuestion disabled={true} formId={formId} />
        )}

        {formState.formFields
          .filter((field: FormField) => field.section === focusSection)
          .map((field) => {
            const actualIndex = formState.formFields.findIndex(
              (f) => f === field,
            );

            return (
              <div key={`${field.section}-${actualIndex}`}>
                <Field
                  key={`${field.section}-${actualIndex}`}
                  index={actualIndex}
                  focusSection={focusSection}
                  isClosed={isDisabled}
                  fieldData={field}
                  formId={formId}
                />
              </div>
            );
          })}
      </div>
      {!isDisabled && (
        <button
          onClick={handleAddField}
          className="fixed bottom-24 right-[calc(10vw)] flex items-center justify-center rounded-full bg-blue-500 p-1 shadow-lg transition-all duration-200 hover:bg-blue-600 md:right-[calc(5vw)] lg:right-[calc(2vw)]"
        >
          <Image src={AddForm} width={40} height={40} alt="질문 추가하기" />
        </button>
      )}
    </div>
  );
}
