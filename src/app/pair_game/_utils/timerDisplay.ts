type TimerDisplayResult = {
  displaySeconds: number;
  progressPercent: number;
};

export function getTimerDisplay(
  gameTimer: number,
  gameTime: number,
): TimerDisplayResult {
  const remaining = Math.max(0, gameTimer);
  const displaySeconds = remaining > 0 ? Math.ceil(remaining) : 0;
  const percent =
    gameTime > 0 && displaySeconds > 0 ? (remaining / gameTime) * 100 : 0;

  return {
    displaySeconds,
    progressPercent: percent,
  };
}
