import Link from 'next/link';

import {
  Body2,
  Button,
  Flex,
  Title3,
  usePortal,
} from 'ddingdong-design-system';

import { FormStatus } from '@/app/_api/types/apply';
import { FORM_STATUS } from '@/app/admin/apply/[id]/_constants/apply';

import { formatDate } from '../../_utils/formatDate';
import { MemberIntegrationModal } from '../MemberIntergrationModal';

type FormStatusInfoProps = {
  formStatus: FormStatus;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  onRegister: () => void;
  formId: number;
};

export function FormStatusInfo({
  formStatus,
  startDate,
  endDate,
  hasInterview,
  onRegister,
  formId,
}: FormStatusInfoProps) {
  const { isOpen, openModal, closeModal } = usePortal();
  return (
    <>
      <Flex
        dir="row"
        justifyContent="between"
        className={hasInterview ? 'mt-12 mb-0' : 'my-11'}
      >
        <Flex dir="col" alignItems="start" gap={1}>
          <Title3 weight="bold">
            <Title3
              as="span"
              weight="bold"
              className={
                FORM_STATUS[formStatus as keyof typeof FORM_STATUS]?.color
              }
            >
              {FORM_STATUS[formStatus as keyof typeof FORM_STATUS]?.text}
            </Title3>{' '}
            지원서입니다.
          </Title3>
          <Body2 weight="semibold" className="text-gray-500">
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </Body2>
        </Flex>
        <Flex dir="row" alignItems="center" gap={3}>
          <Button
            size="sm"
            variant="primary"
            color="blue"
            onClick={openModal}
            className="hidden md:block"
          >
            명단 연동하기
          </Button>
          <Link href={`/apply/${formId}/email`} className="hidden md:block">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              color="blue"
              className="hidden md:block"
            >
              이메일 전송하기
            </Button>
          </Link>
        </Flex>
      </Flex>
      <MemberIntegrationModal
        isOpen={isOpen}
        onClose={closeModal}
        onIntegration={onRegister}
      />
    </>
  );
}
