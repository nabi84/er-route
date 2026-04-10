import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useErRouteFlow } from "../src/hooks/useErRouteFlow";

function resetUrl(path = "/") {
  window.history.replaceState({}, "", path);
}

describe("useErRouteFlow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetUrl();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("auto-advances only preloading and loading", () => {
    const { result } = renderHook(() => useErRouteFlow());

    expect(result.current.state.screen).toBe("preloading");

    act(() => vi.advanceTimersByTime(1400));
    expect(result.current.state.screen).toBe("preIntake");

    act(() => vi.advanceTimersByTime(10000));
    expect(result.current.state.screen).toBe("preIntake");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("intake");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("intakeConfirm");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("loading");

    act(() => vi.advanceTimersByTime(1900));
    expect(result.current.state.screen).toBe("results");

    act(() => vi.advanceTimersByTime(10000));
    expect(result.current.state.screen).toBe("results");
  });

  it("pauses and resumes on interrupt for voice screens", () => {
    const { result } = renderHook(() => useErRouteFlow());

    expect(result.current.state.screen).toBe("preloading");

    act(() => result.current.togglePause());
    expect(result.current.state.paused).toBe(true);

    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.state.screen).toBe("preloading");

    act(() => result.current.togglePause());
    expect(result.current.state.paused).toBe(false);

    act(() => vi.advanceTimersByTime(1400));
    expect(result.current.state.screen).toBe("preIntake");
  });

  it("supports prev, next, and reset controls", () => {
    const { result } = renderHook(() => useErRouteFlow());

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("preIntake");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("intake");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("intakeConfirm");

    act(() => result.current.goPrev());
    expect(result.current.state.screen).toBe("intake");

    act(() => result.current.goPrev());
    expect(result.current.state.screen).toBe("preIntake");

    act(() => result.current.reset());
    expect(result.current.state.screen).toBe("preloading");
  });

  it("respects query param override", () => {
    resetUrl("/?screen=direction");
    const { result } = renderHook(() => useErRouteFlow());

    expect(result.current.state.isQaOverride).toBe(true);
    expect(result.current.state.screen).toBe("direction");

    act(() => vi.advanceTimersByTime(10000));
    expect(result.current.state.screen).toBe("direction");

    act(() => result.current.goNext());
    expect(result.current.state.screen).toBe("direction");
  });
});
