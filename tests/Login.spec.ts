// import { expect, test } from "@playwright/test";
// import {
//   LANDING_PAGE,
//   PASSWORD_INCORRECT,
//   PASSWORD_INCORRECT_FORMAT,
//   PASSWORD_INCORRECT_LENGTH,
//   PASSWORD_NULL,
//   PASSWORD_SUCCESS,
//   USERNAME_LOGIN_SUCCESS,
// } from "../constant";
// import { checkPage, delay, fillFormLogin, loginAction } from "../utils";

// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
//   if (testInfo.status !== testInfo.expectedStatus)
//     console.log(`Did not run as expected, ended up at ${page.url()}`);
// });

// test("Login success", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_SUCCESS);
//   await loginAction(page);
//   await delay(400);
//   await expect(page).toHaveTitle("RICH POS");
// });

// test("Login with password is not enough length", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_INCORRECT_LENGTH);
//   await loginAction(page);
//   expect(page.locator("[data-test-id='input-password'] p")).toBeTruthy();
// });

// test("Login password null", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");

//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_NULL);
//   await loginAction(page);
//   expect(page.locator("[data-test-id='input-password'] p")).toBeTruthy();
// });

// test("Login password is incorrect format", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_INCORRECT_FORMAT);
//   await loginAction(page);
//   await expect(page.getByRole("alert")).toHaveText(/Incorrect/);
// });

// test("Login password incorrect", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_INCORRECT);
//   await loginAction(page);
//   await expect(page.getByRole("alert")).toHaveText(/Incorrect/);
// });
