import { PropsWithChildren } from 'react';

import { Body2, Flex } from 'ddingdong-design-system';

export function ReportFormContiner({ children }: PropsWithChildren) {
  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className="flex-col md:flex-row"
      gap={6}
    >
      {children}
    </Flex>
  );
}

export function ReportFormContentContainer({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Flex dir="col" gap={2}>
      <Body2
        weight="semibold"
        className={`text-blue-500 ${!title && 'hidden'}`}
      >
        {title}
      </Body2>
      {children}
    </Flex>
  );
}

export function ReportFormContentWapper({
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Flex gap={2} className="flex-col md:flex-row">
      {children}
    </Flex>
  );
}
