'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

import { ROUND_CONFIGS, type RoundConfig } from '../_constants/roundConfigs';
import { useCardState } from '../_hooks/useCardState';
import { useDelayedAction } from '../_hooks/useDelayedAction';
import { useRoundPhase } from '../_hooks/useRoundPhase';

import type { Card } from '../_utils/cardUtils';

const MATCH_CHECK_DELAY_MS = 350;
const ROUND_COMPLETE_DELAY_MS = 500;

type GameContextValue = {
  cards: Card[];
  config: RoundConfig;
  isPreviewMode: boolean;
  isGameActive: boolean;
  previewTimer: number;
  gameTimer: number;
  selectCard: (cardId: number) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

type Props = {
  currentRound: number;
  onRoundComplete: (roundIndex: number, success: boolean) => void;
  children: ReactNode;
};

export function PairGamePlayingProvider({
  currentRound,
  onRoundComplete,
  children,
}: Props) {
  const config = ROUND_CONFIGS[currentRound] ?? ROUND_CONFIGS[0];
  const onRoundCompleteRef = useRef(onRoundComplete);
  onRoundCompleteRef.current = onRoundComplete;

  const { schedule } = useDelayedAction();
  const { previewTimer, gameTimer, phase, isPreviewMode, isGameActive, stop } =
    useRoundPhase();
  const { cards, flipCard, flipAllDown, checkMatch } = useCardState(
    config.totalCards,
  );

  const selectedCardIds = useRef<number[]>([]);
  const pendingCardIds = useRef<number[]>([]);
  const isProcessingMatch = useRef(false);
  const isRoundCompleted = useRef(false);

  // 프리뷰 종료 시 카드 뒤집기
  useEffect(() => {
    if (phase === 'playing') {
      flipAllDown();
    }
  }, [phase, flipAllDown]);

  // 게임 타임아웃 처리
  useEffect(() => {
    if (phase === 'ended' && !isRoundCompleted.current) {
      onRoundCompleteRef.current(currentRound, false);
    }
  }, [phase, currentRound]);

  const tryFlipNextCards = useCallback(() => {
    while (
      pendingCardIds.current.length > 0 &&
      selectedCardIds.current.length < 2
    ) {
      const nextId = pendingCardIds.current.shift()!;
      const flipped = flipCard(nextId);
      if (flipped) {
        selectedCardIds.current.push(nextId);
      }
    }
  }, [flipCard]);

  const processMatchResult = useCallback(
    (firstId: number, secondId: number) => {
      const isAllMatched = checkMatch(firstId, secondId);

      if (isAllMatched) {
        isRoundCompleted.current = true;
        stop();
        schedule(
          () => onRoundCompleteRef.current(currentRound, true),
          ROUND_COMPLETE_DELAY_MS,
        );
        return;
      }

      selectedCardIds.current = [];
      isProcessingMatch.current = false;
      tryFlipNextCards();

      if (selectedCardIds.current.length === 2) {
        isProcessingMatch.current = true;
        const [first, second] = selectedCardIds.current;
        schedule(() => processMatchResult(first, second), MATCH_CHECK_DELAY_MS);
      }
    },
    [currentRound, checkMatch, stop, schedule, tryFlipNextCards],
  );

  const selectCard = useCallback(
    (cardId: number) => {
      if (!isGameActive) return;

      const isDuplicate =
        selectedCardIds.current.includes(cardId) ||
        pendingCardIds.current.includes(cardId);
      if (isDuplicate) return;

      const canFlipNow =
        !isProcessingMatch.current && selectedCardIds.current.length < 2;

      if (!canFlipNow) {
        pendingCardIds.current.push(cardId);
        return;
      }

      const flipped = flipCard(cardId);
      if (!flipped) return;

      selectedCardIds.current.push(cardId);

      if (selectedCardIds.current.length === 2) {
        isProcessingMatch.current = true;
        const [first, second] = selectedCardIds.current;
        schedule(() => processMatchResult(first, second), MATCH_CHECK_DELAY_MS);
      }
    },
    [isGameActive, flipCard, schedule, processMatchResult],
  );

  const value = useMemo<GameContextValue>(
    () => ({
      cards,
      config,
      isPreviewMode,
      isGameActive,
      previewTimer,
      gameTimer,
      selectCard,
    }),
    [
      cards,
      config,
      isPreviewMode,
      isGameActive,
      previewTimer,
      gameTimer,
      selectCard,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function usePairGamePlaying() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      'usePairGamePlaying must be used within PairGamePlayingProvider',
    );
  }
  return context;
}
