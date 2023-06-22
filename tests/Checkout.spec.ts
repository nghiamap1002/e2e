import { expect, test } from "@playwright/test";
import {
  GIFTCARD_EXPIRE,
  GIFTCARD_NOT_ENOUGH_MONEY,
  LANDING_PAGE,
  LOCAL_PAGE,
  PASSWORD_SUCCESS,
  USERNAME_LOGIN_SUCCESS,
} from "../constant";
import {
  awaitLoading,
  delay,
  fillFormLogin,
  fillPasscodeWithInternal,
  fillPasscodeWithOwner,
  genArr,
  genRandomString,
  loginAction,
  randomClickListItem,
  randomNumber,
  returnLocatorDataTestId,
} from "../utils";

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

const directToBusiness = async (page) => {
  await page.goto(LANDING_PAGE, { waitUntil: "networkidle" });
  await fillFormLogin(page, USERNAME_LOGIN_SUCCESS, PASSWORD_SUCCESS);
  await loginAction(page);
  await awaitLoading(page, ".bounce-loading");
};

const addMultipleStaffandProduct = async (page) => {
  await randomClickListItem(page, "[data-test-id='staff-card']");
  await delay(100);
  await randomClickListItem(page, "[data-test-id='cate-item']");
  await randomClickListItem(page, "[data-test-id='product-item']");
  await delay(100);
  await page.locator("[data-test-id='btn-add-staff']").click();
  await delay(100);
  await randomClickListItem(page, "[data-test-id='staff-card']");
  await randomClickListItem(page, "[data-test-id='product-item']");
};

const selectExistCustomer = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-edit-customer")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await randomClickListItem(page, returnLocatorDataTestId("customer-item"));
  await page.locator(returnLocatorDataTestId("btn-save-edit-customer")).click();
};

const addNewCustomer = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-edit-customer")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .locator(`${returnLocatorDataTestId("input-cusomter-name")} input`)
    .fill(genRandomString(10));

  await page
    .locator(`${returnLocatorDataTestId("input-phone-number")} input`)
    .fill(genArr(11).join(""));

  await page.locator(returnLocatorDataTestId("btn-save-edit-customer")).click();
};

const discountPercentAll = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-open-discount")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .locator(`${returnLocatorDataTestId("input-item-discount")} input`)
    .fill(randomNumber(100).toString());
  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
};

