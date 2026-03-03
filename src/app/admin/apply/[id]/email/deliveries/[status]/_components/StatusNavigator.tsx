import { useRouter } from 'next/navigation';

import { Body2, Flex, Icon } from 'ddingdong-design-system';

import { EMAIL_STATUS } from '../../../../_constants/apply';

export function StatusNavigator({ status }: { status: string }) {
  const router = useRouter();
  return (
    <Flex
      dir="row"
      justifyContent="start"
      alignItems="center"
      gap={2}
      className="cursor-pointer"
      onClick={() => router.back()}
    >
      <Icon name="arrowLeft" color="gray" size={24} />
      <Body2 className="text-gray-500">
        {EMAIL_STATUS[status.toUpperCase() as keyof typeof EMAIL_STATUS]}
      </Body2>
    </Flex>
  );
}
