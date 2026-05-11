import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkEnabled(false)
})

test('error message displayed when incorrect credentials used', async ({}) => {
  // implement test
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible(true)
  // verify at least few elements on the order creation page
})

test('login and create order', async ({}) => {
  // implement test
})
