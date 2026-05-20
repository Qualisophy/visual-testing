import { test, expect } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";
import { LoginPage } from "../pages/LoginPage";
import { getEyesConfiguration } from "../utils/eyesSetup";

test.describe("Autenticación y Navegación Visual", () => {
  let eyes: Eyes;
  let loginPage: LoginPage;

  test.beforeAll(async () => {
    // Inicializamos Applitools una sola vez para la suite
    eyes = new Eyes();
    eyes.setConfiguration(getEyesConfiguration());
  });

  test.beforeEach(async ({ page }, testInfo) => {
    // Instanciamos el POM y abrimos la conexión con Applitools
    loginPage = new LoginPage(page);
    await eyes.open(page, "LuxeCommerce App", testInfo.title, {
      width: 1280,
      height: 720,
    });
  });

  test.afterEach(async () => {
    // Cerramos el test visual y subimos los datos a la nube
    await eyes.close();
  });

  test.afterAll(async () => {
    await eyes.abortIfNotClosed();
  });

  test("Flujo de Login exitoso con validación visual", async ({ page }) => {
    await test.step("Dado que el usuario navega a la página principal (Login)", async () => {
      await loginPage.navigate();
      // Aseguramos que la página cargó comprobando que el botón existe
      await expect(loginPage.loginBtn).toBeVisible();
    });

    await test.step("Cuando rellena el formulario con credenciales válidas", async () => {
      await loginPage.fillCredentials("usuario_prueba_1", "secret_luxe");

      // Requisito 1: Captura de pantalla del formulario con datos correctos
      await eyes.check(
        "1. Formulario de Login Relleno",
        Target.window().fully(),
      );

      // Ejecutamos la acción de login
      await loginPage.submit();
    });

    await test.step("Entonces accede exitosamente a la ventana de productos", async () => {
      // Verificamos funcionalmente que la URL cambió
      await expect(page).toHaveURL(/\/productos/);

      // Verificamos funcionalmente que el grid de productos está visible
      await expect(page.locator("#product-grid")).toBeVisible();

      // Requisito 2: Captura de pantalla de la siguiente ventana
      await eyes.check(
        "2. Página de Productos tras Login",
        Target.window().fully(),
      );
    });
  });
});
