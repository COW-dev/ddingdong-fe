import { Body2, Button, DoubleButton } from 'ddingdong-design-system';

type ApplicantStatusButtonsProps = {
  onPass: () => void;
  onFail: () => void;
};

export function ApplicantStatusButtons({
  onPass,
  onFail,
}: ApplicantStatusButtonsProps) {
  return (
    <DoubleButton
      className="m-auto w-fit p-6"
      left={
        <Button variant="primary" color="red" size="md" onClick={onFail}>
          <Body2 weight="bold">불합격</Body2>
        </Button>
      }
      right={
        <Button variant="primary" color="blue" size="lg" onClick={onPass}>
          <Body2 weight="bold">합격</Body2>
        </Button>
      }
    />
  );
}
