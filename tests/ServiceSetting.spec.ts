// import { test, expect } from "@playwright/test";
// import {
//   LANDING_PAGE,
//   PASSWORD_SUCCESS,
//   USERNAME_LOGIN_SUCCESS,
// } from "../constant";
// import {
//   checkPage,
//   delay,
//   fillFormLogin,
//   genRandomString,
//   loginAction,
// } from "../utils";

// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
//   if (testInfo.status !== testInfo.expectedStatus)
//     console.log(`Did not run as expected, ended up at ${page.url()}`);
// });

// const directToServiceSetting = async (page) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_SUCCESS);
//   await loginAction(page);
//   await expect(page).toHaveTitle("RICH POS");
//   await delay(50);
//   await page.getByRole("link", { name: "Business Settings" }).click();
//   await delay(2000);

//   for (let index = 0; index < 4; index++) {
//     await delay(20);
//     await page.locator("#key-0").click();
//   }
//   await delay(500);
//   await page.locator(`#servicesetup`).click();
// };

// test("Add category", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   await delay(200);
//   await page.locator("button[data-test-id='btn-add-cat']").click();

//   await delay(20);
//   await page
//     .locator(`[data-test-id=input-category-name] input`)
//     .fill(`Automation Test ${randomNumber(100)}`);
//   await page.screenshot({ path: "debug.png" });
//   await page.locator(`button[data-test-id='btn-save-cat']`).click();
//   delay(2000);
//   await expect(page.getByRole("alert")).toHaveText(/success/);
// });

// test("Edit category", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   const btn = page.locator(`button[aria-label='more-btn-cate']`);
//   const count = await btn.count();
//   await btn.nth(Math.round(Math.random() * count)).click();
//   await page.locator("[data-test-id='edit-option-cate']").click();
//   await page
//     .locator("[data-test-id='input-cate-name'] input")
//     .fill(`Automation Test ${randomNumber(100)}`);

//   await page.locator("button[data-test-id='btn-save-cate']").click();
//   await delay(2000);
//   await expect(page.getByRole("alert")).toHaveText(/success/);
// });

// test("Delete category", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   const btn = page.locator(`button[aria-label='more-btn-cate']`);
//   const count = await btn.count();
//   await btn.nth(Math.round(Math.random() * count)).click();
//   await page.locator("[data-test-id='delete-option']").click();
//   await delay(200);
//   await page.locator("[data-test-id='btn-delete-cate']").click();
//   await delay(2000);
//   await expect(page.getByRole("alert")).toHaveText(/success/);
// });

// test("Add service with all field is empty", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   await page.locator("button[data-test-id='btn-add-service']").click();

//   await delay(50);

//   await page.locator("button[data-test-id='btn-save-service']").click();

//   expect(page.locator("[data-test-id='input-service-name'] p")).toBeTruthy();
// });

// test("Edit service success", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   const item = page.locator(`.service-item`);
//   const count = await item.count();
//   await delay(200);
//   await item.nth(Math.round(Math.random() * count) - 1).click();

//   await page
//     .locator(`[data-test-id='input-service-name'] input`)
//     .fill(`Automation Test ${randomNumber(100)}`);

//   await page
//     .locator(
//       "[data-test-id='text-area-description'] textarea[aria-invalid='false']"
//     )
//     .fill(genRandomString(randomNumber(100)));
//   await page.locator("button[data-test-id='btn-update-service']").click();
//   await expect(page.getByRole("alert")).toHaveText(/success/);
// });

// test("Edit service with null name", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   const item = page.locator(`.service-item`);
//   const count = await item.count();
//   await item.nth(Math.round(Math.random() * count) - 1).click();

//   await page.locator(`[data-test-id='input-service-name'] input`).clear();
//   await page.locator("button[data-test-id='btn-update-service']").click();

//   expect(page.locator(`[data-test-id='input-service-name'] p`)).toBeTruthy();
// });

// test("Add service success all field", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   await page.locator("button[data-test-id='btn-add-service']").click();
//   await delay(100);

//   await page
//     .locator(`[data-test-id='input-service-name'] input`)
//     .fill(`Automation Test ${randomNumber(100)}`);

//   await page.locator("[data-test-id='select-category']").click();

//   const countOption = await page.getByRole("option").count();

//   await delay(200);
//   await expect(page.getByRole("option").first()).toBeVisible();

//   await page
//     .getByRole("option")
//     .nth(Math.round(Math.random() * countOption) - 1)
//     .click();

//   await page.locator("#menu- div").first().click();
//   await delay(500);

//   await page
//     .locator(
//       "[data-test-id='text-area-description'] textarea[aria-invalid='false']"
//     )
//     .fill(genRandomString(randomNumber(100)));

//   await page
//     .locator(`[data-test-id='input-price'] input`)
//     .fill(randomNumber(100).toString());

//   await page
//     .locator(`[data-test-id='input-service-name'] input`)
//     .fill(randomNumber(100).toString());

//   await page
//     .locator(`[data-test-id='input-supply-fee'] input`)
//     .fill(randomNumber(100).toString());

//   await page.locator("button[data-test-id='btn-save-service']").click();
//   await expect(page.getByRole("alert")).toHaveText(/success/);
// });

// test("Del service", async ({ page, baseURL }) => {
//   await directToServiceSetting(page);
//   const btnDele = page.locator(`button[aria-label='btn-delete-service']`);
//   const count = await btnDele.count();
//   if (count > 0) {
//     await btnDele.nth(Math.round(Math.random() * (count - 1))).click();
//     await delay(600);
//     await page.locator("button[data-test-id='btn-delete-service']").click();
//     await expect(page.getByRole("alert")).toHaveText(/success/);
//   }
// });
