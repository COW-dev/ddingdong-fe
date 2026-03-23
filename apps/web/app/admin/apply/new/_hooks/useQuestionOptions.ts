import { useMemo, useRef } from 'react';

const MAX_OPTIONS = 20;
const MIN_OPTIONS = 1;
const DEBOUNCE_DELAY_MS = 300;

export function useQuestionOptions(
  options: string[],
  onOptionsChange: (options: string[]) => void,
) {
  const optionRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const debounceTimersRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const clearTimer = (optIndex: number) => {
    const timer = debounceTimersRef.current.get(optIndex);
    if (timer) {
      clearTimeout(timer);
      debounceTimersRef.current.delete(optIndex);
    }
  };

  const handleAddOption = () => {
    const currentOptions = optionsRef.current;
    if (currentOptions.length < MAX_OPTIONS) {
      onOptionsChange([...currentOptions, `옵션 ${currentOptions.length + 1}`]);
    }
  };

  const handleRemoveOption = (optIndex: number) => {
    const currentOptions = optionsRef.current;
    if (currentOptions.length > MIN_OPTIONS) {
      optionRefs.current.delete(optIndex);
      clearTimer(optIndex);
      onOptionsChange(currentOptions.filter((_, i) => i !== optIndex));
    }
  };

  const syncOptionValue = (optIndex: number) => {
    const inputRef = optionRefs.current.get(optIndex);
    if (inputRef) {
      const newValue = inputRef.value;
      const currentOptions = optionsRef.current;
      const updatedOptions = currentOptions.map((opt, i) =>
        i === optIndex ? newValue : opt,
      );
      onOptionsChange(updatedOptions);
    }
  };

  const handleOptionBlur = (optIndex: number) => {
    const existingTimer = debounceTimersRef.current.get(optIndex);
    if (existingTimer) {
      clearTimeout(existingTimer);
      debounceTimersRef.current.delete(optIndex);
    }
    syncOptionValue(optIndex);
  };

  const handleOptionChange = (optIndex: number) => {
    clearTimer(optIndex);
    const timer = setTimeout(() => {
      syncOptionValue(optIndex);
      debounceTimersRef.current.delete(optIndex);
    }, DEBOUNCE_DELAY_MS);
    debounceTimersRef.current.set(optIndex, timer);
  };

  const setOptionRef = (optIndex: number, ref: HTMLInputElement | null) => {
    if (ref) {
      optionRefs.current.set(optIndex, ref);
      const currentValue = optionsRef.current[optIndex];
      if (currentValue !== undefined && ref.value !== currentValue) {
        ref.value = currentValue;
      }
    } else {
      optionRefs.current.delete(optIndex);
      clearTimer(optIndex);
    }
  };

  const canAddOption = useMemo(
    () => options.length < MAX_OPTIONS,
    [options.length],
  );

  const canRemoveOption = useMemo(
    () => options.length > MIN_OPTIONS,
    [options.length],
  );

  return {
    localOptions: options,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleOptionBlur,
    setOptionRef,
    canAddOption,
    canRemoveOption,
  };
}
