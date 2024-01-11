import puppeteer from 'puppeteer'
export async function getImageUrl(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="searchResults"]/ul/li[1]/span/a/img')
    const src = await el.getProperty('src')
    const srcTxt = await src.jsonValue()
    browser.close()
    return srcTxt
}
