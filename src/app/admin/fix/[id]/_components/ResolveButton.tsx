'use client';

import toast from 'react-hot-toast';
import {
  Body1,
  Body2,
  Body3,
  Button,
  DoubleButton,
  Flex,
  Modal,
  usePortal,
} from 'ddingdong-design-system';
import { useResolveFix } from '@/app/_api/mutations/fix';
import { DetailFix } from '@/app/_api/types/fix';

export function ResolveButton({ post }: { post: DetailFix }) {
  const { isOpen, openModal, closeModal } = usePortal();
  const { isCompleted, id } = post;

  const mutation = useResolveFix(id);

  function handleResolve() {
    mutation.mutate(id);
    toast.success('처리 완료로 변경했어요.');
  }

  return (
    <>
      <Flex justifyContent="center">
        <Button
          color="blue"
          size="lg"
          disabled={isCompleted}
          onClick={openModal}
          variant="primary"
        >
          <Body3 weight="bold">
            {isCompleted ? '처리 완료' : '처리 마치기'}
          </Body3>
        </Button>
      </Flex>
      <ResolveModal
        isOpen={isOpen}
        closeModal={closeModal}
        onResolve={handleResolve}
      />
    </>
  );
}

type ResolveModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  onResolve: VoidFunction;
};

function ResolveModal({ isOpen, closeModal, onResolve }: ResolveModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] max-w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="w-full py-2">
          <Body1>처리완료 상태로 변경하시겠어요?</Body1>
        </Flex>
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={() => {
                onResolve();
                closeModal();
              }}
            >
              <Body2 weight="bold">변경하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
