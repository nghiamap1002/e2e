import { expect } from "@playwright/test";
import { PASSCODE_RICH } from "../constant";

const checkPage = async (url, page, title = "") => {
  await page.goto(url, { waitUntil: "networkidle" });
  await expect(page).toHaveTitle(title);
};

const loginAction = async (page) =>
  await page.getByRole("button", { name: "Login" }).click();

const fillFormLogin = async (page, username, password) => {
  await page.locator(`[data-test-id='input-username'] input`).fill(username);
  await page.locator(`[data-test-id='input-password'] input`).fill(password);
};

const genRandomString = (length) => {
  var chars = "abcdefghijklmnopqrstuvwxyz";
  var charLength = chars.length;
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const randomNumber = (max: number) => {
  return Math.round(Math.random() * max);
};
const genArr = (length: number) => {
  return Array.from({ length: length }, (_, i) => i);
};

const awaitLoading = async (page, locator) => {
  await expect(page.locator(locator)).toBeVisible();
  await expect(page.locator(locator)).toBeHidden();
};

const randomClickListItem = async (page, locator) => {
  const count = await page.locator(locator).count();
  await page
    .locator(locator)
    .nth(Math.round(Math.random() * (count - 1)))
    .click();
};

const returnLocatorDataTestId = (name: string) => {
  return `[data-test-id='${name}']`;
};

const fillPasscodeWithOwner = async (page: any) => {
  for (let i = 0; i < 4; i++) {
    await page.locator("#key-0").click();
  }
};

const fillPasscodeWithInternal = async (page: any) => {
  const passcodeItem = await page.locator(
    `${returnLocatorDataTestId("passcode-input-item")} input`
  );
  await delay(200);
  const count = await passcodeItem.count();
  if (count === 4) {
    const passcodeRICH = PASSCODE_RICH.split("");
    for (let i = 0; i < count; i++) {
      await passcodeItem.nth(i).fill(passcodeRICH[i]);
    }
  }
};

export {
  randomNumber,
  randomClickListItem,
  returnLocatorDataTestId,
  awaitLoading,
  checkPage,
  loginAction,
  fillFormLogin,
  genRandomString,
  delay,
  genArr,
  fillPasscodeWithOwner,
  fillPasscodeWithInternal,
};
