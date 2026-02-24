import { Body2, Body3, Button, Flex, usePortal } from 'ddingdong-design-system';

import { EmailDeliveryStatus } from '@/app/_api/types/email';

import { ApplicantCard } from './ApplicantCard';
import { ReSendModal } from './ReSendModal';

type EmailStatusListProps = {
  type: 'SUCCESS' | 'FAIL';
  data: EmailDeliveryStatus[];
};
export function EmailStatusList({ type, data }: EmailStatusListProps) {
  const { isOpen, openModal, closeModal } = usePortal();
  if (data.length === 0) {
    return (
      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        gap={2}
        className="mt-20"
      >
        <Body2>전송된 이메일이 없습니다.</Body2>
      </Flex>
    );
  }

  return (
    <>
      <Body3 className="my-4 text-gray-400">총 {data.length} 건</Body3>
      <Flex dir="col" alignItems="center" justifyContent="center">
        <Flex className="w-full flex-col gap-4 md:grid md:grid-cols-3">
          {data.map((statusItem, index) => (
            <ApplicantCard key={index} {...statusItem} />
          ))}
        </Flex>
        {type === 'FAIL' && (
          <Button
            variant="primary"
            color="blue"
            className="fixed right-0 bottom-5 left-0 z-10 m-5 md:static md:mt-10 md:w-auto"
            onClick={() => openModal()}
          >
            전체 재전송하기
          </Button>
        )}
      </Flex>
      <ReSendModal
        isOpen={isOpen}
        onClose={closeModal}
        reSendLength={data.length}
      />
    </>
  );
}
