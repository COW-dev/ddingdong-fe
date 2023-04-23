type AdminHeadingProps = {
  clubName?: string;
};

export default function AdminHeading({ clubName }: AdminHeadingProps) {
  return (
    <div className="mt-7 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
      <div className="md:mr-3">안녕하세요,</div>
      <span className="text-blue-500">{clubName}</span>
      <span className="ml-2 md:ml-3">님</span>
    </div>
  );
}
