import { Flex, IconButton } from 'ddingdong-design-system';

type SearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
};
export function SearchBar({ value, onSearch }: SearchBarProps) {
  return (
    <Flex
      alignItems="center"
      className="mx-auto mt-7 mb-3 w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-3 py-1 text-center md:w-128"
    >
      <input
        type="text"
        value={value}
        placeholder="동아리를 검색해요"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full text-base font-medium outline-none"
      />
      <IconButton iconName="search" size={30} />
    </Flex>
  );
}
