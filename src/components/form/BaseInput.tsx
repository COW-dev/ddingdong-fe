export default function BaseInput({
  as: Component = 'input',
  className = '',
  ...props
}) {
  return (
    <Component
      className={`w-[75%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 font-semibold outline-none md:px-5 ${className}`}
      {...props}
    />
  );
}
