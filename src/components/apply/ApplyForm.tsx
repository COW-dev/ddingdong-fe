import React from 'react';
import ApplyContent from './ApplyContent';

export default function ApplyForm() {
  const formData = {
    title: '폼지 제목',
    description: '폼지 설명',
    formFields: [
      {
        fieldId: 1,
        question: '질문 1',
        type: 'RADIO',
        options: ['지문1', '지문2'],
        required: true,
        order: 1,
        section: '공통',
      },
      {
        fieldId: 2,
        question: '질문 2',
        type: 'TEXT',
        options: null,
        required: true,
        order: 2,
        section: '서버',
      },
      {
        fieldId: 3,
        question: '질문 3',
        type: 'CHECK_BOX',
        options: ['지문1', '지문2'],
        required: true,
        order: 3,
        section: '서버',
      },
    ],
  };

  return (
    <div>
      <div className="text-4xl font-bold text-gray-600">{formData.title}</div>
      <div className="py-2 text-lg font-semibold text-gray-400">
        {formData.description}
      </div>

      <div>
        {formData.formFields.map((data) => (
          <ApplyContent
            key={data.fieldId}
            type={data.type}
            options={data.options}
            required={data.required}
            fieldId={data.fieldId}
            question={data.question}
          />
        ))}
      </div>
    </div>
  );
}
