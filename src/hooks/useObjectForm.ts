import { useState } from 'react';

type UnknownEvent =
  | string
  | number
  | boolean
  | {
      target?: {
        type?: string;
        name?: string;
        value?: unknown;
        checked?: boolean;
      };
    };

export function useObjectForm<T extends Record<string, unknown>>(initial: T) {
  const [values, setValues] = useState<T>(initial);

  const set = <K extends keyof T>(name: K, value: T[K]) =>
    setValues((v) => ({ ...v, [name]: value }));

  const register = <K extends keyof T>(name: K) => {
    return {
      name: String(name),
      value: values[name] ?? '',
      onChange: (ev: UnknownEvent) => {
        if (
          typeof ev === 'string' ||
          typeof ev === 'number' ||
          typeof ev === 'boolean'
        ) {
          set(name, ev as T[K]);
          return;
        }

        const target =
          typeof ev === 'object' && ev !== null && 'target' in ev
            ? (
                ev as {
                  target: {
                    type?: string;
                    name?: string;
                    value?: unknown;
                    checked?: boolean;
                  };
                }
              ).target
            : undefined;
        if (target) {
          let val = target.value;

          if (target.type === 'checkbox') {
            val = target.checked;
          } else if (target.type === 'number') {
            val = val === '' ? '' : Number(val);
          }
          set(name, val as T[K]);
        }
      },
    };
  };

  const reset = (next?: Partial<T>) =>
    setValues(() => ({ ...initial, ...(next ?? {}) }));

  return { values, setValues, set, register, reset };
}
