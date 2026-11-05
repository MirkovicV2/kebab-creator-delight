import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // External embeds are independent of the local catalog and can be unavailable in CI.
  await page.route(/^https:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

test("loads the home and contact pages with the restaurant data", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Kebabs, platos, raciones y burgers." })).toBeVisible();
  await expect(page.locator("header")).toContainText(/dejavu/i);
  await page.goto("/contacto");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ven, llama");
  await expect(page.locator("main")).toContainText("Rivas-Vaciamadrid");
  expect(errors).toEqual([]);
});

test("loads every category from the embedded database and opens product photos", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/carta");
  await expect(page.locator("#products-grid [id^='product-']")).toHaveCount(12);

  const categories = [
    ["Ensaladas", 4], ["Turcas", 12], ["Raciones", 15], ["Burgers", 6],
    ["Combinados", 1], ["Menus", 17], ["Postres", 16], ["Zumit", 12], ["Bebidas", 13],
  ] as const;
  for (const [label, count] of categories) {
    await page.getByRole("button").filter({ has: page.getByText(label, { exact: true }) }).filter({ visible: true }).click();
    await expect(page.locator("#products-grid [id^='product-']")).toHaveCount(count);
  }

  await page.goto("/carta?producto=turkish-specialties-kebab");
  const product = page.locator("#product-turkish-specialties-kebab");
  await expect(product).toBeVisible();
  await expect(product).toContainText("Falafel 6,00");
  await expect(product.locator("img:visible").first()).toHaveJSProperty("complete", true);
  await expect(product.locator("img:visible").first()).not.toHaveJSProperty("naturalWidth", 0);
  await product.getByRole("button", { name: "Ampliar foto de Kebab", exact: true }).filter({ visible: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Extra de pan");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("preserves old links and the missing-page fallback", async ({ page }) => {
  for (const [from, to] of [["/carta.pdf", "/carta"], ["/pedido-online", "/carta"], ["/nosotros", "/contacto"]]) {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  }
  await page.goto("/pagina-inexistente");
  await expect(page.getByRole("heading", { name: "Esa pagina no existe." })).toBeVisible();
  await page.getByRole("link", { name: "Volver al inicio" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Kebabs, platos");
});
