'use client';

import {
  Body3,
  Button,
  DoubleButton,
  Flex,
  Title1,
  usePortal,
} from '@dds/shared';
import { useSuspenseQuery } from '@tanstack/react-query';

import { reportQueryOptions } from '@/_api/queries/report';

import { ReportCardContainer } from '../../_containers/ReportCardContainer';
import { CreateTermModal } from '../_components/CreateTermModal';
import { DeleteTermModal } from '../_components/DeleteTermModal';
import { ReportCard } from '../_components/ReportCard';

export function ReportClientPage() {
  const { data: terms } = useSuspenseQuery(reportQueryOptions.terms());
  const createModal = usePortal();
  const deleteModal = usePortal();

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Title1 weight="bold" className="py-7 md:py-10">
          활동보고서 관리
        </Title1>
        <DoubleButton
          className="w-auto"
          left={
            <Button
              size="md"
              variant="secondary"
              color="red"
              onClick={deleteModal.openModal}
            >
              <Body3 weight="bold">회차 삭제</Body3>
            </Button>
          }
          right={
            <Button
              size="md"
              variant="primary"
              color="blue"
              onClick={createModal.openModal}
            >
              <Body3 weight="bold">회차 생성</Body3>
            </Button>
          }
        />
      </Flex>
      <ReportCardContainer>
        {terms?.map((termInfo) => {
          return <ReportCard termInfo={termInfo} key={termInfo.term} />;
        })}
      </ReportCardContainer>
      <CreateTermModal
        isOpen={createModal.isOpen}
        closeModal={createModal.closeModal}
      />
      <DeleteTermModal
        isOpen={deleteModal.isOpen}
        closeModal={deleteModal.closeModal}
      />
    </>
  );
}
