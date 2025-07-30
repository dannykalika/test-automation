import "dotenv/config";

export async function open(path) {
  await browser.url(process.env.TEST_URL + path);
}

export async function getCSSValue(element, cssProperty) {
  return await element.getCSSProperty(cssProperty);
}
