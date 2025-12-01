import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Timer from "./Timer";

describe("Timer 컴포넌트", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("초기 렌더링 시 전달받은 시간을 mm:ss 형식으로 표시한다", () => {
    act(() => {
      render(<Timer time={90} />); // 1분 30초
    });

    expect(screen.getByText("01:30")).toBeInTheDocument();
  });

  it("1초마다 시간이 감소하여 화면에 반영된다", () => {
    render(<Timer time={5} />);

    // 처음에는 00:05
    expect(screen.getByText("00:05")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:04")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText("00:01")).toBeInTheDocument();
  });

  it("남은 시간이 10초가 되었을 때 onBeforeEnd 콜백을 한 번만 호출한다", () => {
    const handleBeforeEnd = vi.fn();

    render(<Timer time={12} onBeforeEnd={handleBeforeEnd} />);

    // 2초가 지나면 12 → 10
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(handleBeforeEnd).toHaveBeenCalledTimes(1);

    // 더 시간이 지나도 추가로 호출되지 않아야 함
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(handleBeforeEnd).toHaveBeenCalledTimes(1);
  });

  it("시간이 0이 되면 onTimeOver 콜백을 호출한다", () => {
    const handleTimeOver = vi.fn();

    render(<Timer time={3} onTimeOver={handleTimeOver} />);

    act(() => {
      vi.advanceTimersByTime(3000); // 3초 → 0
    });

    expect(handleTimeOver).toHaveBeenCalledTimes(1);
  });

  it("key 값이 변경되면 타이머가 초기화된다", () => {
    const { rerender } = render(<Timer key="q1" time={30} />);

    // 5초 경과 → 00:25
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("00:25")).toBeInTheDocument();

    // key 변경 → 새로운 컴포넌트로 마운트되므로 00:30으로 리셋
    rerender(<Timer key="q2" time={30} />);
    expect(screen.getByText("00:30")).toBeInTheDocument();
  });
});
