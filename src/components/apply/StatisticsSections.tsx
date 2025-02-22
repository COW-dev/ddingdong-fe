type Props = {
  addSection?: () => void;
  focusSection: string;
  setFocusSection: (section: string) => void;
  sections: string[];
  isClosed: boolean;
};

export default function Sections({
  addSection,
  focusSection,
  setFocusSection,
  sections,
}: Props) {
  return (
    <div className="relative mt-7 flex items-center gap-1 border-b-0 px-4 font-semibold">
      {sections?.map((name: string) => (
        <span
          key={name}
          className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 px-3 py-1 ${
            focusSection === name
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setFocusSection(name)}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
