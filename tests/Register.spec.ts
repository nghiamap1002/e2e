// import { expect, test } from "@playwright/test";
// import {
//   BUSSINESS_NAME,
//   BUSSINESS_PHONE,
//   BUSSINESS_PHONE_INVALID,
//   EMAIL_ALREADY,
//   EMAIL_INCORRECT_FORMAT,
//   EMAIL_SUCCESS,
//   LANDING_PAGE,
//   PASSWORD_INCORRECT_FORMAT,
//   PASSWORD_INCORRECT_LENGTH,
//   PASSWORD_SUCCESS,
//   USERNAME_ALREADY,
//   USERNAME_SUCCESS,
// } from "../constant";
// import { checkPage, delay } from "../utils";

// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

//   if (testInfo.status !== testInfo.expectedStatus)
//     console.log(`Did not run as expected, ended up at ${page.url()}`);
// });

// const fillForm = async (
//   page,
//   username,
//   businessName,
//   businessPhone,
//   email,
//   password,
//   confirm
// ) => {
//   await page.getByRole("button", { name: "Sign up" }).click();
//   await page.locator("[data-test-id='input-username'] input").fill(username);
//   await page
//     .locator("[data-test-id='input-bussiness-name'] input")
//     .fill(businessName);
//   await page
//     .locator("[data-test-id='input-bussiness-phone'] input")
//     .fill(businessPhone);
//   await page.locator("[data-test-id='input-email'] input").fill(email);
//   await page.locator("[data-test-id='input-password'] input").fill(password);
//   await page.locator("[data-test-id='input-confirm'] input").fill(confirm);
//   await page.getByRole("button", { name: "Register" }).click();
// };

// test("Username invalid", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     EMAIL_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_INCORRECT_FORMAT,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   await delay(500);
//   expect(
//     await page.locator("[data-test-id='input-username'] p").textContent()
//   ).toBeTruthy();
// });

// test("Username already", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_ALREADY,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   await expect(page.getByRole("alert")).toHaveText(/already/);
// });

// test("Bussiness name required", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     "",
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   expect(
//     await page.locator("[data-test-id='input-bussiness-name'] p").textContent()
//   ).toBeTruthy();
// });

// test("Bussiness phone required", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     "",
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );

//   expect(
//     await page.locator("[data-test-id='input-bussiness-phone'] p").textContent()
//   ).toBeTruthy();
// });

// test("Bussiness phone invalid", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE_INVALID,
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   expect(
//     await page.locator("[data-test-id='input-bussiness-phone'] p").textContent()
//   ).toBeTruthy();
// });

// test("Email is required", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     "",
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );

//   expect(
//     await page.locator("[data-test-id='input-email'] p").textContent()
//   ).toBeTruthy();
// });

// test("Email is incorrect format", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_INCORRECT_FORMAT,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   expect(
//     await page.locator("[data-test-id='input-email'] p").textContent()
//   ).toBeTruthy();
// });

// test("Email already", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_ALREADY,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   await expect(page.getByRole("alert")).toHaveText(/already/);
// });

// test("Password is not enough length", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_INCORRECT_LENGTH,
//     PASSWORD_INCORRECT_LENGTH
//   );
//   await page.waitForTimeout(1000);
//   expect(
//     await page.locator("[data-test-id='input-password'] p").textContent()
//   ).toBeTruthy();
// });

// test("Password is incorrect format", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_INCORRECT_FORMAT,
//     PASSWORD_INCORRECT_FORMAT
//   );
//   expect(
//     await page.locator("[data-test-id='input-password'] p").textContent()
//   ).toBeTruthy();
// });

// test("Password is required", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     "",
//     PASSWORD_SUCCESS
//   );
//   expect(
//     await page.locator("[data-test-id='input-password'] p").textContent()
//   ).toBeTruthy();
// });

// test("Confirm password does not match", async ({ page, baseURL, request }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_INCORRECT_FORMAT
//   );

//   expect(
//     await page.locator("[data-test-id='input-confirm'] p").textContent()
//   ).toBeTruthy();
// });

// test("Register success", async ({ page, baseURL }) => {
//   await checkPage(LANDING_PAGE, page, "RICH Log-in");
//   await fillForm(
//     page,
//     USERNAME_SUCCESS,
//     BUSSINESS_NAME,
//     BUSSINESS_PHONE,
//     EMAIL_SUCCESS,
//     PASSWORD_SUCCESS,
//     PASSWORD_SUCCESS
//   );
//   await expect(page.getByRole("alert")).toHaveText(/successfull/);
// });
