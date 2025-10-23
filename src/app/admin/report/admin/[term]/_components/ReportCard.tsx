import { deptCaptionColor } from '@/constants/color';
import { Title3, Flex, Caption1, Badge } from 'ddingdong-design-system';
import { CustomCardProps, CustomCard } from '../../../_components/Card';
import { Club } from '@/types';

type ReportCardProps = Omit<CustomCardProps, 'description' | 'title'> & {
  club: Club;
  term: number;
  isSubmitted: boolean;
};

export function ReportCard({ term, club, isSubmitted }: ReportCardProps) {
  const { name, category, tag } = club;
  const badgeVariant = isSubmitted ? 'positive' : 'negative';
  const badgeText = isSubmitted ? '제출완료' : '미제출';

  return (
    <CustomCard
      href={`/report/admin/${term}/${name}`}
      disabled={!isSubmitted}
      title={<Title3 weight="bold">{name}</Title3>}
      description={
        <Flex className="gap-1">
          <Caption1 className={deptCaptionColor[category]}>{category}</Caption1>
          <Caption1 weight="normal" className="text-gray-300">
            |
          </Caption1>
          <Caption1 className="text-gray-500">{tag}</Caption1>
        </Flex>
      }
      badge={<Badge variant={badgeVariant} text={badgeText} />}
    />
  );
}
