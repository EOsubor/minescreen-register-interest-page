import { act, render, waitFor } from "@testing-library/react";
import { Navbar } from "@/app/components/navbar";

describe("Navbar", () => {
  test("initializes scroll state on mount and updates on scroll", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 80,
      writable: true,
    });

    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();

    await waitFor(() => {
      expect(nav).toHaveClass("bg-surface-base/80");
    });

    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 0,
        writable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(nav).toHaveClass("bg-transparent");
    });
  });
});
