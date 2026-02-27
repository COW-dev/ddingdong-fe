'use client';

import { createContext, useContext, ReactNode, ReactElement } from 'react';

import { useFunnel } from '@/app/apply/[id]/_hooks/useFunnel';

const STEP_NAMES = ['intro', 'playing', 'submit', 'completed'] as const;
type Step = (typeof STEP_NAMES)[number];

type StepProps = {
  name: Step;
  children: ReactNode;
};

type GameFunnelContextValue = {
  Funnel: {
    (props: { children: ReactElement<StepProps>[] }): ReactElement | null;
    Step: (props: StepProps) => ReactElement;
  };
  step: Step;
  setStep: (step: Step) => void;
};

const GameFunnelContext = createContext<GameFunnelContextValue | null>(null);

type GameFunnelProviderProps = {
  children: ReactNode;
};

export function GameFunnelProvider({ children }: GameFunnelProviderProps) {
  const { Funnel, step, setStep } = useFunnel<Step>(STEP_NAMES);

  return (
    <GameFunnelContext.Provider value={{ Funnel, step, setStep }}>
      {children}
    </GameFunnelContext.Provider>
  );
}

export function useGameFunnel() {
  const context = useContext(GameFunnelContext);
  if (!context) {
    throw new Error('useGameFunnel must be used within GameFunnelProvider');
  }
  return context;
}
