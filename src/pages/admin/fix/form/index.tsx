import React, { useState } from 'react';
import ManageForm from '@/components/form/ManageForm';

export default function Index() {
  const formData = {
    title: '카우 동아리 4기 모집', // required && not null
    description: '드루와?', // nullable
    startDate: '2001-01-01', // required && not null
    endDate: '2001-01-02', // required && not null
    hasInterview: true, // required && not null
    sections: ['공통', '서버'],
    formFields: [
      {
        question: '질문 2',
        type: '객관식',
        options: null,
        required: true,
        order: 1,
        section: '공통',
      },
      {
        question: '질문 1',
        type: '체크박스',
        options: ['지문1', '지문2'],
        required: true,
        order: 1,
        section: '서버',
      },
      {
        question: '질문 2',
        type: '객관식',
        options: null,
        required: true,
        order: 1,
        section: '서버',
      },
      {
        question: '질문 3',
        type: '체크박스',
        options: ['지문1', '지문2'],
        required: true,
        order: 1,
        section: '서버',
      },
      {
        question: '질문 3',
        type: '체크박스',
        options: ['지문1', '지문2'],
        required: true,
        order: 1,
        section: '서버',
      },
    ],
  };

  function categorizeFormFields(formData) {
    const categorizedFields = {};

    formData.sections.forEach((section) => {
      categorizedFields[section] = [];
    });

    formData.formFields.forEach((field) => {
      if (categorizedFields.hasOwnProperty(field.section)) {
        categorizedFields[field.section].push(field);
      }
    });

    return categorizedFields;
  }

  const [formField, setFormField] = useState(
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

  return (
    <div>
      <ManageForm formData={formData} />
    </div>
  );
}
