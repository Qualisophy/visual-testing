import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    // Utilizamos los atributos data-test que inyectamos en el código de Astro
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
  }

  async navigate() {
    // Asumiendo que baseURL está configurado en playwright.config.ts apuntando a Vercel
    await this.page.goto("/");
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginBtn.click();
  }
}
