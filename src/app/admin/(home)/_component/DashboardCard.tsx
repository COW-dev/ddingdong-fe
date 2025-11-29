import Link from 'next/link';

import { Body3, Card, Title3 } from 'ddingdong-design-system';

type DashboardCardProps = {
  title: string;
  subtitle?: string;
  route: string;
};

export function DashboardCard({ title, subtitle, route }: DashboardCardProps) {
  if (!subtitle) return null;

  return (
    <Card
      as={Link}
      href={route}
      className="min-h-[7rem] transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem]"
    >
      <Title3 className="text-xl font-bold md:text-2xl">{title}</Title3>
      <Body3 className="mt-2 text-gray-400 md:mt-3">{subtitle}</Body3>
    </Card>
  );
}
