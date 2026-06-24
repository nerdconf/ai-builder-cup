import NumberFlow, { NumberFlowGroup } from "@number-flow/react";

type AnimatedTimerProps = {
  remainingMs: number;
  ariaLabel: string;
};

function getTimeParts(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

export function AnimatedTimer({ remainingMs, ariaLabel }: AnimatedTimerProps) {
  const { minutes, seconds } = getTimeParts(remainingMs);

  return (
    <div
      aria-label={ariaLabel}
      aria-live="polite"
      className="w-full overflow-hidden border-b border-white/[0.08] pb-4"
      role="timer"
    >
      <NumberFlowGroup>
        <div className="flex items-center justify-center gap-1 font-timer text-5xl font-bold leading-none tracking-wider text-neon [--number-flow-mask-height:0.14em] sm:text-6xl">
          <NumberFlow
            value={minutes}
            trend={-1}
            format={{ minimumIntegerDigits: 2, useGrouping: false }}
            digits={{ 1: { max: 9 } }}
            style={{ fontVariantNumeric: "tabular-nums" }}
          />
          <span aria-hidden className="opacity-90">
            :
          </span>
          <NumberFlow
            value={seconds}
            trend={-1}
            format={{ minimumIntegerDigits: 2, useGrouping: false }}
            digits={{ 1: { max: 5 } }}
            style={{ fontVariantNumeric: "tabular-nums" }}
          />
        </div>
      </NumberFlowGroup>
    </div>
  );
}

export function formatRemaining(ms: number) {
  const { minutes, seconds } = getTimeParts(ms);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
