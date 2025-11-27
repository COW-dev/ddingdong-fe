'use client';

import { useRouter } from 'next/navigation';

import { Flex, IconButton, Title1, usePortal } from 'ddingdong-design-system';

import { DeleteModal } from '../DeleteModal';

import { FormActionDropdown } from './FormActionDropdown';

type FormHeaderProps = {
  title: string;
  formId: number;
  onDelete: () => void;
  onRegister: () => void;
};

export function FormHeader({
  title,
  formId,
  onDelete,
  onRegister,
}: FormHeaderProps) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = usePortal();

  return (
    <>
      <Flex dir="row" alignItems="end" justifyContent="between">
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="between"
          className="pt-7 md:pt-10"
        >
          <Title1 weight="bold">{title}</Title1>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Flex alignItems="center" className="mb-1 hidden md:flex">
            <IconButton
              iconName="chart"
              size={28}
              color="primary"
              onClick={() => router.push(`/apply/${formId}/statistics`)}
            />
            <IconButton
              iconName="trash"
              size={25}
              color="red"
              onClick={openModal}
            />
          </Flex>
          <FormActionDropdown
            formId={formId}
            onDelete={openModal}
            onRegister={onRegister}
          />
        </Flex>
      </Flex>
      <DeleteModal
        title={title}
        isOpen={isOpen}
        onClose={closeModal}
        onDelete={onDelete}
      />
    </>
  );
}
