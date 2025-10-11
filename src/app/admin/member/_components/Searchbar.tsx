import { Flex, Input } from 'ddingdong-design-system';

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickReset: () => void;
};
export function SearchBar({ value, onChange, onClickReset }: SearchBarProps) {
  return (
    <Flex
      alignItems="center"
      className="mx-auto mt-10 w-full text-center md:w-128"
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
