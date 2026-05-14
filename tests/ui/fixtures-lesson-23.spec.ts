import { test } from '../fixtures/delivery.fixture'
import { PASSWORD, USERNAME } from '../../config/env-data'

test.describe('Mocked order flows', () => {
  test('Order creation with fixture', async ({ Login, Orders }) => {
    await Login.open()
    await Login.signIn(USERNAME, PASSWORD)
    await Login.checkFooterComponents()
    await Orders.createOrder()
    await Orders.checkSuccessfullyCreatedPopup()
  })
})
