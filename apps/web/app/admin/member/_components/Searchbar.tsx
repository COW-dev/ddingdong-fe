import { Flex, Input } from '@dds/shared';

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReset: () => void;
};
export function SearchBar({ value, onChange, onClickReset }: SearchBarProps) {
  return (
    <Flex
      alignItems="center"
      className="md:w-128 mx-auto mt-10 w-full text-center"
    >
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="이름, 학번, 학과로 검색"
        onClickReset={onClickReset}
      />
    </Flex>
  );
}
