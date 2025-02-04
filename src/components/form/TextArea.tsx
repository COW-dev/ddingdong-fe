import BaseInput from './BaseInput';

export default function TextArea({
  placeholder,
  rows = 3,
  disabled,
  value,
  onChange,
}) {
  return (
    <BaseInput
      as="textarea"
      placeholder={placeholder}
      rows={rows}
      className="resize-none disabled:resize-none"
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
}
