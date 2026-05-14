import { expect, Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly url: string
  readonly footer: Locator
  readonly langBtnRu: Locator
  readonly langBtnEn: Locator
  readonly navFooter: Locator

  constructor(page: Page, url: string) {
    this.page = page
    this.url = url
    this.footer = page.locator('.Footer')
    this.langBtnRu = this.footer.locator('.language__button').nth(1)
    this.langBtnEn = this.footer.locator('.language__button').nth(0)
    this.navFooter = this.footer.locator('.nav-footer')
  }

  async checkFooterComponents(): Promise<void> {
    await expect(this.navFooter).toBeVisible()
    await expect(this.langBtnRu).toBeVisible()
    await expect(this.langBtnEn).toBeVisible()
  }

  async open() {
    await this.page.goto(this.url)
  }
}
