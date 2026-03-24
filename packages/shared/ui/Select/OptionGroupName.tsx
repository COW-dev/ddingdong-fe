type Props = {
  name: string;
};

export function OptionGroupName({ name }: Props) {
  return <div className="border-b-2 border-gray-100 px-4 py-3.5 text-lg text-gray-300">{name}</div>;
}
