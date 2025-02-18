import { ChangeEvent } from 'react';

interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  as?: 'input' | 'textarea';
  label?: string;
  placeholder?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  [key: string]: any;
}

export default function BaseInput({
  className = '',
  disabled = false,
  as = 'input',
  label = '',
  placeholder = '',
  onChange,
  ...props
}: BaseInputProps) {
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && !disabled && (
        <label className="mb-3 block px-1 text-lg font-bold text-blue-500 md:text-xl">
          {label}
        </label>
      )}

      <Component
        disabled={disabled}
        className={`w-[100%] resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-lg font-semibold text-gray-500 outline-none disabled:resize-none md:px-5 ${className}`}
        placeholder={
          disabled || as === 'textarea' || as === 'input' ? placeholder : ''
        }
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
