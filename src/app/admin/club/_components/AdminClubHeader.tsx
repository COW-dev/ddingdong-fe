'use client';

import { Title1, Button, Flex } from 'ddingdong-design-system';

type Props = {
  onClickCreate: () => void;
};

export default function AdminClubsHeader({ onClickCreate }: Props) {
  return (
    <Flex
      dir="row"
      alignItems="end"
      justifyContent="between"
      className="w-full"
    >
      <Title1>동아리 관리</Title1>
      <Button
        color="blue"
        size="md"
        variant="secondary"
        onClick={onClickCreate}
      >
        동아리 생성하기
      </Button>
    </Flex>
  );
}
