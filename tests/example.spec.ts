import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: ">>" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Test comment");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Upvote" }).click();
  await page.getByRole("button", { name: "Upvote" }).click();
  await page.getByRole("button", { name: "<<" }).click();
  await page.getByRole("button", { name: ">>" }).click();
});
