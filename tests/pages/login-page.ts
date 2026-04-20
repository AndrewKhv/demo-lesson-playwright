import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'

export class LoginPage {
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly valError: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.getByTestId('signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.valError = page.getByTestId('username-input-error')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }

  async checkInnerComponents(): Promise<void> {
    await expect(this.usernameField).toBeVisible()
    await expect(this.passwordField).toBeVisible()
    await expect(this.signInButton).toBeVisible()
  }

  async checkValidationError(): Promise<void> {
    // Пример обхода нескольких одинковых элементов
    await this.usernameField.fill('2')
    await this.passwordField.fill('2')
    await expect(this.valError.nth(0)).toBeVisible()
    await expect(this.valError.nth(1)).toBeVisible()
  }
}
