import { Member } from '@/types/club';
type Props = {
  item: Member;
};
export default function ParticipantsItem({ item }: Props) {
  return (
    <>
      <div>{item.name}</div>
    </>
  );
}
