import { Flex, Title2 } from 'ddingdong-design-system';

export function AdminGreeting({ name }: { name?: string }) {
  return (
    <Flex as="span" className="mt-7 md:mt-10">
      <Title2 weight="bold" className="md:mr-1.5">
        안녕하세요,
      </Title2>
      <Title2 weight="bold" className="text-blue-500">
        {name}
      </Title2>
      <Title2 weight="bold">님</Title2>
    </Flex>
  );
}
