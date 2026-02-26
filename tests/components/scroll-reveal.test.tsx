import { render, waitFor } from "@testing-library/react";
import { ScrollReveal } from "@/app/components/scroll-reveal";

describe("ScrollReveal", () => {
  test("falls back to immediate visibility without IntersectionObserver", async () => {
    const saved = window.IntersectionObserver;
    // Remove IntersectionObserver to trigger the fallback branch.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).IntersectionObserver;

    const { container } = render(
      <div>
        <div data-testid="target" className="reveal" />
        <ScrollReveal />
      </div>
    );

    const target = container.querySelector("[data-testid='target']");
    await waitFor(() => {
      expect(target).toHaveClass("visible");
    });

    if (saved) {
      window.IntersectionObserver = saved;
    }
  });

  test("reveals elements when IntersectionObserver is available", async () => {
    const saved = window.IntersectionObserver;

    class TestIntersectionObserver {
      private callback: IntersectionObserverCallback;

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }

      observe(target: Element) {
        this.callback(
          [
            { isIntersecting: false, target } as IntersectionObserverEntry,
            { isIntersecting: true, target } as IntersectionObserverEntry,
          ],
          this
        );
      }

      disconnect() {}
    }

    window.IntersectionObserver = TestIntersectionObserver as unknown as typeof IntersectionObserver;

    const { container, unmount } = render(
      <div>
        <div data-testid="target" className="reveal" />
        <ScrollReveal />
      </div>
    );

    const target = container.querySelector("[data-testid='target']");
    await waitFor(() => {
      expect(target).toHaveClass("visible");
    });

    expect(document.documentElement.classList.contains("reveal-ready")).toBe(true);

    unmount();
    expect(document.documentElement.classList.contains("reveal-ready")).toBe(false);

    if (saved) {
      window.IntersectionObserver = saved;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).IntersectionObserver;
    }
  });
});
