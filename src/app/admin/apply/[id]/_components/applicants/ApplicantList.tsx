'use client';

import { PropsWithChildren } from 'react';

import { Body3, Flex } from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useUpdateApplicantStatus } from '@/app/_api/mutations/apply';
import { Applicant } from '@/app/_api/types/apply';

import { useApplicantFilter } from '../../_hooks/useApplicantFilter';
import { useApplicantSelection } from '../../_hooks/useApplicantSelection';
import { SearchBar } from '../filter/SearchBar';
import { StatusDropdown } from '../filter/StatusDropdown';

import { ApplicantCard } from './ApplicantCard';
import { ApplicantFilter } from './ApplicantFilter';

type Props = {
  formId: number;
  type?: 'DOCUMENT' | 'INTERVIEW';
  applicants: Applicant[];
};

export function ApplicantList({
  formId,
  type = 'DOCUMENT',
  applicants,
}: Props) {
  const {
    filterType,
    setFilterType,
    filteredApplicants,
    filterCounts,
    keyword,
    handleSearch,
  } = useApplicantFilter(applicants, type);
  const {
    selectedApplicants,
    selectedCount,
    allChecked,
    handleAllCheck,
    handleCheckApplicant,
    clearSelection,
  } = useApplicantSelection(filteredApplicants, type);
  const updateApplicantStatusMutation = useUpdateApplicantStatus();

  const handleStatusChange = (status: 'PASS' | 'FAIL') => {
    const statusValue =
      status === 'PASS'
        ? type === 'DOCUMENT'
          ? 'FIRST_PASS'
          : 'FINAL_PASS'
        : type === 'DOCUMENT'
          ? 'FIRST_FAIL'
          : 'FINAL_FAIL';
    updateApplicantStatusMutation.mutate(
      {
        formId: Number(formId),
        applicationIds: Array.from(selectedApplicants),
        status: statusValue,
      },
      {
        onSuccess: () => {
          toast.success('지원자 상태 수정에 성공했어요.');
        },
        onError: () => {
          toast.error('지원자 상태 수정에 실패했어요.');
        },
      },
    );
    clearSelection();
  };

  return (
    <>
      <Flex
        dir="col"
        alignItems="start"
        justifyContent="between"
        className="w-full border-b border-gray-200 pb-1 md:flex-row-reverse md:items-center md:gap-2"
      >
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          gap={2}
          className="my-4 w-full flex-col-reverse md:flex-row"
        >
          <Flex
            alignItems="center"
            className="w-full justify-between md:flex-1 md:justify-start"
          >
            <ApplicantFilter
              filterType={filterType}
              filterCounts={filterCounts}
              allChecked={allChecked}
              onFilterChange={setFilterType}
              onAllCheck={handleAllCheck}
            />
            <StatusDropdown
              type={type}
              selectedCount={selectedCount}
              onStatusChange={handleStatusChange}
            />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="end"
            className="w-full md:w-auto md:flex-shrink-0"
          >
            <SearchBar value={keyword} onSearch={handleSearch} />
          </Flex>
        </Flex>
      </Flex>
      {filteredApplicants.length === 0 && (
        <Flex justifyContent="center" alignItems="center" className="w-full">
          <Body3 weight="bold" className="mt-4 py-36 text-center text-gray-500">
            지원자가 아직 없습니다.
          </Body3>
        </Flex>
      )}
      <ApplicantGrid>
        {filteredApplicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            data={applicant}
            type={type}
            checked={selectedApplicants.has(applicant.id)}
            onCheck={(checked) => handleCheckApplicant(applicant.id, checked)}
          />
        ))}
      </ApplicantGrid>
    </>
  );
}

function ApplicantGrid({ children }: PropsWithChildren) {
  return (
    <ul className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
      {children}
    </ul>
  );
}
