type SelectProps = {
  children: number[] | string[];
};
export default function Select({ children }: SelectProps) {
  return (
    <div>
      <label
        htmlFor="HeadlineAct"
        className="block text-sm font-medium text-gray-900"
      />
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="mt-1.5 w-full rounded-lg border-gray-300 text-lg text-gray-700 sm:text-base"
      >
        {children.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
