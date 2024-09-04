type HeadingProps = {
  children: React.ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <h1 className="mt-7 text-2xl font-bold md:mt-10 md:text-4xl">{children}</h1>
  );
}
