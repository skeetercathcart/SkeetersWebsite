const puppeteer = require('puppeteer');

async function carpetScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal Carpet Compatibility Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

    try {
        await page.waitForSelector('[data-testid="pod-section"]', { timeout: 5000 });
    } catch {
        await page.reload()
    }

    // Gets href for each carpet on a page
    const hrefData = await page.$$eval('[data-testid=product-header] a.sui-text-base', pods => {
        return pods.map(pod => pod.href)
    });

    console.log("carpets found: " + hrefData.length)

    let searchIndex = 0; 
    let carpetList = [];

    for(index in hrefData) {

        console.log("Current Index: " + searchIndex)
        // Create sub-page to force loading of proper data given the URI anchor (i.e. different level/variants)
        const subPage = await browser.newPage() 
        let carpetData = await carpetPageScrape(hrefData[index], subPage)
            carpetList.push(carpetData)
            await subPage.close()
            searchIndex += 1;
            
    }

   
  
    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

}

async function carpetPageScrape(url) {

    console.log('Entering carpetPageScrape with url: ' + url);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal Carpet Compatibility Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 

    // Gets name for carpet
    const carpetName = await page.$$eval('[data-component="ProductDetailsTitle"] h1', pods => {
        return pods.map(pod => pod.innerText)[0]
    }); 

    // Gets sku for carpet
    const skuData = await page.$$eval('[data-component="ProductInfoBar"] span', pods => {
        return pods.map(pod => pod.innerText)[2]
    }); 
        
    console.log("Carpet Name: " + carpetName)
    console.log("SKU: " + skuData)
    await page.close();
    await browser.close();
    return ( {"carpetName": carpetName, "carpetSKU": skuData })
}

async function carpetTestScrape(url) {

    console.log('url: ' + url);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent('Practice Scraper for Making Personal Carpet Compatibility Tool (Coding Adventure)')
    await page.goto(url, {timeout: 90000}); 


    // Gets name for carpet
    const carpetName = await page.$$eval('[data-component="ProductDetailsTitle"] h1', pods => {
        return pods.map(pod => pod.innerText)[0]
    }); 

    // Gets sku for carpet
    const skuData = await page.$$eval('[data-component="ProductInfoBar"] span', pods => {
        return pods.map(pod => pod.innerText)[2]
    }); 

    console.log("Carpet Name: " + carpetName)
    console.log("SKU: " + skuData)

    await page.close();
    console.log('page closed');
    await browser.close();
    console.log('browser closed');
    return ( "complete" )

}
carpetScrape('https://www.homedepot.com/b/Flooring-Carpet-Installed-Carpet/N-5yc1vZ2fkpcfz?sortorder=desc&sortby=topsellers')
//rpetTestScrape('https://www.homedepot.com/p/TrafficMaster-Nimble-Creek-Lodge-Beige-32-oz-SD-Polyester-Texture-Carpet-Installation-Required-H4112-795-1200/308244956')