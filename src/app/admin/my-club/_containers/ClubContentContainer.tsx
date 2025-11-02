import { Body3, Flex } from 'ddingdong-design-system';

export function ClubContentContainer({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Flex dir="col" gap={2}>
      <Body3 className="text-lg font-bold md:text-xl">{title}</Body3>
      {children}
    </Flex>
  );
}
