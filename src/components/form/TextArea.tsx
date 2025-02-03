import BaseInput from './BaseInput';
export default function TextArea({ placeholder, rows = 3, disabled }) {
  return (
    <BaseInput
      as="textarea"
      placeholder={placeholder}
      rows={rows}
      className="disabled: resize-none"
      disabled={disabled}
    />
  );
}
