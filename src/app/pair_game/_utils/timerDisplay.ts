type TimerDisplayResult = {
  displaySeconds: number;
  progressPercent: number;
};

export function getTimerDisplay(
  gameTimer: number,
  gameTime: number,
): TimerDisplayResult {
  const remaining = Math.max(0, gameTimer);
  const percent = gameTime > 0 ? (remaining / gameTime) * 100 : 0;

  return {
    displaySeconds: Math.floor(remaining),
    progressPercent: percent,
  };
}
