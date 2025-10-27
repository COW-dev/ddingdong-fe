'use client';
import { Flex, IconButton, Title3 } from 'ddingdong-design-system';
import { useRouter } from 'next/navigation';

export function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  const handleClickBackButton = () => router.back();

  return (
    <Flex alignItems="center">
      <IconButton
        iconName="navbarArrow"
        color="gray"
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          handleClickBackButton();
        }}
      />
      <Title3 weight="bold" className="text-gray-500">
        {title}
      </Title3>
    </Flex>
  );
}
