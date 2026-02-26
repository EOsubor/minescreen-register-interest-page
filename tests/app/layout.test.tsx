/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  test("wraps children with html and body", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <div>Layout Child</div>
      </RootLayout>
    );

    expect(markup).toContain("<html");
    expect(markup).toContain("lang=\"en\"");
    expect(markup).toContain("Layout Child");
  });

  test("exposes metadata for SEO", () => {
    expect(metadata.title).toContain("MineScreen");
    expect(metadata.description).toContain("PDAC 2026");
  });
});
