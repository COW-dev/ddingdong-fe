type Prop = {
  startDate: string;
  endDate: string;
};
export default function ActiveDate({ startDate, endDate }: Prop) {
  return (
    <div className="md:text-md text-basw py-3 font-medium opacity-70 md:pb-3">
      <span>{startDate?.split(' ')[0]}</span>
      <div>
        {startDate?.split(' ')[1]}~{endDate?.split(' ')[1]}
      </div>
    </div>
  );
}
