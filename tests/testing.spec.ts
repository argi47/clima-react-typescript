import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'

test('app returns data from API and shows it', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const cityInput = await page.getByPlaceholder('Ciudad')
  const countrySelect = await page.getByTestId('countrySelect')
  const submitInput = await page.getByRole('button', { name: 'Consultar Clima' })

  await expect(cityInput).toBeEmpty()
  await expect(submitInput).toBeVisible()

  // Simulación de llenado de datos y llamad a la API
  await cityInput.fill('Las Vegas')
  await countrySelect.selectOption('US')
  await submitInput.click()

  const title = await page.getByTestId('title')
  const temp = await page.getByTestId('temp')
  const minTemp = await page.getByTestId('minTemp')
  const maxTemp = await page.getByTestId('maxTemp')

  // Comprobamos que los datos se muestran por pantalla
  await expect(title).toBeVisible()
  await expect(temp).toBeVisible()
  await expect(minTemp).toBeVisible()
  await expect(maxTemp).toBeVisible()
})
