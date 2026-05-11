import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderDetailsPage extends BasePage {
  readonly details: Locator

  constructor(page: Page) {
    super(page)
    this.details = this.page.locator('.order-details')
  }

  async checkVisible(visible: boolean): Promise<void> {
    await expect(this.details).toBeVisible({ visible })
  }
}
