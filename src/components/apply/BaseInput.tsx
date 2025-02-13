export default function BaseInput({
  className = '',
  disabled = false,
  as = 'input',
  label = '',
  placeholder = '',
  ...props
}) {
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && !disabled && (
        <label className="mb-3 block px-1 font-bold text-blue-500">
          {label}
        </label>
      )}

      <Component
        disabled={disabled}
        className={`w-[100%] resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 font-semibold text-gray-500 outline-none disabled:resize-none md:px-5 ${className}`}
        placeholder={
          disabled || as === 'textarea' || as === 'input' ? placeholder : ''
        }
        {...props}
      />
    </div>
  );
}
