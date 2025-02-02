import BaseInput from './BaseInput';
export default function TextArea({ placeholder, rows = 3 }) {
  return (
    <BaseInput
      as="textarea"
      placeholder={placeholder}
      rows={rows}
      className="resize-none"
    />
  );
}
