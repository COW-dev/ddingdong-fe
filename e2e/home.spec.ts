import { test, expect } from '@playwright/test';

// 환경설정 확인용 테스트 코드
test('homepage has title and search bar', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('띵동');

  const searchInput = page.getByPlaceholder('동아리를 검색해요');
  await expect(searchInput).toBeVisible();

  await searchInput.fill('테스트 동아리');
  await expect(searchInput).toHaveValue('테스트 동아리');
});
