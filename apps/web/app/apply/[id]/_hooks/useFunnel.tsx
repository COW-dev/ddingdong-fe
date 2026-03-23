import React, { ReactElement, useCallback, useState, ReactNode } from 'react';

type StepNames<T> = readonly T[];

type StepProps<T> = {
  name: T;
  children: ReactNode;
};

export const useFunnel = <T extends string>(stepNames: StepNames<T>) => {
  const [step, setStep] = useState<T>(stepNames[0]);

  const FunnelComponent = useCallback(
    ({ children }: { children: ReactElement<StepProps<T>>[] }) => {
      const stepComponentIndex = children.findIndex(
        (child) => (child.props as StepProps<T>).name === step,
      );
      const StepComponent = children[stepComponentIndex];

      if (!StepComponent) {
        return null;
      }

      return StepComponent;
    },
    [step],
  );

  const Step = useCallback(({ children }: StepProps<T>) => {
    return <>{children}</>;
  }, []);

  const Funnel = Object.assign(FunnelComponent, { Step });

  return { Funnel, step, setStep };
};
