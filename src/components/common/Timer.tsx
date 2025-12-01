import { useEffect, useState } from "react";
import { formatTime } from "../../utils/formatTime";

interface TimerProps {
  time: number;
  onTimeOver?: () => void;
  onBeforeEnd?: () => void;
}

const Timer = ({ time, onTimeOver, onBeforeEnd }: TimerProps) => {
  const [remaining, setRemaining] = useState(time);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeOver?.();
      return;
    }

    if (remaining === 10 && !notified) {
      onBeforeEnd?.();
      setNotified(true);
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onTimeOver, onBeforeEnd, notified]);

  const timeText = formatTime(remaining);

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[100px] w-[200px] items-center justify-center rounded-lg border-2 border-solid border-gray3 bg-gray2 font-keania text-5xl shadow-md">
        {timeText}
      </div>
      <p className="mt-2 text-sm text-gray8">! 주어진 시간 내에 질문에 대한 답을 작성하세요 !</p>
    </div>
  );
};

export default Timer;
