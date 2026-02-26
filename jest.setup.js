require("@testing-library/jest-dom");

if (!global.fetch) {
  const fetch = require("node-fetch");
  global.fetch = fetch;
  global.Headers = fetch.Headers;
  global.Request = fetch.Request;
  global.Response = fetch.Response;
}
