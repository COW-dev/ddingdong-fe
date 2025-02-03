export default function BaseInput({
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <input
      disabled={disabled}
      className={`w-[100%] rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 font-semibold outline-none md:px-5 ${className}`}
      {...props}
    />
  );
}
