import { APIRequestContext, APIResponse } from "@playwright/test";
import { ENV, testConfig } from "@testconfig";

export default class ApiActions {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = testConfig[ENV]["api"];
  }

  setHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    };
  }

  async obtainAuthToken(email: string, password: string) {
    const url: string = this.baseURL + "login/token";
    const body = {
      email: email,
      password: password,
      domain: "st2016",
    };

    // log request values:
    console.log(`POST: ${url}`);
    console.log(`Request Body: \n, ${JSON.stringify(body, null, 2)}`);

    // make request
    const response: APIResponse = await this.request.post(url, {
      headers: this.setHeaders(),
      data: body,
    });

    // log the response
    console.log("Response Status: ", response.status);
    console.log(
      "Response Body: \n",
      JSON.stringify(await response.json(), null, 2)
    );

    return response;
  }
}
