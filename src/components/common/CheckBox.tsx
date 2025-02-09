import { cn } from '@/lib/utils';

type Props = {
  value: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function CheckBox({
  value,
  onChange,
  disabled = false,
  className,
  ...props
}: Props) {
  return (
    <input
      checked={value}
      onChange={onChange}
      type="checkbox"
      disabled={disabled}
      className={cn(
        "size-4 appearance-none rounded-sm border-2 border-gray-300 bg-contain bg-center bg-no-repeat outline-none checked:border-blue-500 checked:border-transparent checked:bg-blue-500 checked:bg-[url('/check-white.svg')] checked:bg-[length:80%] checked:hover:bg-blue-600 md:size-5",
        className,
      )}
      {...props}
    />
  );
}