const discount = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-open-discount")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator(returnLocatorDataTestId("amount-discount")).click();
  await page.locator(returnLocatorDataTestId("discount-divide-ratio")).click();

  await page
    .locator(`${returnLocatorDataTestId("input-item-discount-amount")} input`)
    .fill(randomNumber(500).toString());
  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const distcountServicePercentage = async (page) => {
  await randomClickListItem(page, returnLocatorDataTestId("product-cart-item"));
  await expect(page.getByRole("dialog")).toBeVisible();

  await page
    .locator(`${returnLocatorDataTestId("input-discount-percent")} input`)
    .fill(randomNumber(100).toString());

  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const distcountServiceAmount = async (page) => {
  await randomClickListItem(page, returnLocatorDataTestId("product-cart-item"));
  await expect(page.getByRole("dialog")).toBeVisible();

  await page
    .locator(`${returnLocatorDataTestId("input-discount-amount")} input`)
    .fill(randomNumber(10).toString());

  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};
const distcountStaffPercentage = async (page) => {
  await randomClickListItem(page, returnLocatorDataTestId("staff-cart-item"));
  await expect(page.getByRole("dialog")).toBeVisible();

  await page
    .locator(`${returnLocatorDataTestId("input-discount-percent")} input`)
    .fill(randomNumber(100).toString());

  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const distcountStaffAmount = async (page) => {
  await randomClickListItem(page, returnLocatorDataTestId("staff-cart-item"));
  await expect(page.getByRole("dialog")).toBeVisible();

  await delay(200);
  await page
    .locator(`${returnLocatorDataTestId("input-discount-amount")} input`)
    .fill(randomNumber(10).toString());
  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const discountAmountDivideAll = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-open-discount")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator(returnLocatorDataTestId("amount-discount")).click();
  await page.locator(returnLocatorDataTestId("discount-divide-all")).click();

  await page
    .locator(`${returnLocatorDataTestId("input-item-discount-amount")} input`)
    .fill(randomNumber(500).toString());
  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const discountAmountDivideByRatio = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-open-discount")).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.locator(returnLocatorDataTestId("amount-discount")).click();
  await page.locator(returnLocatorDataTestId("discount-divide-ratio")).click();

  await page
    .locator(`${returnLocatorDataTestId("input-item-discount-amount")} input`)
    .fill(randomNumber(500).toString());
  await page.locator(returnLocatorDataTestId("btn-save-discount")).click();
  await expect(page.getByRole("dialog")).toBeHidden();
};

const checkAlertSuccess = async (page) => {
  await expect(page.getByRole("alert")).toHaveText(/success/);
  await delay(1000);
  // await expect(page.getByRole("alert")).toBeHidden();
};

const checkAlertSuccessHaveModal = async (page) => {
  await expect(page.locator(".Toastify")).toHaveText(/successfully/);
  await expect(page.locator(".Toastify").getByRole("alert")).toBeHidden();
};

const passcodeAndPaymentExternalCC = async (page) => {
  await page
    .locator(returnLocatorDataTestId("btn-external-credit-card-payment"))
    .click();
  await fillPasscodeWithOwner(page);

  await expect(page.locator("#outlined-basic")).toBeVisible();
  await page.locator("#outlined-basic").fill(genArr(4).join("").toString());

  await page.locator(returnLocatorDataTestId("btn-payment")).click();
};

const paymentGiftCard = async (page) => {
  await page.locator(returnLocatorDataTestId("btn-giftcard-payment")).click();

  await expect(page.getByRole("dialog")).toBeVisible();
  await delay(100);
  await page.locator("#outlined-basic").fill("123456789");
  await page.locator("#outlined-basic").focus();
  await delay(500);
  await page.locator("#outlined-basic").press("Enter");
  await checkAlertSuccessHaveModal(page);
  await delay(500);

  if (page.locator(returnLocatorDataTestId("btn-payment")).isEnabled()) {
    await page.locator(returnLocatorDataTestId("btn-payment")).click();
  }
};

const fillCashInputAndPayment = async (page) => {
  await page.locator("[data-test-id='btn-cash-payment']").click();
  await page
    .locator("[data-test-id='input-cash'] input")
    .fill(randomNumber(1000000).toString());

  await page.locator("[data-test-id='btn-payment']").click();
};

const directToAdminSetting = async (page) => {
  await page
    .locator(returnLocatorDataTestId("business-settings-route"))
    .click();
  await fillPasscodeWithInternal(page);
  await expect(page.locator("#adminsettings")).toBeVisible();
  await page.locator("#adminsettings").click();
};

const settingCashDiscount = async (page) => {
  await directToAdminSetting(page);
  await page.locator(returnLocatorDataTestId("cash-discount-option")).click();
  await page
    .locator(`${returnLocatorDataTestId("cash-discount-input")} input`)
    .fill(randomNumber(20).toString());
  await page.locator(returnLocatorDataTestId("btn-save-admin-setting")).click();
};

const settingTransactionFeePercentage = async (page) => {
  await directToAdminSetting(page);
  await page.locator(returnLocatorDataTestId("transaction-fee-option")).click();
  await page
    .locator(returnLocatorDataTestId("transaction-fee-percentage-option"))
    .click();

  await page
    .locator(
      `${returnLocatorDataTestId("transaction-fee-percentage-input")} input`
    )
    .fill(randomNumber(20).toString());
  await page.locator(returnLocatorDataTestId("btn-save-admin-setting")).click();
};

const settingTransactionFeeAmount = async (page) => {
  await directToAdminSetting(page);
  await page.locator(returnLocatorDataTestId("transaction-fee-option")).click();
  await page
    .locator(returnLocatorDataTestId("transaction-fee-amount-option"))
    .click();

  await page
    .locator(`${returnLocatorDataTestId("transaction-fee-amount-input")} input`)
    .fill(randomNumber(20).toString());
  await page.locator(returnLocatorDataTestId("btn-save-admin-setting")).click();
};

const directToCheckoutPage = async (page) => {
  await page.locator(returnLocatorDataTestId("checkout-route")).click();
};

// test("Checkout with cash, select exist customer, discount all ,cash discount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingCashDiscount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(200);
//   await discountPercentAll(page);
//   await fillCashInputAndPayment(page);
//   await expect(
//     page.locator(returnLocatorDataTestId("loading-progress"))
//   ).toBeVisible();
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, staff discount amount, transaction fee percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeePercentage(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await delay(2000);
//   await checkAlertSuccess(page);
//   await distcountStaffAmount(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(2000);
//   await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, staff discount percentage, transaction fee amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeeAmount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await delay(2000);
//   // await checkAlertSuccess(page);
//   await distcountStaffPercentage(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(2000);
//   await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, divide discount all", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await delay(2000);
//   // await checkAlertSuccess(page);
//   await discountAmountDivideAll(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   // await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, divide discount by ratio", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await delay(2000);
//   // await checkAlertSuccess(page);
//   await discountAmountDivideByRatio(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   // await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, service discount percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await delay(2000);
//   // await checkAlertSuccess(page);
//   await distcountServicePercentage(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   // await checkAlertSuccess(page);
// });

// test("Checkout with cash, add new customer, service discount amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await checkAlertSuccess(page);
//   await distcountServiceAmount(page);
//   await fillCashInputAndPayment(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   await checkAlertSuccess(page);
// });

// test("Selling giftcard exist customer", async ({ browser }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);

//   await randomClickListItem(page, "[data-test-id='staff-card']");
//   await page.locator(returnLocatorDataTestId("sell-giftcard")).click();

//   await page
//     .locator("[data-test-id='giftcard-id-input'] input")
//     .fill(randomNumber(10000000).toString());

//   await delay(50);
//   await awaitLoading(page, returnLocatorDataTestId("fetching-giftcard"));

//   await delay(50);

//   await page
//     .locator("[data-test-id='top-up-amount-input'] input")
//     .fill(randomNumber(100).toString());

//   await page
//     .locator("[data-test-id='top-up-amount-input'] input")
//     .evaluate((e) => e.blur());

//   await page.locator(returnLocatorDataTestId("btn-add-to-cart")).click();

//   await checkAlertSuccess(page);
//   await selectExistCustomer(page);
//   await fillCashInputAndPayment(page);
//   await delay(200);
//   await checkAlertSuccess(page);
// });

// test("Selling giftcard with add new customer", async ({ browser }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);

//   await randomClickListItem(page, "[data-test-id='staff-card']");
//   await page.locator(returnLocatorDataTestId("sell-giftcard")).click();

//   await page
//     .locator("[data-test-id='giftcard-id-input'] input")
//     .fill(randomNumber(10000000).toString());

//   await delay(50);
//   await awaitLoading(page, returnLocatorDataTestId("fetching-giftcard"));

//   await delay(50);

//   await page
//     .locator("[data-test-id='top-up-amount-input'] input")
//     .fill(randomNumber(100).toString());

//   await page
//     .locator("[data-test-id='top-up-amount-input'] input")
//     .evaluate((e) => e.blur());

//   await page.locator(returnLocatorDataTestId("btn-add-to-cart")).click();

//   await checkAlertSuccess(page);
//   await selectExistCustomer(page);
//   await fillCashInputAndPayment(page);
//   await delay(200);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, new customer, discount all, cash discount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingCashDiscount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await addNewCustomer(page);
//   await checkAlertSuccess(page);
//   await discountPercentAll(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, staff discount percentage, transaction fee percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeePercentage(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(200);
//   await distcountStaffPercentage(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, staff discount amount ,transaction fee amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeeAmount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(500);
//   await distcountStaffAmount(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, service discount percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(500);
//   await distcountServicePercentage(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, service discount amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(500);
//   await distcountServiceAmount(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, divide all", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(500);
//   await discountAmountDivideAll(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout and add staff with external credit card, exist customer, divide all ratio", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(500);
//   await discountAmountDivideByRatio(page);
//   await passcodeAndPaymentExternalCC(page);
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(100);
//   await checkAlertSuccess(page);
// });

// test("Checkout add staff with giftcard, new customer, discount all, cash discount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingCashDiscount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await paymentGiftCard(page);
//   await delay(200);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, staff discount percentage, transaction fee percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeePercentage(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await distcountStaffPercentage(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, staff discount amount, transaction fee amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await settingTransactionFeeAmount(page);
//   await checkAlertSuccess(page);
//   await directToCheckoutPage(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await distcountStaffAmount(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, service discount percentage", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await distcountServicePercentage(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, service discount amount", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await distcountServiceAmount(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, discount divide all", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await discountAmountDivideAll(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout add staff with giftcard, new customer, discount divide ratio", async ({
//   browser,
// }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await discountAmountDivideByRatio(page);
//   await paymentGiftCard(page);
//   await delay(100);
//   await expect(page.locator(".Toastify")).toHaveText(/success/);
// });

// test("Checkout with giftcard is not enough money", async ({ page }) => {
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await page.locator("[data-test-id='btn-giftcard-payment']").click();

//   await page.locator("#outlined-basic").fill(GIFTCARD_NOT_ENOUGH_MONEY);
//   await page.locator("#outlined-basic").press("Enter");
//   await awaitLoading(page, returnLocatorDataTestId("loading-progress"));
//   await delay(200);
//   await expect(page.locator(".Toastify")).toHaveText(/successfully/);
//   await expect(
//     page.locator(returnLocatorDataTestId("btn-payment"))
//   ).toBeDisabled();
// });

// test("Checkout with giftcard doesn't exist", async ({ browser }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await delay(100);
//   await page.locator("[data-test-id='btn-giftcard-payment']").click();

//   await page.locator("#outlined-basic").fill(randomNumber(99999999).toString());
//   await delay(500);
//   await page.locator("#outlined-basic").press("Enter");
//   await expect(page.locator(".Toastify")).toHaveText(/exist/);
// });

// test("Checkout with giftcard is expire", async ({ browser }) => {
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: "videos/checkout",
//       size: { width: 640, height: 480 },
//     },
//   });
//   const page = await context.newPage();
//   await directToBusiness(page);
//   await addMultipleStaffandProduct(page);
//   await selectExistCustomer(page);
//   await page.locator("[data-test-id='btn-giftcard-payment']").click();

//   await page.locator("#outlined-basic").fill(GIFTCARD_EXPIRE);
//   await delay(500);
//   await page.locator("#outlined-basic").press("Enter");
//   await delay(500);
//   await expect(page.locator(".Toastify")).toHaveText(/expired/);
// });

// test("Delete ticket onCLick header", async ({ browser, page }) => {
//   await directToBusiness(page);
//   await randomClickListItem(page, returnLocatorDataTestId("staff-card"));
//   await page.locator(returnLocatorDataTestId("close-ticket")).last().click();
//   await expect(
//     page.locator(returnLocatorDataTestId("staff-card")).first()
//   ).toBeVisible();
// });

// test("Delete ticket in checkout detail", async ({ browser, page }) => {
//   await directToBusiness(page);
//   await randomClickListItem(page, returnLocatorDataTestId("staff-card"));
//   await delay(100);
//   await page.locator("[data-test-id='btn-delete-ticket']").click();
//   await expect(
//     page.locator(returnLocatorDataTestId("staff-card")).first()
//   ).toBeVisible();
// });
