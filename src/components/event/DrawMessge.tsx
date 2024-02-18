type Props = {
  completed: boolean;
};
export default function DrawMessage({ completed }: Props) {
  const isCompleted = (completed: boolean) => {
    return completed
      ? {
          main: '축하드립니다!',
          sub: '10개의 벚꽃을 다 모으셨네요!',
        }
      : { main: '아직 부족해요!', sub: '더 다양한 동아리를 체험해보세요!' };
  };
  const message = isCompleted(completed);
  return (
    <>
      <div className="mt-10 flex flex-col items-center md:mt-5">
        <span className={completed ? 'text-pink-500' : 'font-bold'}>
          {message.main}
        </span>
        <span className="font-bold">{message.sub}</span>
        <span className="mt-2 text-xs font-medium text-gray-500">
          2024학년도 1학기 학생회비 납부자만 응모 가능
        </span>
      </div>
    </>
  );
}
