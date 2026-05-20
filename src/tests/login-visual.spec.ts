import { test } from "@playwright/test";
import {
  Eyes,
  Target,
  Configuration,
  BatchInfo,
} from "@applitools/eyes-playwright";
import { LoginPage } from "../page-objects/LoginPage";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("Flujo Visual de Login", () => {
  let eyes: Eyes;

  test.beforeAll(() => {
    const config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY!);
    config.setBatch(new BatchInfo("TestCommerce Master Batch"));

    // Esto hace que, aunque haya diferencias, el test continúe y no lance DiffsFoundError
    // config.setSaveFailedTests(true);

    eyes = new Eyes();
    eyes.setConfiguration(config);
  });

  test("Validar Login e Inventario visualmente", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await eyes.open(page, "LuxeCommerce App", "Flujo de Login", {
      width: 1280,
      height: 720,
    });

    await loginPage.navigate();
    await eyes.check("Pantalla de Login", Target.window().fully());

    await loginPage.login("usuario_prueba_1", "secret_luxe");
    await eyes.check("Pantalla de Productos", Target.window().fully());

    await eyes.close(false);
  });

  test.afterEach(async () => {
    await eyes.abortIfNotClosed();
  });
});
