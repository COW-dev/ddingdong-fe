import { Term } from '@/app/_api/types/report';
import { parseDate } from '@/utils/parse';
import { Card, Flex, Title3, Caption1 } from 'ddingdong-design-system';
import Link from 'next/link';
import React from 'react';

export type CustomCardProps = {
  description?: React.ReactNode;
  title: React.ReactNode;
  disabled?: boolean;
  href?: string;
  badge?: React.ReactNode;
};

export function CustomCard({
  description,
  title,
  href,
  badge,
  disabled = false,
}: CustomCardProps) {
  const cardContent = (
    <Card as="li" className={disabled && 'cursor-not-allowed opacity-50'}>
      <Flex alignItems="center" justifyContent="between">
        <div>
          {title}
          {description}
        </div>
        {badge}
      </Flex>
    </Card>
  );

  return disabled || !href ? (
    cardContent
  ) : (
    <Link href={href}>{cardContent}</Link>
  );
}

type ReportTermCardProps = Omit<CustomCardProps, 'description' | 'title'> & {
  termInfo: Term;
};
export function ReportTermCard({ termInfo, ...args }: ReportTermCardProps) {
  const { term, startDate, endDate } = termInfo;

  return (
    <CustomCard
      title={<Title3 weight="bold">{term}회차</Title3>}
      description={
        <Caption1 weight="normal" className="text-gray-300">
          {parseDate(startDate)} - {parseDate(endDate)}
        </Caption1>
      }
      {...args}
    />
  );
}
