import { test, expect } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";
import { LoginPage } from "../pages/LoginPage";
import { StoreApp } from "../pages/StoreApp";
import { getEyesConfiguration } from "../utils/eyesSetup";

test.describe("Flujo de Compra E2E Completo", () => {
  let eyes: Eyes;
  let loginPage: LoginPage;
  let storeApp: StoreApp;

  test.beforeAll(async () => {
    eyes = new Eyes();
    eyes.setConfiguration(getEyesConfiguration());
  });

  test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);
    storeApp = new StoreApp(page);

    await eyes.open(page, "LuxeCommerce App", testInfo.title, {
      width: 1280,
      height: 720,
    });
  });

  test.afterEach(async () => {
    await eyes.close();
  });

  test.afterAll(async () => {
    await eyes.abortIfNotClosed();
  });

  test("El usuario puede filtrar, añadir al carrito y completar la compra", async ({
    page,
  }) => {
    await test.step("Dado que el usuario inicia sesión correctamente", async () => {
      await loginPage.navigate();
      await loginPage.fillCredentials("usuario_prueba_1", "secret_luxe");
      await loginPage.submit();
      await expect(page).toHaveURL(/\/productos/);
    });

    await test.step("Cuando el usuario ordena los productos por precio (Mayor a Menor)", async () => {
      await storeApp.sortProducts("hilo");
      // Validamos visualmente que el grid se ha reordenado
      await eyes.check(
        "Inventario Ordenado Mayor a Menor",
        Target.window().fully(),
      );
    });

    await test.step("Y añade el Chronos Minimalist al carrito", async () => {
      await storeApp.addToCart("chronos");
      // Verificamos que el toast de éxito aparece en el DOM
      await expect(page.locator('[data-test="success-toast"]')).toBeVisible();
    });

    await test.step("Y navega al carrito de la compra", async () => {
      await storeApp.goToCart();
      await expect(page).toHaveURL(/\/carrito/);
      await eyes.check(
        "Página de Carrito con 1 producto",
        Target.window().fully(),
      );
    });

    await test.step("Entonces procede al checkout y rellena sus datos", async () => {
      await storeApp.proceedToCheckout();
      await expect(page).toHaveURL(/\/resumen/);

      await storeApp.fillShippingDetails("Juan", "Pérez", "29001");
      await eyes.check(
        "Formulario de Resumen completado",
        Target.window().fully(),
      );
    });

    await test.step("Y al confirmar la compra visualiza la pantalla de éxito", async () => {
      await storeApp.confirmPurchase();
      await expect(page).toHaveURL(/\/confirmacion/);

      const successHeader = page.locator('[data-test="complete-header"]');
      await expect(successHeader).toHaveText("¡Gracias por tu compra!");

      await eyes.check(
        "Pantalla de Confirmación de Pedido",
        Target.window().fully(),
      );
    });
  });
});
