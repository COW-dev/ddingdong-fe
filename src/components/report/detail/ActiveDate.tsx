type Prop = {
  startDate: string;
  endDate: string;
};
export default function ActiveDate({ startDate, endDate }: Prop) {
  return (
    <div className="md:text-md text-base font-medium opacity-70 md:pb-3">
      <span>{startDate?.split(' ')[0]}</span>{' '}
      <span>
        {startDate?.split(' ')[1]}~{endDate?.split(' ')[1]}
      </span>
    </div>
  );
}
