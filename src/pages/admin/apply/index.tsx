import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import FormBlock from '@/components/apply/FormBlock';
import Heading from '@/components/common/Heading';
import { useAllForms } from '@/hooks/api/apply/useAdminAllForms';
import { FormBlockData } from '@/types/form';

export default function Index() {
  const router = useRouter();
  const [{ token }] = useCookies(['token']);
  const { data, isLoading, error } = useAllForms(token);

  const forms: FormBlockData[] = data?.data || [];

  const formCounts = {
    전체: forms.length,
    '진행 전': forms.filter((form) => form.formStatus === '진행 전').length,
    '진행 중': forms.filter((form) => form.formStatus === '진행 중').length,
    마감: forms.filter((form) => form.formStatus === '마감').length,
  };

  const [formFilter, setFormFilter] = useState<keyof typeof formCounts>('전체');

  const getFilteredForms = () => {
    return formFilter === '전체'
      ? forms
      : forms.filter((form) => form.formStatus === formFilter);
  };

  const handleClickFormBlock = (formId: number) => {
    router.push(`/apply/${formId}`);
  };

  return (
    <>
      <Head>
        <title>지원서 관리</title>
      </Head>
      <div className="flex items-center justify-between">
        <Heading>지원서 관리</Heading>
        <button
          onClick={() => router.push('/apply/new')}
          className="mt-7 rounded-xl bg-blue-100 px-4 py-2 text-lg font-semibold text-blue-500 hover:bg-blue-200"
        >
          생성하기
        </button>
      </div>
      {!isLoading && (
        <div className="mb-4 mt-10 flex items-center gap-2">
          <FilterButton
            label="전체"
            count={formCounts.전체}
            selected={formFilter}
            onClick={(filter) =>
              setFormFilter(filter as keyof typeof formCounts)
            }
          />
          <p className="font-semibold text-gray-400">|</p>
          <FilterButton
            label="진행전"
            count={formCounts['진행 전']}
            selected={formFilter}
            onClick={(filter) =>
              setFormFilter(filter as keyof typeof formCounts)
            }
          />
          <p className="font-semibold text-gray-400">|</p>
          <FilterButton
            label="진행중"
            count={formCounts['진행 중']}
            selected={formFilter}
            onClick={(filter) =>
              setFormFilter(filter as keyof typeof formCounts)
            }
          />
          <p className="font-semibold text-gray-400">|</p>
          <FilterButton
            label="종료"
            count={formCounts.마감}
            selected={formFilter}
            onClick={(filter) =>
              setFormFilter(filter as keyof typeof formCounts)
            }
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {getFilteredForms()
          .slice()
          .reverse()
          .map((form) => (
            <FormBlock
              key={form.formId}
              {...form}
              onClick={() => handleClickFormBlock(form.formId)}
            />
          ))}
      </div>
    </>
  );
}

function FilterButton({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: string;
  onClick: (filter: string) => void;
}) {
  const getFilterValue = (label: string) => {
    if (label === '진행전') return '진행 전';
    if (label === '진행중') return '진행 중';
    if (label === '종료') return '마감';
    return label;
  };

  return (
    <button
      onClick={() => {
        const filterValue = getFilterValue(label);
        onClick(filterValue);
      }}
      className={`py-2 text-base font-semibold ${
        selected === getFilterValue(label) ? 'text-blue-500' : 'text-gray-500'
      }`}
    >
      {label} ({count})
    </button>
  );
}
