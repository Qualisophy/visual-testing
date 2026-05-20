import { Configuration, BatchInfo } from "@applitools/eyes-playwright";

export const batchInfo = new BatchInfo("LuxeCommerce Visual Tests");

export function getEyesConfiguration(): Configuration {
  const config = new Configuration();
  config.setBatch(batchInfo);

  if (!process.env.APPLITOOLS_API_KEY) {
    throw new Error(
      "APPLITOOLS_API_KEY no definida. Configura el .env o los secrets de CI.",
    );
  }

  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  return config;
}
