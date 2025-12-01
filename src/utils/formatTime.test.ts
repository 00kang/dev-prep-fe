import { describe, it, expect } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("0초를 00:00으로 변환한다", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("한 자리 수 초도 두 자리로 맞춘다", () => {
    expect(formatTime(5)).toBe("00:05");
  });

  it("60초 이상은 분:초 형식으로 변환한다", () => {
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(600)).toBe("10:00");
  });
});
