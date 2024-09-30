import { test, expect, Page } from "@playwright/test";
import { syntheticDrag } from "../../utils";

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
});

test.describe.skip("Touch swap", async () => {
  test("Touch swap", async () => {
    await page.goto("http://localhost:3001/swap");
    await new Promise((r) => setTimeout(r, 1000));
    await syntheticDrag(page, {
      originEl: { id: "Apple", position: "center" },
      destinationEl: { id: "Banana", position: "center" },
      dragStart: true,
    });
    // await expect(page.locator("#Apple")).not.toHaveClass("item yellow");
    // await expect(page.locator("#Banana")).toHaveClass("item yellow");
    await expect(page.locator("#values_1")).toHaveText("Apple Banana Orange");
    await syntheticDrag(page, {
      originEl: { id: "Apple", position: "center" },
      destinationEl: { id: "Banana", position: "center" },
      drop: true,
    });
    await expect(page.locator("#values_1")).toHaveText("Banana Apple Orange");
  });
});
