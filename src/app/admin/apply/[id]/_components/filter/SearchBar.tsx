import { Flex, Icon, IconButton } from 'ddingdong-design-system';

type SearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
};
export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="end"
      className="mx-auto w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-3 py-1 text-center md:w-64 md:px-3 md:py-1"
    >
      <input
        type="text"
        value={value}
        placeholder="이름을 검색해주세요"
        aria-label="이름을 검색해주세요"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full text-base font-medium outline-none"
      />
      <Icon name="search" size={30} />
    </Flex>
  );
}
