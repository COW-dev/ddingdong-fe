import { useRouter } from 'next/navigation';

import { Badge, Body2, Body3, Card, Flex } from 'ddingdong-design-system';

import { Form, FormStatus } from '@/app/_api/types/apply';

import { FORM_STATUS_FILTER } from '../_constants/formFilter';

const getStatusVariant = (
  formStatus: FormStatus,
): 'positive' | 'neutral' | 'negative' => {
  if (formStatus === FORM_STATUS_FILTER.IN_PROGRESS) return 'positive';
  if (formStatus === FORM_STATUS_FILTER.BEFORE) return 'neutral';
  return 'negative';
};

export function FormCard({
  formId,
  title,
  startDate,
  endDate,
  formStatus,
}: Form) {
  const router = useRouter();
  return (
    <Card
      className="w-full cursor-pointer p-4"
      onClick={() => router.push(`/apply/${formId}`)}
    >
      <Flex
        alignItems="center"
        justifyContent="between"
        gap={2}
        className="w-full"
      >
        <Flex dir="col" alignItems="start" gap={2}>
          <Body2 weight="medium">{title}</Body2>
          <Body3 weight="semibold" className="text-gray-400">
            {startDate} ~ {endDate}
          </Body3>
        </Flex>
        <Badge variant={getStatusVariant(formStatus)} text={formStatus} />
      </Flex>
    </Card>
  );
}
