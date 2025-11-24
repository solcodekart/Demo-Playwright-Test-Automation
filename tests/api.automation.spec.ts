import { Credentials } from "@lib/enums/Credentials";
import { test } from "../fixtures";

[
  {
    username: Credentials.EMAIL,
    password: Credentials.PASSWORD,
  },
].forEach(({ username, password }) => {
  test.only(
    `API Automation`,
    {
      tag: ["@api"],
      annotation: [
        { type: "username", description: `${username}` },
        { type: "password", description: "secret" },
      ],
    },
    async ({ apiSteps }) => {
      await apiSteps.obtainAuthToken(username, password);
    }
  );
});
