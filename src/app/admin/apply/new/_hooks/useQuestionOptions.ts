import { useMemo } from 'react';

const MAX_OPTIONS = 20;
const MIN_OPTIONS = 1;

export function useQuestionOptions(
  options: string[],
  onOptionsChange: (options: string[]) => void,
) {
  const localOptions = options || [];

  const handleAddOption = () => {
    if (localOptions.length < MAX_OPTIONS) {
      onOptionsChange([...localOptions, `옵션 ${localOptions.length + 1}`]);
    }
  };

  const handleRemoveOption = (optIndex: number) => {
    if (localOptions.length > MIN_OPTIONS) {
      onOptionsChange(localOptions.filter((_, i) => i !== optIndex));
    }
  };

  const handleOptionChange = (optIndex: number, newValue: string) => {
    const currentOptions = options || [];
    onOptionsChange(
      currentOptions.map((opt, i) => (i === optIndex ? newValue : opt)),
    );
  };

  const canAddOption = useMemo(
    () => localOptions.length < MAX_OPTIONS,
    [localOptions.length],
  );

  const canRemoveOption = useMemo(
    () => localOptions.length > MIN_OPTIONS,
    [localOptions.length],
  );

  return {
    localOptions,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    canAddOption,
    canRemoveOption,
  };
}
