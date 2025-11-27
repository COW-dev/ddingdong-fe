'use client';

import type { ReactNode } from 'react';

import { Flex, IconButton, Title3 } from 'ddingdong-design-system';

type Props = {
  title?: string;

  titleNode?: ReactNode;

  onClose?: () => void;

  className?: string;
};

export default function ModalHeader({
  title,
  titleNode,
  onClose,
  className,
}: Props) {
  return (
    <Flex
      dir="col"
      alignItems="stretch"
      className={`w-full pb-5 ${className ?? ''}`}
    >
      <Flex
        dir="row"
        alignItems="center"
        justifyContent="between"
        gap={8}
        className="w-full pb-3"
      >
        {titleNode ?? <Title3>{title}</Title3>}
        <div className="ml-auto flex items-center gap-2">
          {onClose && (
            <IconButton
              iconName="close"
              color="gray"
              onClick={onClose}
              size={21}
              type="button"
            />
          )}
        </div>
      </Flex>
      <hr className="h-px w-full border-0 bg-gray-200" />
    </Flex>
  );
}
