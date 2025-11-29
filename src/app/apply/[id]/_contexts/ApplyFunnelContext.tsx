'use client';

import { createContext, useContext, ReactNode, ReactElement } from 'react';

import { useFunnel } from '../_hooks/useFunnel';

type Step = 'SECTION' | 'QUESTION' | 'SUBMITTED';

const STEP_NAMES = ['SECTION', 'QUESTION', 'SUBMITTED'] as const;

type StepProps = {
  name: Step;
  children: ReactNode;
};

type ApplyFunnelContextValue = {
  Funnel: {
    (props: { children: ReactElement<StepProps>[] }): ReactElement | null;
    Step: (props: StepProps) => ReactElement;
  };
  step: Step;
  setStep: (step: Step) => void;
};

const ApplyFunnelContext = createContext<ApplyFunnelContextValue | null>(null);

type ApplyFunnelProviderProps = {
  children: ReactNode;
};

export function ApplyFunnelProvider({ children }: ApplyFunnelProviderProps) {
  const { Funnel, step, setStep } = useFunnel<Step>(STEP_NAMES);

  return (
    <ApplyFunnelContext.Provider value={{ Funnel, step, setStep }}>
      {children}
    </ApplyFunnelContext.Provider>
  );
}

export function useApplyFunnel() {
  const context = useContext(ApplyFunnelContext);
  if (!context) {
    throw new Error('useApplyFunnel must be used within ApplyFunnelProvider');
  }
  return context;
}
