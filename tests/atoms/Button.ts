import { expect, Locator } from '@playwright/test'

export class Button {
  readonly btnLocator: Locator

  constructor(btnLocator: Locator) {
    this.btnLocator = btnLocator
  }

  async click(force = false): Promise<void> {
    await this.btnLocator.click({ force })
  }

  async checkVisible(visible: boolean): Promise<void> {
    await expect(this.btnLocator).toBeVisible({ visible })
  }

  async checkEnabled(enabled: boolean): Promise<void> {
    await expect(this.btnLocator).toBeEnabled({ enabled })
  }
}
