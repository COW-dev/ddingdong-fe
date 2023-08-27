import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Member } from '@/types/club';
type SelectProps = {
  name?: string;
  setData: Dispatch<SetStateAction<any>>;
  list: Array<any>;
  id: number;
};

export default function SearchSelect({ name, setData, list, id }: SelectProps) {
  const [keyword, setKeyword] = useState(name);
  const [filteredList, setFilteredList] = useState(list);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isoptionEdit, setIsoptionEdit] = useState<boolean>(false);

  useEffect(() => {
    setFilteredList(list?.filter((item) => item.name.includes(keyword)));
  }, [keyword]);

  const handleBlur = () => {
    isoptionEdit && setIsEditing(false);
    if (keyword === '') {
      setData((prev: any) => {
        const updatedParticipants = [...prev];
        updatedParticipants[id] = {
          ...updatedParticipants[id],
          name: '',
          studentId: '',
          department: '',
        };
        return updatedParticipants;
      });
    }
  };

  function handleChange(value: Member) {
    setKeyword(value.name);
    setIsEditing(false);
    setData((prev: any) => {
      const updatedParticipants = [...prev];
      updatedParticipants[id] = {
        ...updatedParticipants[id],
        name: value.name,
        studentId: value.studentNumber,
        department: value.department,
      };
      return updatedParticipants;
    });
  }

  return (
    <div className="y-full relative w-full outline-none">
      <div className="inline-flex w-full items-center overflow-hidden rounded-md  px-4 py-2 ">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full bg-inherit outline-none "
          onFocus={() => setIsEditing(true)}
          onBlur={handleBlur}
        />
      </div>

      <div
        className={`${
          (!isEditing || keyword === '') && `hidden`
        } z-10 mt-2 h-fit max-h-[50vh] w-56 overflow-scroll rounded-md border border-gray-100 bg-white shadow-lg`}
      >
        <div
          className="p-2"
          tabIndex={0}
          onFocus={() => setIsoptionEdit(true)}
          onBlur={() => setIsoptionEdit(false)}
        >
          {filteredList?.map((item, index) => (
            <div
              key={`option-${index + `-` + item}`}
              className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 `}
              onClick={() => handleChange(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
