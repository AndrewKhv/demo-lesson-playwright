import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'

export class LoginPage extends BasePage {
  private readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly valError: Locator

  constructor(page: Page) {
    super(page)
    this.signInButton = new Button(page.getByTestId('signIn-button'))
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
    await this.signInButton.checkVisible(true)
  }

  async checkValidationError(): Promise<void> {
    // Пример обхода нескольких одинковых элементов
    await this.usernameField.fill('2')
    await this.passwordField.fill('2')
    await expect(this.valError.nth(0)).toBeVisible()
    await expect(this.valError.nth(1)).toBeVisible()
  }
}
