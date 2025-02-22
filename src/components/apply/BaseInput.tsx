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
    <div className="h-full w-full">
      {label && !disabled && (
        <label className="mb-3 block px-1 text-lg font-bold text-blue-500 md:text-xl">
          {label}
        </label>
      )}

      <Component
        disabled={disabled}
        className={`h-full w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-lg font-semibold text-gray-500 outline-none transition-all duration-300 ease-in-out 
           focus:border-blue-500 focus:ring-blue-300 disabled:resize-none md:px-5 ${className}`}
        placeholder={
          disabled || as === 'textarea' || as === 'input' ? placeholder : ''
        }
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
