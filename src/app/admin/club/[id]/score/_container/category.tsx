import { Card, Flex } from 'ddingdong-design-system';

export const CategoryContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className="flex w-full justify-between" onClick={onClick}>
      {children}
    </Card>
  );
};

export const CategoryListContainter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex
      dir="col"
      alignItems="center"
      className="gap-4 md:grid md:h-60 md:grid-cols-3"
    >
      {children}
    </Flex>
  );
};
