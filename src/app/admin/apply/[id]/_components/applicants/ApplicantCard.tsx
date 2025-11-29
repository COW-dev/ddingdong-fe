import { useRouter } from 'next/navigation';

import { Badge, Body1, Body3, Checkbox, Flex } from 'ddingdong-design-system';

import { Applicant } from '@/app/_api/types/apply';
import { STATUS_TYPE } from '@/app/admin/apply/[id]/_constants/apply';
import {
  getDocumentStatus,
  getInterviewStatus,
} from '@/app/admin/apply/[id]/_utils/filter';

type Props = {
  data: Applicant;
  type: 'DOCUMENT' | 'INTERVIEW';
  checked: boolean;
  onCheck: (checked: boolean) => void;
};
export function ApplicantCard({ data, type, checked, onCheck }: Props) {
  const router = useRouter();
  const status =
    type === 'DOCUMENT'
      ? getDocumentStatus(data.status)
      : getInterviewStatus(data.status);

  return (
    <Flex as="li" alignItems="start" gap={1} key={data.id} className="w-full">
      <Checkbox
        checked={checked}
        aria-label={`${data.name} 지원자 선택`}
        onCheckedChange={(checked) => onCheck(checked)}
        className="mt-1 flex size-5 flex-shrink-0 cursor-pointer items-center border-gray-200 md:size-6"
      />
      <Flex
        as="button"
        className="w-full cursor-pointer border-b border-gray-200 bg-white pb-3 transition-colors hover:border-gray-200 md:rounded-xl md:border-[1px] md:p-6 md:hover:bg-gray-50"
        onClick={() => router.push(`/apply/${data.formId}/${data.id}`)}
      >
        <Flex
          justifyContent="between"
          alignItems="center"
          gap={1}
          className="w-full"
        >
          <Flex dir="col" alignItems="start" gap={1}>
            <Body1 weight="bold">{data.name}</Body1>
            <Body3 weight="semibold" className="text-gray-400">
              {data.studentNumber}
            </Body3>
          </Flex>
          <Badge
            variant={
              STATUS_TYPE[status].backgroundColor as
                | 'positive'
                | 'negative'
                | 'neutral'
            }
            text={STATUS_TYPE[status].text}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
