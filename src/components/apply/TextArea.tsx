import BaseInput from './BaseInput';

interface TextAreaProps {
  placeholder: string;
  rows?: number;
  disabled: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  placeholder,
  rows = 3,
  disabled,
  value,
  onChange,
}: TextAreaProps) {
  return (
    <BaseInput
      as="textarea"
      placeholder={placeholder}
      rows={rows}
      className="resize-none disabled:resize-none"
      disabled={disabled}
      value={value ?? ''}
      onChange={onChange ?? (() => {})}
    />
  );
}
