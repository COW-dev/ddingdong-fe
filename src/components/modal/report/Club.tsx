import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchBar from '@/components/home/SearchBar';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { Club as ClubType } from '@/types/club';

type Props = {
  closeModal: () => void;
  setClub: Dispatch<SetStateAction<string>>;
};
export default function Club({ closeModal, setClub }: Props) {
  const { data: allClub } = useAllClubs();
  const [edit, setEdit] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [clubs, setClubs] = useState<ClubType[]>(allClub?.data ?? []);
  const [filteredClubs, setFilteredClubs] = useState<ClubType[]>([]);

  useEffect(() => {
    setFilteredClubs(clubs ?? []);
  }, [clubs]);

  useEffect(() => {
    setFilteredClubs(
      clubs.filter((club) => club.name.includes(keyword.toUpperCase())),
    );
  }, [keyword]);

  function handleChange(keyword: string) {
    setKeyword(keyword);
    setEdit(false);
    setClub(keyword);
    closeModal();
  }

  return (
    <div>
      <div className="m-auto w-[90%]" onFocus={() => setEdit(true)}>
        <SearchBar value={keyword} onChange={setKeyword} />
        <div
          className={`${
            (!edit || keyword === '') && `hidden`
          } fixed z-10 h-fit max-h-[50vh] w-56 overflow-scroll rounded-md border border-gray-100 bg-white py-2 shadow-lg`}
        >
          <div className="px-2" tabIndex={0}>
            {filteredClubs?.map((club, index) => (
              <div
                tabIndex={0}
                key={`option_club-${index}`}
                onClick={() => handleChange(club.name)}
                className={`flex gap-5 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 `}
              >
                <div> {club.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
