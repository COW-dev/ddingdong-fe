import { useSuspenseQuery } from '@tanstack/react-query';
import { Badge, Flex, usePortal } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';

import { ChartComponent } from './ChartComponent';
import { OptionModal } from './Modal';

type Props = {
  id: number;
  type: 'RADIO' | 'CHECK_BOX';
};

export function QuestionMultipleContent({ type, id }: Props) {
  const { data: answerData } = useSuspenseQuery(
    applyQueryOptions.multipleField(id),
  );
  const { isOpen, closeModal, openModal } = usePortal();

  return (
    <Flex justifyContent="center" className="relative">
      <div className="absolute right-0 bottom-0 cursor-pointer">
        <Badge variant="neutral" text="옵션" onClick={openModal} />
        <OptionModal
          isOpen={isOpen}
          onClose={closeModal}
          options={answerData.options}
        />
      </div>
      <ChartComponent type={type} data={answerData.options ?? []} />
    </Flex>
  );
}
