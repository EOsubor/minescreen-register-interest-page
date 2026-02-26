/** @jest-environment node */

import { renderToStaticMarkup } from "react-dom/server";
import Home from "@/app/page";

describe("Home page", () => {
  test("renders core sections", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("MineScreen");
    expect(markup).toContain("Register Your Interest");
  });
});
