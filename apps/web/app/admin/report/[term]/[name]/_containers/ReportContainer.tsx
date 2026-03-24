import { PropsWithChildren } from 'react';

import { Body2, Flex } from '@dds/shared';

export function ReportContiner({ children }: PropsWithChildren) {
  return (
    <Flex className="max-w-100 m-auto flex-col-reverse gap-2 text-gray-400 md:max-w-full md:flex-row">
      {children}
    </Flex>
  );
}

export function ReportHeaderContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      justifyContent="between"
      className="flex-col md:flex-row-reverse md:items-stretch"
    >
      {children}
    </Flex>
  );
}

export function ReportContentContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex dir="col" className="gap-2">
      <Body2 weight="semibold" className="text-blue-500">
        {title}
      </Body2>
      {children}
    </Flex>
  );
}
