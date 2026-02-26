import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/components/hero";
import { ValueProps } from "@/app/components/value-props";
import { HowItWorks } from "@/app/components/how-it-works";
import { Footer } from "@/app/components/footer";

describe("Static sections", () => {
  test("Hero renders headline and CTA", () => {
    render(<Hero />);

    expect(screen.getByText("Mining Due Diligence,")).toBeInTheDocument();
    expect(screen.getByText("Reimagined")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register your interest/i })).toBeInTheDocument();
  });

  test("ValueProps renders all value cards", () => {
    render(<ValueProps />);

    expect(screen.getByText("Hours, Not Weeks")).toBeInTheDocument();
    expect(screen.getByText("Analysis Speed")).toBeInTheDocument();
    expect(screen.getByText("3+ Standards")).toBeInTheDocument();
    expect(screen.getByText("NI 43-101 / JORC / S-K 1300")).toBeInTheDocument();
    expect(screen.getByText("80+ Fields")).toBeInTheDocument();
    expect(screen.getByText("Metallurgical Data")).toBeInTheDocument();
    expect(screen.getByText("Institutional")).toBeInTheDocument();
    expect(screen.getByText("Grade Analysis")).toBeInTheDocument();
  });

  test("HowItWorks renders steps", () => {
    render(<HowItWorks />);

    expect(screen.getByText("Ingest via API")).toBeInTheDocument();
    expect(screen.getByText("AI Analyzes")).toBeInTheDocument();
    expect(screen.getByText("Receive Intelligence")).toBeInTheDocument();
  });

  test("Footer renders contact and year", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getAllByText(year, { exact: false }).length).toBeGreaterThan(0);
    expect(screen.getByText("info@minescreen.ai")).toBeInTheDocument();
    expect(screen.getByText(/PDAC 2026/i)).toBeInTheDocument();
  });
});
