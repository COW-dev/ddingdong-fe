export default function BaseInput({
  className = '',
  disabled = false,
  as = 'input',
  ...props
}) {
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <Component
      disabled={disabled}
      className={`w-[100%] resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 font-semibold text-gray-500 outline-none disabled:resize-none md:px-5 ${className}`}
      {...props}
    />
  );
}
