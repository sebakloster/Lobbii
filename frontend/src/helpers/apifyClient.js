import { ApifyClient } from "apify-client";

const apifyClient = new ApifyClient({
  token: process.env.REACT_APP_APIFY_TOKEN,
});

export default apifyClient;
