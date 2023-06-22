// import { test, expect } from "@playwright/test";
// import {
//   CHECKOUT_PAGE,
//   LANDING_PAGE,
//   PASSWORD_SUCCESS,
//   USERNAME_LOGIN_SUCCESS,
// } from "../constant";
// import {
//   genArr,
//   checkPage,
//   delay,
//   fillFormLogin,
//   genRandomString,
//   loginAction,
// } from "../utils";
// import { CHECKIN_PAGE } from "../constant";

// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
//   if (testInfo.status !== testInfo.expectedStatus)
//     console.log(`Did not run as expected, ended up at ${page.url()}`);
// });

// const handleSelectDate = async (page, id, index) => {
//   await page.locator(`#${id}`).click();
//   await page.locator("listbox").isVisible();
//   await page.getByRole("option").nth(index).click();

//   await expect(page.locator("listbox")).toBeHidden();
// };

// const directCheckinPage = async (page) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_SUCCESS);
//   await loginAction(page);
//   await delay(1000);
//   await expect(page).toHaveTitle(/RICH POS/);
//   await checkPage(CHECKIN_PAGE, page, "Rich | Check-in");
// };

// const selectNumpad = async (page, arr) => {
//   for (let i of arr) {
//     await page.locator(`#key-${i}`).click();
//   }
// };

// const handleSelectNumpadSuccess = async (page) => {
//   await selectNumpad(page, genArr(10));
//   await page.locator("#key-OK").click();
//   await delay(200);
//   await page.waitForURL(`${CHECKIN_PAGE}register`);
// };

// const fillFormRegister = async (page) => {
//   await page.locator("#firstName").fill(genRandomString(6));
//   await page.locator("#lastName").fill(genRandomString(6));
//   await page.locator("#mui-component-select-monthOfBirth").click();
//   await page.getByRole("listbox").textContent();

//   await delay(500);

//   await page
//     .getByRole("option")
//     .nth(Math.round(Math.random() * 12))
//     .click();

//   await page.locator("#menu-monthOfBirth div").first().click();

//   await delay(500);
//   await page.locator("#mui-component-select-dayOfBirth").click();
//   await page.getByRole("listbox").textContent();
//   await page
//     .getByRole("option")
//     .nth(Math.round(Math.random() * 30))
//     .click();
//   await page.locator("#menu-dayOfBirth div").first().click();
// };

// const registerSuccess = async (page, baseURL) => {
//   await directCheckinPage(page);
//   await handleSelectNumpadSuccess(page);
//   await fillFormRegister(page);
// };

// const registerEmailSuccess = async (page, baseURL) => {
//   await delay(200);
//   await page.locator("#btn-next").click();

//   await page.locator("#input-email").fill(genRandomString(6));
//   await page
//     .locator("button[aria-label='email-suppfix']")
//     .nth(Math.round(Math.random() * 4))
//     .click();
//   await page.locator("#btn-next").click();
//   await delay(5000);
// };

// const checkinSuccess = async (page) => {
//   await delay(2000);
//   expect(await page.url()).toContain("checkin");
//   const countStaff = await page.locator(".staff-item").count();
//   await delay(200);
//   if (countStaff > 0) {
//     await page
//       .locator(".staff-item")
//       .nth(Math.round(Math.random() * countStaff) - 1)
//       .click();
//   }
// };

// test("Register phone success", async ({ baseURL, page }) => {
//   await directCheckinPage(page);
//   await handleSelectNumpadSuccess(page);
// });

// test("Register phone not enough length", async ({ baseURL, page }) => {
//   await directCheckinPage(page);
//   await selectNumpad(page, genArr(9));
//   await expect(page.locator("#key-OK")).toBeDisabled();
// });

// test("Register phone exist", async ({ baseURL, page }) => {
//   await directCheckinPage(page);
//   for (let index of genArr(10)) {
//     await page.locator(`#key-1`).click();
//   }
//   await page.locator("#key-OK").click();
//   await delay(500);
//   expect(page.url()).toMatch(/checkin/);
// });

// test("Checkin register mail Success", async ({ baseURL, page }) => {
//   await registerSuccess(page, CHECKOUT_PAGE);
//   await registerEmailSuccess(page, CHECKOUT_PAGE);
//   await delay(500);
//   expect(page.url()).toMatch(/checkin/);
// });

// test("Checkin register is not enough field", async ({ baseURL, page }) => {
//   await directCheckinPage(page);
//   await handleSelectNumpadSuccess(page);

//   await page.locator("#firstName").fill(genRandomString(6));
//   await expect(page.locator("#btn-next")).toBeDisabled();
// });

// test("Checkin register, validate all field", async ({ baseURL, page }) => {
//   await registerSuccess(page, baseURL);

//   await page.locator("#firstName").clear();
//   await page.locator("#lastName").clear();

//   expect(
//     await page.locator("#firstName-helper-text").textContent()
//   ).toBeTruthy();
//   expect(
//     await page.locator("#lastName-helper-text").textContent()
//   ).toBeTruthy();

//   await handleSelectDate(page, "mui-component-select-monthOfBirth", 0);

//   expect(
//     await page.locator("#monthOfBirth .MuiFormHelperText-filled").textContent()
//   ).toBeTruthy();

//   expect(
//     await page.locator("#mui-component-select-dayOfBirth").textContent()
//   ).toBeTruthy();

//   await expect(page.locator("#btn-next")).toBeDisabled();
// });

// test("Checkin register mail incorrect format", async ({ baseURL, page }) => {
//   await registerSuccess(page, CHECKIN_PAGE);
//   await page.locator("#btn-next").click();

//   await page.locator("#input-email").fill(genRandomString(6));
//   await delay(50);
//   expect(
//     await page.locator("#input-email-helper-text").textContent()
//   ).toBeTruthy();
// });

// test("Can't check in if doesn't have service", async ({ baseURL, page }) => {
//   await registerSuccess(page, CHECKIN_PAGE);
//   await registerEmailSuccess(page, CHECKIN_PAGE);
//   await checkinSuccess(page);
//   await delay(200);
//   await page.screenshot({ path: "debug.png" });
//   await expect(page.locator("#btn-checkin")).toBeDisabled();
// });

// test("Cancel Checkin | Click back when select staff", async ({
//   baseURL,
//   page,
// }) => {
//   await registerSuccess(page, CHECKIN_PAGE);
//   await registerEmailSuccess(page, CHECKIN_PAGE);
//   await checkinSuccess(page);

//   await delay(200);

//   await page.locator(`button[id='btn-add-staff']`).click();
//   await page.locator("#btn-back").click();
//   expect(page.url()).toEqual(CHECKIN_PAGE);
// });

// test("Checkin Success", async ({ baseURL, page }) => {
//   await registerSuccess(page, CHECKIN_PAGE);
//   await registerEmailSuccess(page, CHECKIN_PAGE);
//   await checkinSuccess(page);

//   const countListService = await page.locator(".list-service-item").count();
//   await page
//     .locator(".list-service-item")
//     .nth(Math.round(Math.random() * countListService - 1))
//     .click();

//   const btnAddService = await page.locator(".btn-add-service").count();
//   if (btnAddService > 0) {
//     for (let index = 0; index < btnAddService; index++) {
//       await delay(20);
//       await page.locator(".btn-add-service").nth(index).click();
//     }
//   }

//   await delay(200);
//   const checkbtn = await page.locator("#btn-checkin").isDisabled();
//   if (!checkbtn) {
//     await page.locator("#btn-checkin").click();
//     await delay(200);
//     expect(await page.locator("#success-text").textContent()).toBeTruthy();
//   }
// });
