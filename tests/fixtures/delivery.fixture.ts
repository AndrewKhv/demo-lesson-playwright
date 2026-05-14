import { Page, test as base } from '@playwright/test'
import { PASSWORD, SERVICE_URL, USERNAME } from '../../config/env-data'
import { ENDPOINTS } from '../../utils/endpoints'
import { LoginPage } from '../pages/login-page'
import { OrderPage } from '../pages/order-page'

type Fixtures = {
  auth: { jwt: string }
  orderId: string
  mainPage: Page
  Login: LoginPage
  Orders: OrderPage
}

export const test = base.extend<Fixtures>({
  auth: async ({ request }, use) => {
    console.log('Init: getting jwt')
    const response = await request.post(`${SERVICE_URL}${ENDPOINTS.STUDENTS}`, {
      data: {
        username: `${USERNAME}`,
        password: `${PASSWORD}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const jwt = await response.text()

    await use({ jwt })
  },

  orderId: async ({ auth, request }, use) => {
    const response = await request.post(`${SERVICE_URL}${ENDPOINTS.ORDERS}`, {
      data: {
        status: 'OPEN',
        customerName: 'test',
        customerPhone: 'test',
        comment: 'test',
      },
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    })

    const responseData = await response.json()
    const orderId = responseData.id
    console.log('order created with id: ', orderId)
    await use(orderId)
  },

  mainPage: async ({ context, auth }, use) => {
    await context.addInitScript((token) => {
      localStorage.setItem('jwt', token)
    }, auth.jwt)

    const mainPage = await context.newPage()

    await mainPage.route(`${SERVICE_URL}${ENDPOINTS.ORDERS}/*`, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.continue()
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 'DELIVERED',
            courierId: null,
            customerName: 'mocked customer',
            customerPhone: '99887766',
            comment: '',
            id: 9999,
          }),
        })
      }
    })

    await mainPage.goto(SERVICE_URL)
    await use(mainPage)
  },

  Login: async ({ page }, use) => {
    const Login = new LoginPage(page)
    await use(Login)
  },

  Orders: async ({ page }, use) => {
    const Orders = new OrderPage(page)
    await use(Orders)
  },
})

export { expect } from '@playwright/test'
