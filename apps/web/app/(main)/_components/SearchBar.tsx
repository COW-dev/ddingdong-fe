import { Flex, IconButton } from '@dds/shared';

type SearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
};
export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <Flex
      alignItems="center"
      className="md:w-128 mx-auto mb-3 mt-7 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-3 py-1 text-center"
    >
      <input
        type="search"
        value={value}
        placeholder="동아리를 검색해요"
        aria-label="동아리 검색"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full text-base font-medium outline-none"
      />
      <IconButton iconName="search" size={30} />
    </Flex>
  );
}
