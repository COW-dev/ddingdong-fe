import React from 'react';
import FormBlock from '@/components/form/FormBlock';

export default function Index() {
  const data = [
    {
      formId: 1,
      title: '제목1',
      startDate: '2001-01-01',
      endDate: '2001-01-02',
      isActive: true,
    },
    {
      formId: 2,
      title: '제목2',
      startDate: '2001-01-01',
      endDate: '2001-01-02',
      isActive: false,
    },
    {
      formId: 3,
      title: '제목3',
      startDate: '2001-01-01',
      endDate: '2001-01-02',
      isActive: true,
    },
  ];

  return (
    <section className="p-6">
      <div className="mb-4 flex justify-between gap-4">
        <div className="flex items-center">
          <button className="px-4 py-2">전체({data.length})</button>
          <p>|</p>
          <button className="px-4 py-2">진행중</button>
          <p>|</p>
          <button className="px-4 py-2">종료</button>
        </div>

        <button className="mb-4 rounded-xl bg-blue-100 px-4 py-2 text-base font-semibold text-blue-500">
          생성하기
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((form) => (
          <FormBlock
            key={form.formId}
            title={form.title}
            startDate={form.startDate}
            endDate={form.endDate}
            isActive={form.isActive}
          />
        ))}
      </div>
    </section>
  );
}
