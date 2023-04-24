import { Dispatch, SetStateAction } from 'react';

type InputProps = {
  label: string;
  id: string;
  type: 'text' | 'password';
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function Input({
  label,
  id,
  type,
  value,
  setValue,
}: InputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return (
    <div className="mb-4 flex flex-col">
      <label
        htmlFor={id}
        className="mb-0.5 text-base font-medium text-gray-500 sm:text-lg"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        spellCheck={false}
        value={value}
        onChange={handleChange}
        className="rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 py-2 text-base font-medium outline-none sm:text-lg"
      />
    </div>
  );
}
