import { test as base } from "@playwright/test";

import PageFactory from "./tests/pages/Page.factory";
import ApiSteps from "@tests/steps/Api.steps";

type MyFixtures = {
  apiSteps: ApiSteps;
};

export const test = base.extend<MyFixtures>({
  // pageFactory: async ({ page, context }, use) => {
  //   await use(new MyFixtures(page, context));
  // },
  apiSteps: async ({ page, context }, use) => {
    await use(new ApiSteps(page, context));
  },
});

export { expect } from "@playwright/test";
