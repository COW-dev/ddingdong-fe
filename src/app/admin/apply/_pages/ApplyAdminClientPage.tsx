'use client';

import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Title1, Button, Body3, Flex } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { FormCard } from '@/app/admin/apply/_components/FormCard';

import { FormFilter } from '../_components/FormFilter';
import { useFormFilter } from '../_hooks/useFormFilter';

export function ApplyAdminClientPage() {
  const router = useRouter();
  const { data: formsData } = useSuspenseQuery(applyQueryOptions.all());

  const { formCounts, formFilter, filteredForms, handleFilterChange } =
    useFormFilter(formsData);

  return (
    <>
      <Flex justifyContent="between" alignItems="center" className="w-full">
        <Title1 weight="bold" className="py-7 md:py-10">
          지원서 관리
        </Title1>
        <Button
          size="md"
          variant="secondary"
          color="blue"
          onClick={() => router.push('/apply/new')}
        >
          <Body3>생성하기</Body3>
        </Button>
      </Flex>

      <FormFilter
        formCounts={formCounts}
        formFilter={formFilter}
        onFilterChange={handleFilterChange}
      />

      <Flex dir="col" alignItems="start" gap={3}>
        {filteredForms.length === 0 ? (
          <Flex justifyContent="center" alignItems="center" className="w-full">
            <Body3 className="mt-4 py-36 text-center text-gray-400">
              생성된 지원서가 없습니다.
            </Body3>
          </Flex>
        ) : (
          [...filteredForms]
            .reverse()
            .map((form) => <FormCard key={form.formId} {...form} />)
        )}
      </Flex>
    </>
  );
}
