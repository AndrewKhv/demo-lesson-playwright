import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { NotFoundPage } from './order-not-found-page'
import { OrderDetailsPage } from './order-details-page'

export class OrderPage extends BasePage {
  readonly title: Locator
  readonly statusButton: Button
  readonly createOrderButton: Button
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly confirmationPopup: Locator
  readonly logoutButton: Button

  // search popup
  protected readonly searchPopup: Locator
  readonly searchInput: Locator
  readonly searchButton: Button

  constructor(page: Page) {
    super(page)
    this.title = page.locator('h2')
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.createOrderButton = new Button(page.getByTestId('createOrder-button'))
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page.getByTestId('logout-button'))

    // search popup
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = this.searchPopup.getByTestId('searchOrder-input')
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }

  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await this.statusButton.checkVisible(true)
    await this.createOrderButton.checkVisible(true)
    await expect(this.nameInput).toBeVisible()
    await expect(this.phoneInput).toBeVisible()
    await expect(this.commentInput).toBeVisible()
  }

  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.sentence(5))
    await this.createOrderButton.click()
    await expect(this.confirmationPopup).toBeVisible()
  }

  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.fill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }

  async checkOrderFound(id: number): Promise<OrderDetailsPage> {
    await this.statusButton.click()
    await this.searchInput.fill(`${id}`)
    await this.searchButton.click()
    return new OrderDetailsPage(this.page)
  }
}
