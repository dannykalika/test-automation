import "dotenv/config";

export async function open(path) {
  await browser.url(process.env.test_url + path);
}

export async function getCSSValue(element, cssProperty) {
  return await element.getCSSProperty(cssProperty);
}
