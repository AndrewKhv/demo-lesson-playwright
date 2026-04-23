import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test('Login test + order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
})

test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.createOrder()
})

test('Validation test on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.fill('1')
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.createOrderButton.checkEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('2')
  await orderPage.createOrderButton.checkEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.createOrderButton.checkEnabled(true)
})

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.checkFooterComponents()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterComponents()
  await orderPage.logoutButton.click()
  await loginPage.checkInnerComponents()
})
