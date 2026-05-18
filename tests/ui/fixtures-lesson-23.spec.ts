import { test } from '../fixtures/delivery.fixture'

test.describe('Mocked order flows', () => {
  test('Order creation with fixture', async ({ mainPage, Orders }) => {
    await Orders.createOrder()
    await Orders.checkSuccessfullyCreatedPopup()
  })
})
