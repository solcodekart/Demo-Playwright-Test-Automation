import PageFactory from "@tests/pages/Page.factory";
import { expect, Page, BrowserContext, APIResponse } from "@playwright/test";
import { step } from "@lib/tools/step.decorator";

export default class ApiSteps extends PageFactory {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  /**
   * Obtain an authentication token via API and store it for later use.
   */
  @step("Obtain authentication token")
  async obtainAuthToken(email: string, password: string) {
    // make request and verify 200 status
    const response: APIResponse = await this.apiActions.obtainAuthToken(
      email,
      password
    );
    expect.soft(response.status()).toBe(200);
    // extract token from response body
    const responseBody: {
      token: string;
      expires: number;
      expires_string: string;
    } = await response.json();
    const authToken: string = responseBody.token;
    expect.soft(authToken).toBeDefined();
    // log the token
    console.log("Obtained Auth Token: ", authToken);
    return authToken;
  }
}
