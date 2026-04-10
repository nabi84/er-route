import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import App from "../src/App";
import { I18nProvider } from "../src/i18n/I18nProvider";

function renderWithScreen(screenName: string) {
  window.history.replaceState({}, "", `/?screen=${screenName}`);
  return render(
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}

describe("ER Route screens", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/");
    window.localStorage.setItem("er-route-language", "en");
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("renders preloading screen", () => {
    const { container } = renderWithScreen("preloading");
    expect(screen.getByLabelText("Preloading")).toBeInTheDocument();
    expect(container.querySelector(".preload-logo")).toMatchSnapshot();
  });

  it("renders intake confirmation content", () => {
    renderWithScreen("intake-confirm");
    act(() => vi.advanceTimersByTime(2200));
    expect(
      screen.getByText("Got it. I’m finding the fastest ER for a child with a fever.", {
        selector: ".progressive-text-live"
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Symptom")).toBeInTheDocument();
  });

  it("renders intake interaction", () => {
    renderWithScreen("intake-speaking");
    act(() => vi.advanceTimersByTime(1900));
    expect(screen.getByLabelText("Intake")).toBeInTheDocument();
    expect(screen.getByText("Listening...")).toBeInTheDocument();
    expect(screen.getByLabelText("Ready for voice input")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Continue voice flow"));
    act(() => vi.advanceTimersByTime(3600));
    expect(
      screen.getByText("My child has a high fever all night and she won’t stop crying...", {
        selector: ".progressive-text-ghost"
      })
    ).toBeInTheDocument();
  });

  it("renders results card", () => {
    const { container } = renderWithScreen("results");
    act(() => vi.advanceTimersByTime(1800));
    expect(
      screen.getByText("This gets you treated fastest right now, based on travel time and ER wait.", {
        selector: ".progressive-text-live"
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/min/, { selector: ".time-gradient" })).toBeInTheDocument();
    expect(container.querySelector(".results-card")).toMatchSnapshot();
  });

  it("renders direction card", () => {
    const { container } = renderWithScreen("direction");
    act(() => vi.advanceTimersByTime(1800));
    expect(
      screen.getByText("Let me help you with the driving direction", { selector: ".progressive-text-live" })
    ).toBeInTheDocument();
    expect(screen.getByText("Estimated arrival 6:02 PM")).toBeInTheDocument();
    expect(container.querySelector(".direction-card")).toMatchSnapshot();
  });

  it("renders save spot copy and gradient", () => {
    const { container } = renderWithScreen("save-spot");
    expect(screen.getByText("Save your spot")).toBeInTheDocument();

    // Step 1 prompt completes first (no listening card on step 1)
    act(() => vi.advanceTimersByTime(2300));

    // Advance to step 2
    fireEvent.click(screen.getByLabelText("Continue to next step"));

    // Step 2 prompt completes -> listening appears
    act(() => vi.advanceTimersByTime(2200));
    expect(screen.getByText("Listening...")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Continue to next step"));
    act(() => vi.advanceTimersByTime(3800));
    expect(screen.getByText("She’s 4 year old and the fever has been high since the morning", { selector: ".progressive-text-ghost" })).toBeInTheDocument();

    expect(container.querySelector(".save-spot-gradient")).toMatchSnapshot();
  });
});
