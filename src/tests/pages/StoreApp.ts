import { expect, type Locator, type Page } from "@playwright/test";

export class StoreApp {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- ACCIONES DE PRODUCTOS ---
  async sortProducts(optionValue: "az" | "za" | "lohi" | "hilo") {
    await this.page
      .locator('[data-test="product-sort-container"]')
      .selectOption(optionValue);
  }

  async addToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  // --- ACCIONES DE CARRITO ---
  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  // --- ACCIONES DE CHECKOUT ---
  async fillShippingDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async confirmPurchase() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
