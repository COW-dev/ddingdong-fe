export default function ClubList({ setClub }: any) {
  // const submitClubNames = dummy
  //   .filter((item) => item.term === String(term))
  //   .map((item) => item.name);
  const submitClubNames = ['띵동', 'COW'];
  return (
    <>
      <div className="no-scrollbar mt-4 h-[70%] overflow-y-scroll ">
        <div className="my-2 text-gray-500">제출 동아리</div>
        {submitClubNames?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 hover:bg-gray-100"
            key={clubName}
            onClick={setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
        <div className="my-2 text-gray-500">미제출 동아리</div>
        {/* {clubList?.map((clubName) => ( */}
        {['명지서법', '너나들이']?.map((clubName) => (
          <div
            className="rounded-xl px-5 py-1 text-gray-300 "
            key={clubName}
            onClick={setClub(clubName)}
          >
            {clubName}
          </div>
        ))}
      </div>
    </>
  );
}
